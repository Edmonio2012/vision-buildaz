import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const debugPort = process.env.CHROME_DEBUG_PORT || '9224';
const targetUrl = 'https://youready-letsgrow.vercel.app/';
const outputDir = path.resolve('reference-evidence/youready-letsgrow-2026-08-31');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', event => {
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
      listeners.forEach(listener => listener(message.params));
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

async function evaluate(cdp, expression, options = {}) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: options.awaitPromise ?? true,
    returnByValue: options.returnByValue ?? true,
    userGesture: options.userGesture ?? false,
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
      const ready = await evaluate(cdp, 'document.readyState');
      if (ready === 'complete') return;
    } catch {
      // The execution context can disappear during navigation.
    }
    await delay(150);
  }
  throw new Error('Timed out waiting for document.readyState=complete');
}

async function navigate(cdp, url) {
  await cdp.send('Page.navigate', { url });
  await waitForReady(cdp);
  await delay(1200);
}

async function revealWholePage(cdp) {
  return evaluate(cdp, `
    (async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const step = Math.max(520, Math.round(innerHeight * 0.72));
      const visited = [];
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        visited.push({ y, height: document.documentElement.scrollHeight });
        await sleep(140);
      }
      scrollTo(0, document.documentElement.scrollHeight);
      await sleep(350);
      document.querySelector('[data-carousel]')?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      document.querySelector('[data-books-carousel]')?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      document.querySelector('.hero-dot')?.click();
      document.querySelector('.books-dot')?.click();
      scrollTo(0, 0);
      await sleep(700);
      return {
        visited,
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
      };
    })()
  `);
}

async function captureFullPage(cdp, filename) {
  const metrics = await cdp.send('Page.getLayoutMetrics');
  const size = metrics.cssContentSize || metrics.contentSize;
  const screenshot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 },
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, 'base64'));
  return size;
}

async function captureViewport(cdp, filename) {
  const screenshot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, 'base64'));
}

