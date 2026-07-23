/* preritahuja.com — theme toggle, mobile nav, scroll-spy, reveal, email decode */
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

  /* --- Mobile nav disclosure --------------------------------------------- */

  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.dataset.open = open ? "true" : "false";
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", (open ? "Close" : "Open") + " section menu");
  }

  if (menuBtn && nav) {
    setMenu(false);

    menuBtn.addEventListener("click", function () {
      setMenu(nav.dataset.open !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.dataset.open === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (nav.dataset.open !== "true") return;
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
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

  function markActive(id) {
    navLinks.forEach(function (link) {
      if (id && link.dataset.nav === id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
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
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  syncActive();

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

  /* --- Email: decode the XOR-hex address at runtime ----------------------- */

  var emailEl = document.getElementById("email");

  if (emailEl && emailEl.dataset.e) {
    var hex = emailEl.dataset.e;
    var key = parseInt(hex.slice(0, 2), 16);
    var address = "";

    for (var j = 2; j < hex.length; j += 2) {
      address += String.fromCharCode(parseInt(hex.substr(j, 2), 16) ^ key);
    }

    emailEl.href = "mailto:" + address;
    emailEl.textContent = address;

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-email-link]"),
      function (el) { el.href = "mailto:" + address; }
    );
  }
})();
