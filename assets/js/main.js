/* =============================================================================
   Ludino — landing page behaviour
   Ported from the design canvas component:
     · sticky header flips from transparent to white past 40px
     · [data-reveal] elements fade/rise in as they enter the viewport
     · mobile nav panel (production addition — the canvas had no small-screen nav)
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Sticky header state ------------------------------------------------ */

  var scrolled = null;

  function syncHeader() {
    var next = window.scrollY > 40;
    if (next !== scrolled) {
      scrolled = next;
      document.body.classList.toggle('is-scrolled', next);
    }
  }

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* --- Reveal on scroll --------------------------------------------------- */

  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (targets.length && !reduceMotion && 'IntersectionObserver' in window) {
    // Only hide the elements once we know we can reveal them again.
    document.documentElement.classList.add('reveal-ready');

    targets.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Reveal on entry, and also catch anything already scrolled past.
        if (entry.isIntersecting || entry.boundingClientRect.bottom < window.innerHeight) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- Mobile navigation -------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.setAttribute('data-open', String(open));
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    // Close after picking a destination.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !e.target.closest('.nav-shell')) setOpen(false);
    });

    // Widening past the breakpoint restores the inline nav; drop the open state.
    window.matchMedia('(min-width: 881px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });

    setOpen(false);
  }

  /* --- Footer year -------------------------------------------------------- */

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
