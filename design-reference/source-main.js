// youreadyletsgrow.com — anchor nav state + booking form submit.

// Optional chaining, not a bare call: if the footer year span ever goes missing,
// a TypeError here would kill every feature below it.
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- mobile menu ----------------------------------------------------- */
// Full-screen <dialog> below 720px. showModal() puts it in the top layer, so the
// header's backdrop-filter cannot trap it, and focus trap + Escape come free.
// Links are cloned from the header nav so the markup has one source of truth.

const burger = document.getElementById('nav-burger');
const navDialog = document.getElementById('nav-dialog');
if (burger && navDialog && typeof navDialog.showModal === 'function') {
  const sourceLinks = document.querySelector('#primary-nav .nav-links');
  if (sourceLinks) navDialog.appendChild(sourceLinks.cloneNode(true));

  const closeBtn = document.getElementById('nav-close');

  const openNav = () => {
    navDialog.showModal();
    document.body.classList.add('nav-open');
    burger.setAttribute('aria-expanded', 'true');
  };
  const closeNav = () => navDialog.close();

  burger.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);

  // Escape and the close button both fire 'close'; clean up in one place.
  navDialog.addEventListener('close', () => {
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  });

  // Tapping a link should navigate to the anchor, not just close.
  navDialog.addEventListener('click', event => {
    if (event.target.closest('a')) closeNav();
  });

  // Resizing to desktop must not leave a full-screen menu covering the page.
  window.matchMedia('(min-width: 721px)').addEventListener('change', event => {
    if (event.matches && navDialog.open) closeNav();
  });
}

/* ---- nav active state ------------------------------------------------ */
// IntersectionObserver over the sections the nav points at. No scroll library.

const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if (sections.length) {
  const visible = new Set();

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id);
    }
    // Highlight the topmost section currently on screen.
    const current = sections.find(s => visible.has(s.id));
    navLinks.forEach(a => {
      a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id);
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---- hero carousel --------------------------------------------------- */
// Crossfade between the hero cutouts. Slide 1 is already active in the markup,
// so this only adds the dots and the rotation on top of a working default.

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  // Two tracks (photos and text) advance together off one index.
  const tracks = [...document.querySelectorAll('[data-track]')]
    .map(track => [...track.querySelectorAll('[data-slide]')]);
  const count = Math.min(...tracks.map(t => t.length));
  const dotsBox = document.querySelector('[data-dots]');
  const INTERVAL = 5000;
  let index = 0;
  let timer = null;

  const dots = Array.from({ length: count }, (_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1} of ${count}`);
    dot.addEventListener('click', () => {
      show(i);
      restart(); // manual pick gets a full interval before auto-advance resumes
    });
    dotsBox.appendChild(dot);
    return dot;
  });

  function show(next) {
    index = (next + count) % count;
    tracks.forEach(slides => {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    });
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
  }

  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    // Respect reduced motion: dots still work, nothing rotates on its own.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => show(index + 1), INTERVAL);
  };
  const restart = () => { stop(); start(); };

  // Don't animate behind the user's back or fight them while they interact.
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  dotsBox.addEventListener('focusin', stop);
  dotsBox.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  show(0);
  start();
}

/* ---- floating reel launcher ------------------------------------------ */
// Pinned bottom-right, plays the reel inside itself. It is the only route to the
// reel now that the section is gone, and it stays off the page until there is a
// video: putting a YouTube id on data-video-id in the markup is the whole switch.

const reelFloat = document.getElementById('reel-float');
const reelId = reelFloat?.dataset.videoId;
const heroReelBtn = document.getElementById('hero-reel-btn');

// No reel yet: the bubble leaves the page and the hero button stays hidden. Both
// are held rather than deleted so one id in the markup brings back both.
if (reelFloat && !reelId) reelFloat.remove();

if (reelFloat && reelId) {
  reelFloat.hidden = false;
  const floatLink = reelFloat.querySelector('.reel-float-link');

  const playReel = () => {
    if (reelFloat.classList.contains('is-playing')) return;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(reelId)}?autoplay=1&rel=0`;
    frame.title = 'WD Brown speaker reel';
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    frame.allowFullscreen = true;
    floatLink.replaceWith(frame);
    reelFloat.classList.remove('is-dismissed');
    reelFloat.classList.add('is-playing');
  };

  floatLink.addEventListener('click', event => {
    event.preventDefault();   // play here, don't send anyone to YouTube
    playReel();
  });

  // The hero button drives the same bubble — one player, one place it plays.
  if (heroReelBtn) {
    heroReelBtn.hidden = false;
    heroReelBtn.addEventListener('click', playReel);
  }

  document.getElementById('reel-float-close')
    ?.addEventListener('click', () => reelFloat.classList.add('is-dismissed'));
}

