import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const debugPort = process.env.CHROME_DEBUG_PORT || "9225";
const targetUrl = process.env.TARGET_URL || "http://127.0.0.1:4173/";
const outputDir = path.resolve("qa-evidence");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await mkdir(outputDir, { recursive: true });

class CDP {
  constructor(url) {
    this.url = url;
    this.nextId = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
        else pending.resolve(message.result);
        return;
      }
      const listeners = this.listeners.get(message.method) || [];
      listeners.forEach((listener) => listener(message.params));
    });
  }

  send(method, params = {}) {
    const id = ++this.nextId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) || [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(cdp, expression, userGesture = false) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitForReady(cdp, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      if ((await evaluate(cdp, "document.readyState")) === "complete") return;
    } catch {
      // The execution context can briefly disappear during navigation.
    }
    await delay(120);
  }
  throw new Error("Timed out waiting for page readiness");
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitForReady(cdp);
  await delay(1000);
}

async function scrollWholePage(cdp) {
  return evaluate(
    cdp,
    `(async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const visited = [];
      const step = Math.max(520, Math.round(innerHeight * .7));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        visited.push(y);
        await sleep(760);
      }
      scrollTo(0, 0);
      await sleep(1100);
      return {
        visited,
        innerWidth,
        innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight
      };
    })()`
  );
}

async function captureViewport(cdp, filename) {
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
}

async function captureFull(cdp, filename) {
  const metrics = await cdp.send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize || metrics.contentSize;
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 }
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
  return size;
}

async function captureElement(cdp, id, filename) {
  const rect = await evaluate(
    cdp,
    `(() => {
      const element = document.getElementById(${JSON.stringify(id)});
      if (!element) return null;
      const bounds = element.getBoundingClientRect();
      return {
        x: Math.max(0, bounds.x + scrollX - 10),
        y: Math.max(0, bounds.y + scrollY - 10),
        width: bounds.width + 20,
        height: bounds.height + 20
      };
    })()`
  );
  if (!rect) throw new Error(`Comparison section not found: ${id}`);
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { ...rect, scale: 1 }
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
  return rect;
}

async function captureSection(cdp, id, filename) {
  await evaluate(cdp, `document.getElementById(${JSON.stringify(id)})?.scrollIntoView({ block: "start" })`);
  await delay(1100);
  await captureViewport(cdp, filename);
}

const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No Chrome page target found");

const cdp = new CDP(target.webSocketDebuggerUrl);
await cdp.connect();
await Promise.all([
  cdp.send("Page.enable"),
  cdp.send("Runtime.enable"),
  cdp.send("Network.enable"),
  cdp.send("Log.enable")
]);

const consoleMessages = [];
cdp.on("Runtime.consoleAPICalled", (params) => {
  consoleMessages.push({
    source: "console",
    type: params.type,
    text: params.args.map((argument) => argument.value ?? argument.description ?? "").join(" ")
  });
});
cdp.on("Log.entryAdded", (params) => {
  consoleMessages.push({ source: params.entry.source, type: params.entry.level, text: params.entry.text });
});

if (process.argv.includes("--comparison")) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1600,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false
  });
  await navigate(cdp, `${targetUrl}qa-evidence/comparison.html`);
  const comparisonSize = await captureFull(cdp, "source-implementation-comparison.png");
  console.log(JSON.stringify({ comparisonSize, consoleMessages }, null, 2));
  cdp.close();
  process.exit(0);
}

if (process.argv.includes("--comparison-sections")) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1600,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false
  });
  await navigate(cdp, `${targetUrl}qa-evidence/comparison.html`);
  const sections = {};
  for (const [id, filename] of [
    ["qa-desktop-top", "comparison-desktop-top.png"],
    ["qa-mobile-top", "comparison-mobile-top.png"],
    ["qa-mobile-menu", "comparison-mobile-menu.png"],
    ["qa-why", "comparison-why.png"],
    ["qa-testimonials", "comparison-testimonials.png"],
    ["qa-meet", "comparison-meet.png"],
    ["qa-books", "comparison-books.png"],
    ["qa-contact", "comparison-contact.png"]
  ]) {
    sections[id] = await captureElement(cdp, id, filename);
  }
  console.log(JSON.stringify({ sections, consoleMessages }, null, 2));
  cdp.close();
  process.exit(0);
}

if (process.env.QUICK_MENU === "1") {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
    screenWidth: 390,
    screenHeight: 844
  });
  await navigate(cdp, targetUrl);
  await evaluate(cdp, "document.querySelector('.speaker-nav__menu-button')?.click()", true);
  await delay(350);
  await captureViewport(cdp, "implementation-mobile-390x844-menu-open.png");
  const menu = await evaluate(
    cdp,
    `(() => {
      const element = document.querySelector('.speaker-mobile-menu');
      const rect = element?.getBoundingClientRect();
      const style = element ? getComputedStyle(element) : null;
      return {
        open: element?.classList.contains('is-open') || false,
        rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
        display: style?.display || null,
        opacity: style?.opacity || null,
        zIndex: style?.zIndex || null,
        bodyLocked: document.body.classList.contains('speaker-menu-open'),
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth
      };
    })()`
  );
  await delay(250);
  console.log(JSON.stringify({ menu, consoleMessages }, null, 2));
  cdp.close();
  process.exit(0);
}

