/* ==========================================================================
   Golden Stone QLD — Main JS
   Header scroll effect · Mobile menu · Scroll fade-in animations
   ========================================================================== */

(function () {
  'use strict';

  /* ── Header scroll effect ──────────────────────────────────────────────── */
  const header = document.getElementById('site-header');

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* Run once on load in case page is already scrolled */
  }

  /* ── Mobile menu toggle ─────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    /* Close mobile menu when a link inside it is clicked */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });

    /* Close mobile menu on Escape key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        hamburger.focus();
      }
    });
  }

  /* ── Fade-in on scroll (IntersectionObserver) ───────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); /* Animate once only */
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(el => observer.observe(el));
  } else {
    /* Fallback: show all elements if IntersectionObserver not supported */
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Footer year ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

})();