const snapshotExpression = `
  (() => {
    const clean = value => (value || '').replace(/\\s+/g, ' ').trim();
    const rect = element => {
      const r = element.getBoundingClientRect();
      return {
        x: Math.round((r.x + scrollX) * 100) / 100,
        y: Math.round((r.y + scrollY) * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
      };
    };
    const visible = element => {
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && r.width > 0 && r.height > 0;
    };
    const styleInfo = element => {
      const style = getComputedStyle(element);
      return {
        display: style.display,
        position: style.position,
        color: style.color,
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform,
        textAlign: style.textAlign,
        padding: style.padding,
        margin: style.margin,
        gap: style.gap,
        gridTemplateColumns: style.gridTemplateColumns,
        border: style.border,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        overflow: style.overflow,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
      };
    };
    const describe = element => ({
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      className: typeof element.className === 'string' ? element.className : element.className?.baseVal || '',
      text: clean(element.innerText),
      visible: visible(element),
      bounds: rect(element),
      style: styleInfo(element),
    });

    const nodes = [...document.querySelectorAll('body *')];
    const colorCounts = new Map();
    const backgroundCounts = new Map();
    const fontCounts = new Map();
    for (const element of nodes) {
      if (!visible(element)) continue;
      const style = getComputedStyle(element);
      colorCounts.set(style.color, (colorCounts.get(style.color) || 0) + 1);
      if (style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        backgroundCounts.set(style.backgroundColor, (backgroundCounts.get(style.backgroundColor) || 0) + 1);
      }
      const fontKey = [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight].join(' | ');
      fontCounts.set(fontKey, (fontCounts.get(fontKey) || 0) + 1);
    }
    const ranked = map => [...map.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));

    const rootStyle = getComputedStyle(document.documentElement);
    const cssVariables = {};
    for (const key of rootStyle) {
      if (key.startsWith('--')) cssVariables[key] = rootStyle.getPropertyValue(key).trim();
    }

    return {
      capturedAt: new Date().toISOString(),
      url: location.href,
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      viewport: {
        innerWidth,
        innerHeight,
        devicePixelRatio,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
      mediaQueries: {
        max390: matchMedia('(max-width: 390px)').matches,
        max480: matchMedia('(max-width: 480px)').matches,
        max720: matchMedia('(max-width: 720px)').matches,
        min721: matchMedia('(min-width: 721px)').matches,
        max860: matchMedia('(max-width: 860px)').matches,
        max1000: matchMedia('(max-width: 1000px)').matches,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      },
      bodyStyle: styleInfo(document.body),
      cssVariables,
      sections: [...document.querySelectorAll('main > section, main > .marquee, body > footer, body > dialog')].map(describe),
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(describe),
      links: [...document.querySelectorAll('a')].map(element => ({
        text: clean(element.innerText),
        hrefAttribute: element.getAttribute('href'),
        href: element.href,
        target: element.target || null,
        download: element.hasAttribute('download'),
        ariaLabel: element.getAttribute('aria-label'),
        visible: visible(element),
        bounds: rect(element),
        style: styleInfo(element),
      })),
      buttons: [...document.querySelectorAll('button')].map(element => ({
        text: clean(element.innerText),
        type: element.type,
        ariaLabel: element.getAttribute('aria-label'),
        ariaExpanded: element.getAttribute('aria-expanded'),
        ariaSelected: element.getAttribute('aria-selected'),
        hidden: element.hidden,
        disabled: element.disabled,
        data: { ...element.dataset },
        visible: visible(element),
        bounds: rect(element),
        style: styleInfo(element),
      })),
      images: [...document.images].map(element => ({
        srcAttribute: element.getAttribute('src'),
        currentSrc: element.currentSrc,
        alt: element.alt,
        loading: element.loading,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        complete: element.complete,
        visible: visible(element),
        bounds: rect(element),
        style: styleInfo(element),
      })),
      forms: [...document.forms].map(element => ({
        id: element.id || null,
        method: element.method,
        action: element.action,
        visible: visible(element),
        fields: [...element.elements].map(field => ({
          tag: field.tagName.toLowerCase(),
          id: field.id || null,
          name: field.name || null,
          type: field.type || null,
          placeholder: field.placeholder || null,
          required: field.required || false,
          options: field.options ? [...field.options].map(option => option.text) : undefined,
        })),
      })),
      fixedOrSticky: nodes.filter(element => ['fixed', 'sticky'].includes(getComputedStyle(element).position)).map(describe),
      topColors: ranked(colorCounts).slice(0, 20),
      topBackgrounds: ranked(backgroundCounts).slice(0, 20),
      topFontStyles: ranked(fontCounts).slice(0, 30),
      stylesheets: [...document.styleSheets].map(sheet => {
        let ruleCount = null;
        try { ruleCount = sheet.cssRules.length; } catch { /* cross-origin */ }
        return { href: sheet.href, media: sheet.media?.mediaText || '', disabled: sheet.disabled, ruleCount };
      }),
      resources: performance.getEntriesByType('resource').map(entry => ({
        name: entry.name,
        initiatorType: entry.initiatorType,
        transferSize: entry.transferSize,
        decodedBodySize: entry.decodedBodySize,
        duration: Math.round(entry.duration * 100) / 100,
      })),
      visibleText: document.body.innerText,
      renderedHtml: document.documentElement.outerHTML,
    };
  })()
`;

async function snapshot(cdp, name) {
  const data = await evaluate(cdp, snapshotExpression);
  const html = data.renderedHtml;
  const visibleText = data.visibleText;
  delete data.renderedHtml;
  delete data.visibleText;
  await writeFile(path.join(outputDir, `${name}-dom.json`), JSON.stringify(data, null, 2));
  await writeFile(path.join(outputDir, `${name}-rendered.html`), html);
  await writeFile(path.join(outputDir, `${name}-visible-text.txt`), visibleText);
  return data;
}

async function interactionChecks(cdp) {
  return evaluate(cdp, `
    (async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const result = {};

      const heroDots = [...document.querySelectorAll('.hero-dot')];
      result.heroCarousel = {
        dots: heroDots.length,
        initialText: document.querySelector('.lede.is-active')?.innerText.trim() || null,
      };
      heroDots[1]?.click();
      result.heroCarousel.afterSecondDot = document.querySelector('.lede.is-active')?.innerText.trim() || null;
      heroDots[0]?.click();

      const bookTrack = document.querySelector('[data-books-track]');
      result.booksCarousel = {
        dots: document.querySelectorAll('.books-dot').length,
        initialTransform: bookTrack?.style.transform || null,
      };
      document.querySelector('[data-books-next]')?.click();
      await sleep(50);
      result.booksCarousel.afterNextTransform = bookTrack?.style.transform || null;
      document.querySelector('.books-dot')?.click();

      let capturedAlert = null;
      const originalAlert = window.alert;
      window.alert = message => { capturedAlert = message; };
      document.querySelector('.t-facade[data-video-placeholder]')?.click();
      window.alert = originalAlert;
      result.pendingTestimonial = { alert: capturedAlert };

      const realFacade = document.querySelector('.t-facade[data-video-id]');
      const realVideoId = realFacade?.dataset.videoId || null;
      realFacade?.click();
      await sleep(150);
      result.realTestimonial = {
        videoId: realVideoId,
        iframeCreated: !!document.querySelector('[data-testimonials] iframe'),
        iframeSrc: document.querySelector('[data-testimonials] iframe')?.getAttribute('src') || null,
      };

      result.signup = {
        delayedMs: 15000,
        dialogSupported: typeof document.querySelector('#signup-modal')?.showModal === 'function',
        endpoint: '/api/subscribe',
      };

      result.reel = {
        configuredVideoId: document.querySelector('#reel-float')?.dataset.videoId || '',
        existsAfterScript: !!document.querySelector('#reel-float'),
        heroButtonHidden: document.querySelector('#hero-reel-btn')?.hidden ?? null,
      };

      result.copyBio = {
        clipboardAvailable: !!navigator.clipboard,
        target: document.querySelector('[data-copy]')?.dataset.copy || null,
      };

      return result;
    })()
  `, { userGesture: true });
}