/* ---- scroll reveals -------------------------------------------------- */
// CSS holds the hidden state; this only flips .is-visible once, on the way in.

const groups = document.querySelectorAll('.reveal-group');
groups.forEach(group => {
  [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
});

const showAll = els => els.forEach(el => el.classList.add('is-visible'));

const revealTargets = document.querySelectorAll('.reveal, .reveal-group');
if (revealTargets.length) {
  // The safety net is "no observer", not "page loaded". A load handler used to
  // force every target visible, which on any normal connection fired before the
  // user had scrolled anywhere — so the fade-in never actually played.
  if (!('IntersectionObserver' in window)) {
    showAll(revealTargets);
  } else {
    const revealer = new IntersectionObserver((entries, self) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        self.unobserve(entry.target); // reveal once, never re-hide on scroll up
      }
    // Negative bottom margin: fire once the element is properly in view, not
    // 300px early, or the fade is over before it reaches the screen.
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0 });

    revealTargets.forEach(el => revealer.observe(el));
  }
}

/* ---- counting stats -------------------------------------------------- */
// Count 0 -> target when the stat scrolls into view, once.

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 1400;

  const format = (value, suffix) => value.toLocaleString('en-US') + suffix;

  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';

    if (reduceMotion || !Number.isFinite(target)) {
      el.textContent = format(target, suffix);
      return;
    }

    const started = performance.now();
    requestAnimationFrame(function frame(now) {
      const progress = Math.min((now - started) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic — fast, then settles
      el.textContent = format(Math.round(target * eased), suffix);
      if (progress < 1) requestAnimationFrame(frame);
    });
  }

  const counterObserver = new IntersectionObserver((entries, self) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      self.unobserve(entry.target);
      countUp(entry.target);
    }
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));
}

/* ---- testimonials wall ------------------------------------------------ */
// Every clip is on screen at once, so there is no rotation to manage — all that
// is left is the facade -> player swap. The one-player rule still stands: with a
// grid it is *easier* to end up with several iframes talking over each other.

const testimonials = document.querySelector('[data-testimonials]');
if (testimonials) {
  let playing = null; // { iframe, facade } of the one video allowed to run

  // Facade -> real player. Nothing is requested from YouTube until this runs, so
  // the page sets no third-party cookies on load. nocookie domain either way.
  testimonials.addEventListener('click', event => {
    const facade = event.target.closest('.t-facade');
    if (!facade || facade.disabled) return;

    const id = facade.dataset.videoId;
    const placeholder = facade.dataset.videoPlaceholder;

    if (placeholder) {
      alert("Testimonial Video coming soon! Stay tuned for full video clip.");
      return;
    }

    if (!id) return;

    // One player at a time. Swapping the running iframe back for its own facade
    // destroys it, which is what actually stops the audio — otherwise opening a
    // second testimonial left both playing over each other.
    if (playing) {
      playing.iframe.replaceWith(playing.facade);
      playing = null;
    }

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = facade.closest('.t-card').querySelector('.t-name')?.textContent || 'Testimonial';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
    playing = { iframe, facade };   // facade node stays alive, ready to go back
  });
}