await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false
});
await navigate(cdp, targetUrl);
const desktopScroll = await scrollWholePage(cdp);
const desktopSections = await evaluate(
  cdp,
  `Object.fromEntries(
    ['top', 'why-wd', 'speaking', 'testimonials', 'meet-wd', 'books', 'contact'].map(id => {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return [id, rect ? { x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height } : null];
    })
  )`
);
const desktopAccessibility = await evaluate(
  cdp,
  `({
    imagesMissingAlt: [...document.images].filter(image => !image.hasAttribute('alt')).length,
    unnamedButtons: [...document.querySelectorAll('button')].filter(button => !(button.innerText || button.getAttribute('aria-label') || button.getAttribute('aria-labelledby'))).length,
    unnamedLinks: [...document.querySelectorAll('a')].filter(link => !(link.innerText || link.getAttribute('aria-label') || link.getAttribute('aria-labelledby'))).length,
    mainCount: document.querySelectorAll('main').length,
    h1Count: document.querySelectorAll('h1').length
  })`
);
const desktopSize = await captureFull(cdp, "implementation-desktop-1440x1000-full.png");
await evaluate(cdp, "scrollTo(0, 0)");
await delay(500);
await captureViewport(cdp, "implementation-desktop-1440x1000-top.png");
await captureSection(cdp, "why-wd", "implementation-desktop-why-wd.png");
await captureSection(cdp, "testimonials", "implementation-desktop-testimonials.png");
await captureSection(cdp, "meet-wd", "implementation-desktop-meet-wd.png");
await captureSection(cdp, "books", "implementation-desktop-books.png");
await captureSection(cdp, "contact", "implementation-desktop-contact.png");

await evaluate(cdp, "scrollTo(0, 0)");
const heroBefore = await evaluate(cdp, "document.querySelector('.speaker-hero__message')?.innerText");
await delay(5200);
const heroAfterWait = await evaluate(cdp, "document.querySelector('.speaker-hero__message')?.innerText");
await evaluate(cdp, "document.querySelectorAll('.speaker-hero__dots button')[1]?.click()", true);
const heroAfter = await evaluate(cdp, "document.querySelector('.speaker-hero__message')?.innerText");
await evaluate(cdp, "document.querySelector('.speaker-marquee__control')?.click()", true);
const marqueeState = await evaluate(
  cdp,
  `({
    paused: document.querySelector('.speaker-marquee__track')?.classList.contains('is-paused') || false,
    pressed: document.querySelector('.speaker-marquee__control')?.getAttribute('aria-pressed') || null
  })`
);
await evaluate(cdp, "document.querySelector('.speaker-testimonial__media button')?.click()", true);
await delay(250);
const videoState = await evaluate(
  cdp,
  `({
    count: document.querySelectorAll('.speaker-testimonial iframe').length,
    src: document.querySelector('.speaker-testimonial iframe')?.getAttribute('src') || null
  })`
);

await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate(cdp, targetUrl);
const mobileScroll = await scrollWholePage(cdp);
const mobileSize = await captureFull(cdp, "implementation-mobile-390x844-full.png");
await evaluate(cdp, "scrollTo(0, 0)");
await delay(500);
await captureViewport(cdp, "implementation-mobile-390x844-top.png");

await evaluate(cdp, "document.querySelector('.speaker-nav__menu-button')?.click()", true);
await delay(250);
await captureViewport(cdp, "implementation-mobile-390x844-menu-open.png");
const mobileMenu = await evaluate(
  cdp,
  `({
    open: document.querySelector('.speaker-mobile-menu')?.classList.contains('is-open') || false,
    expanded: document.querySelector('.speaker-nav__menu-button')?.getAttribute('aria-expanded'),
    bodyLocked: document.body.classList.contains('speaker-menu-open'),
    navBounds: (() => {
      const r = document.querySelector('.speaker-nav__inner')?.getBoundingClientRect();
      return r ? { left: r.left, right: r.right, width: r.width } : null;
    })(),
    links: [...document.querySelectorAll('.speaker-mobile-menu a')].map(a => a.innerText.trim())
  })`
);
const mobileMenuFocus = await evaluate(
  cdp,
  `({
    activeText: document.activeElement?.innerText?.trim() || null,
    activeTag: document.activeElement?.tagName || null
  })`
);
await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
await delay(120);
const mobileMenuAfterEscape = await evaluate(
  cdp,
  `({
    menuInDom: Boolean(document.querySelector('.speaker-mobile-menu')),
    expanded: document.querySelector('.speaker-nav__menu-button')?.getAttribute('aria-expanded'),
    focusReturnedToButton: document.activeElement === document.querySelector('.speaker-nav__menu-button'),
    bodyLocked: document.body.classList.contains('speaker-menu-open')
  })`
);

const summary = {
  targetUrl,
  desktop: {
    viewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
    screenshotSize: desktopSize,
    layout: desktopScroll,
    sections: desktopSections,
    accessibility: desktopAccessibility
  },
  mobile: {
    viewport: { width: 390, height: 844, deviceScaleFactor: 1 },
    screenshotSize: mobileSize,
    layout: mobileScroll,
    menu: mobileMenu,
    menuFocus: mobileMenuFocus,
    menuAfterEscape: mobileMenuAfterEscape
  },
  interactions: {
    heroCarousel: {
      before: heroBefore,
      afterWait: heroAfterWait,
      autoRotationStopped: heroBefore === heroAfterWait,
      afterSecondDot: heroAfter,
      manualSelectionChanged: heroBefore !== heroAfter
    },
    marquee: marqueeState,
    testimonialVideo: videoState
  },
  consoleMessages
};

await writeFile(path.join(outputDir, "implementation-summary.json"), JSON.stringify(summary, null, 2));
cdp.close();
console.log(JSON.stringify(summary, null, 2));