const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then(response => response.json());
const target = targets.find(item => item.type === 'page');
if (!target) throw new Error('No Chrome page target found');

const cdp = new CDP(target.webSocketDebuggerUrl);
await cdp.connect();
await Promise.all([
  cdp.send('Page.enable'),
  cdp.send('Runtime.enable'),
  cdp.send('Network.enable'),
  cdp.send('DOM.enable'),
  cdp.send('Log.enable'),
]);

const consoleMessages = [];
cdp.on('Runtime.consoleAPICalled', params => {
  consoleMessages.push({ type: params.type, args: params.args.map(arg => arg.value ?? arg.description ?? '') });
});
cdp.on('Log.entryAdded', params => consoleMessages.push(params.entry));

await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await navigate(cdp, targetUrl);
await evaluate(cdp, `localStorage.setItem('ylg-signup-seen', '1')`);
await cdp.send('Page.reload', { ignoreCache: false });
await waitForReady(cdp);
await delay(1200);
const desktopScroll = await revealWholePage(cdp);
const desktopSize = await captureFullPage(cdp, 'desktop-1440x1000-full.png');
const desktopSnapshot = await snapshot(cdp, 'desktop-1440x1000');
const interactions = await interactionChecks(cdp);

// Restore the page after the testimonial facade was swapped for an iframe.
await cdp.send('Page.reload', { ignoreCache: false });
await waitForReady(cdp);
await delay(800);
await evaluate(cdp, `document.querySelector('#signup-modal')?.showModal()`);
await delay(250);
await captureViewport(cdp, 'desktop-1440x1000-signup-modal.png');
await evaluate(cdp, `document.querySelector('#signup-modal')?.close()`);

await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await cdp.send('Page.reload', { ignoreCache: false });
await waitForReady(cdp);
await delay(1000);
const mobileScroll = await revealWholePage(cdp);
const mobileSize = await captureFullPage(cdp, 'mobile-390x844-full.png');
const mobileSnapshot = await snapshot(cdp, 'mobile-390x844');

await evaluate(cdp, `document.querySelector('#nav-burger')?.click()`, { userGesture: true });
await delay(250);
await captureViewport(cdp, 'mobile-390x844-menu-open.png');
const mobileMenuState = await evaluate(cdp, `({
  open: document.querySelector('#nav-dialog')?.open || false,
  bodyClass: document.body.className,
  ariaExpanded: document.querySelector('#nav-burger')?.getAttribute('aria-expanded'),
  links: [...document.querySelectorAll('#nav-dialog a')].map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
})`);
await evaluate(cdp, `document.querySelector('#nav-close')?.click()`, { userGesture: true });

await evaluate(cdp, `document.querySelector('#signup-modal')?.showModal()`);
await delay(250);
await captureViewport(cdp, 'mobile-390x844-signup-modal.png');
await evaluate(cdp, `document.querySelector('#signup-modal')?.close()`);

await writeFile(path.join(outputDir, 'capture-summary.json'), JSON.stringify({
  targetUrl,
  desktop: { requestedViewport: '1440x1000', screenshotSize: desktopSize, scroll: desktopScroll, dom: desktopSnapshot.viewport },
  mobile: { requestedViewport: '390x844', screenshotSize: mobileSize, scroll: mobileScroll, dom: mobileSnapshot.viewport },
  interactions,
  mobileMenuState,
  consoleMessages,
}, null, 2));

cdp.close();
console.log(JSON.stringify({ desktopSize, mobileSize, interactions, mobileMenuState, consoleMessages }, null, 2));
