/* preritahuja.com — theme toggle, scroll-spy, scroll progress, reveal-on-scroll */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- Theme toggle ------------------------------------------------------ */

  var toggle = document.getElementById("theme-toggle");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.dataset.theme || (systemDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";

      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* --- Scroll-spy: highlight the section currently under the header ------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));

  var sections = navLinks
    .map(function (link) { return document.getElementById(link.dataset.nav); })
    .filter(Boolean);

  function headerHeight() {
    var header = document.getElementById("site-header");
    return header ? header.getBoundingClientRect().height : 0;
  }

  // A section near the end of the page can be too short to ever reach the top of the
  // viewport, so following a link to it would otherwise highlight a later section.
  // While a jump is settling, the section that was asked for wins.
  var lockedId = null;
  var lockUntil = 0;
  var lockTimer = null;

  function releaseLock() {
    lockedId = null;
    lockUntil = 0;
    clearTimeout(lockTimer);
    lockTimer = null;
  }

  // The smooth scroll usually finishes before the lock expires, and no further scroll
  // event follows it, so re-sync on expiry rather than waiting for one.
  function lockTo(id, ms) {
    releaseLock();
    lockedId = id;
    lockUntil = performance.now() + ms;
    markActive(id);
    lockTimer = setTimeout(function () {
      releaseLock();
      syncActive();
    }, ms + 30);
  }

  // On mobile the nav is a horizontally scrollable strip, so keep the active chip
  // in view without ever scrolling the page itself.
  var navStrip = document.getElementById("site-nav");

  function revealChip(link) {
    if (!navStrip || navStrip.scrollWidth <= navStrip.clientWidth) return;
    var strip = navStrip.getBoundingClientRect();
    var chip = link.getBoundingClientRect();
    var target = navStrip.scrollLeft + (chip.left - strip.left)
               - (strip.width - chip.width) / 2;
    navStrip.scrollTo({ left: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
  }

  var lastActive;

  function markActive(id) {
    navLinks.forEach(function (link) {
      if (id && link.dataset.nav === id) {
        if (link.getAttribute("aria-current") !== "true") {
          link.setAttribute("aria-current", "true");
          revealChip(link);
        }
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Back at the hero: return the strip to the first section rather than
    // leaving it part-scrolled with the first chip clipped.
    if (id !== lastActive) {
      if (!id && navStrip && navStrip.scrollLeft > 0) {
        navStrip.scrollTo({ left: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
      lastActive = id;
    }
  }

  /* --- Scroll progress ---------------------------------------------------- */

  var progress = document.getElementById("scroll-progress-bar");

  function syncProgress() {
    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
  }

  // Anchor offsets key off the real header height, which differs between the
  // one-row desktop bar and the two-row mobile bar.
  function syncHeaderVar() {
    root.style.setProperty("--header-now", headerHeight() + "px");
  }

  function syncActive() {
    if (!sections.length) return;

    if (lockedId && performance.now() < lockUntil) {
      markActive(lockedId);
      return;
    }
    if (lockedId) releaseLock();

    var line = headerHeight() + 8;
    var active = null;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) active = sections[i];
    }

    // Anchor the last section once the page is scrolled to the bottom, so a short
    // final section still registers during ordinary scrolling.
    var atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) active = sections[sections.length - 1];

    markActive(active ? active.id : null);
  }

  // Every in-page jump counts as intent: the sticky nav, the per-section "next"
  // links, the hero scroll cue and back-to-top.
  var sectionIds = sections.map(function (s) { return s.id; });

  Array.prototype.forEach.call(
    document.querySelectorAll('a[href^="#"]'),
    function (link) {
      link.addEventListener("click", function () {
        var id = (link.getAttribute("href") || "").slice(1);
        if (sectionIds.indexOf(id) !== -1) {
          lockTo(id, 1400);
        } else if (id === "top") {
          releaseLock();
          markActive(null);
        }
      });
    }
  );

  // Any deliberate scroll input hands control back to the scroll position.
  ["wheel", "touchstart", "keydown"].forEach(function (evt) {
    window.addEventListener(evt, function () {
      if (lockedId) { releaseLock(); syncActive(); }
    }, { passive: true });
  });

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      syncActive();
      syncProgress();
      ticking = false;
    });
  }

  function onResize() {
    syncHeaderVar();
    onScroll();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("load", onResize);

  syncHeaderVar();
  syncActive();
  syncProgress();

  /* --- Reveal on entry ---------------------------------------------------- */

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });

    Array.prototype.forEach.call(revealables, function (el) { observer.observe(el); });
  }

})();