/* ---- books horizontal infinite carousel ------------------------------- */
const booksContainer = document.querySelector('[data-books-carousel]');
if (booksContainer) {
  const track = booksContainer.querySelector('[data-books-track]');
  const cards = [...track.querySelectorAll('.book-card-h')];
  const dotsBox = booksContainer.querySelector('[data-books-dots]');
  const prevBtn = booksContainer.querySelector('[data-books-prev]');
  const nextBtn = booksContainer.querySelector('[data-books-next]');
  const TOTAL_ORIGINAL = 4;
  let index = 0;
  let timer = null;
  const INTERVAL = 4000;

  const dots = Array.from({ length: TOTAL_ORIGINAL }, (_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'books-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Book slide ${i + 1} of ${TOTAL_ORIGINAL}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    if (dotsBox) dotsBox.appendChild(dot);
    return dot;
  });

  function getStepWidth() {
    const card = cards[0];
    if (!card) return 0;
    const gap = 24;
    return card.offsetWidth + gap;
  }

  function update() {
    const stepWidth = getStepWidth();
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(-${index * stepWidth}px)`;

    const dotIndex = index % TOTAL_ORIGINAL;
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === dotIndex)));
  }

  function goTo(nextIndex) {
    index = (nextIndex + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;
    update();
  }

  function next() {
    index++;
    if (index >= TOTAL_ORIGINAL) {
      track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      track.style.transform = `translateX(-${index * getStepWidth()}px)`;
      dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === 0)));

      setTimeout(() => {
        index = 0;
        track.style.transition = 'none';
        track.style.transform = `translateX(0px)`;
      }, 600);
    } else {
      update();
    }
  }

  function prev() {
    if (index <= 0) {
      index = TOTAL_ORIGINAL - 1;
    } else {
      index--;
    }
    update();
  }

  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(next, INTERVAL);
  };
  const restart = () => { stop(); start(); };

  prevBtn?.addEventListener('click', () => { prev(); restart(); });
  nextBtn?.addEventListener('click', () => { next(); restart(); });

  booksContainer.addEventListener('mouseenter', stop);
  booksContainer.addEventListener('mouseleave', start);
  window.addEventListener('resize', update);

  update();
  start();
}

/* ---- signup modal ---------------------------------------------------- */
// Native <dialog>. showModal() gives the focus trap, Escape handling and
// background inerting, so there is no modal library and no scroll-lock hack.

const signup = document.getElementById('signup-modal');
if (signup && typeof signup.showModal === 'function') {
  const SEEN_KEY = 'ylg-signup-seen';
  const DELAY = 15000;

  // localStorage throws in private-mode Safari; a dead flag must not kill the page.
  const seen = () => { try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return true; } };
  const markSeen = () => { try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ } };

  if (!seen()) {
    setTimeout(() => {
      if (!signup.open) signup.showModal();
    }, DELAY);
  }
  // Dismissing counts as seen, so it opens once per browser rather than nagging.
  signup.addEventListener('close', markSeen);

  // Click on the backdrop (outside the panel) closes it.
  signup.addEventListener('click', event => {
    if (event.target === signup) signup.close();
  });

  const signupForm = document.getElementById('signup-form');
  const signupStatus = document.getElementById('signup-status');

  signupForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = document.getElementById('signup-email');
    if (!email.checkValidity()) {
      signupStatus.textContent = 'Please enter a valid email address.';
      signupStatus.className = 'signup-status is-error';
      email.focus();
      return;
    }

    const button = signupForm.querySelector('.signup-submit');
    button.disabled = true;
    signupStatus.textContent = 'Subscribing…';
    signupStatus.className = 'signup-status';

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(signupForm))),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed (' + response.status + ')');
      }
      signupForm.reset();
      // Keep this in sync with the session times printed in the modal copy.
      signupStatus.textContent = "You're in — watch for a text and email. See you Tuesday & Thursday at 7:00 PM EST.";
      signupStatus.className = 'signup-status is-ok';
      markSeen();
    } catch (error) {
      signupStatus.textContent = error.message + ' — please try again.';
      signupStatus.className = 'signup-status is-error';
    } finally {
      button.disabled = false;
    }
  });
}

/* ---- copy-to-clipboard ------------------------------------------------ */
// For the standard speaker bio an organiser pastes into their programme.
// navigator.clipboard is undefined on file:// and any non-secure origin, so the
// button is only wired up when it exists — otherwise the text stays selectable.

if (navigator.clipboard) {
  document.querySelectorAll('[data-copy]').forEach(button => {
    const source = document.querySelector(button.dataset.copy);
    if (!source) return;

    button.addEventListener('click', async () => {
      const label = button.textContent;
      try {
        await navigator.clipboard.writeText(source.innerText.trim());
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Press Ctrl+C to copy';
      }
      setTimeout(() => { button.textContent = label; }, 2000);
    });
  });
}

/* The booking form's submit handler lived here. It went with the form when booking
   moved to the client's CRM — the section is now a single outbound link, which needs
   no JS. api/book.js and its test are still in the repo, dormant. */
