/* ==========================================================================
   Navigation, blog interactions, and the small freshness check.
   ========================================================================== */

(() => {
  "use strict";

  const doc = document.documentElement;
  const body = document.body;
  const script = document.currentScript;

  /* ------------------------------------------------------------------------
     Light / dark theme
     ------------------------------------------------------------------------ */

  const themeToggle = document.querySelector(".theme-toggle");
  const themeKey = "xb-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const readTheme = () => {
    try {
      const value = window.localStorage.getItem(themeKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (_) {
      return null;
    }
  };

  const applyTheme = (theme, persist) => {
    doc.dataset.theme = theme;

    if (themeToggle) {
      const isDark = theme === "dark";
      const label = isDark
        ? themeToggle.dataset.lightLabel || "Switch to light theme"
        : themeToggle.dataset.darkLabel || "Switch to dark theme";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }

    if (persist) {
      try {
        window.localStorage.setItem(themeKey, theme);
      } catch (_) {
        // Private mode can block storage. The current page still switches.
      }
    }

    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove());
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = theme === "dark" ? "#0d151a" : "#fbfaf6";
    document.head.appendChild(meta);
  };

  let currentTheme =
    doc.dataset.theme || readTheme() || (systemTheme.matches ? "dark" : "light");
  applyTheme(currentTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme, true);
    });
  }

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener("change", (event) => {
      if (readTheme()) return;
      currentTheme = event.matches ? "dark" : "light";
      applyTheme(currentTheme, false);
    });
  }

  /* ------------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------------ */

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".site-nav");

  if (hamburger && nav) {
    const label = hamburger.querySelector(".sr-only");

    const setMenu = (open) => {
      nav.classList.toggle("active", open);
      body.classList.toggle("menu-open", open);
      hamburger.setAttribute("aria-expanded", String(open));
      if (label) {
        const nextLabel = open
          ? hamburger.dataset.closeLabel || "Close menu"
          : hamburger.dataset.openLabel || "Open menu";
        label.textContent = nextLabel;
      }
    };

    hamburger.addEventListener("click", () => {
      setMenu(!nav.classList.contains("active"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("active")) {
        setMenu(false);
        hamburger.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("active")) return;
      if (nav.contains(event.target) || hamburger.contains(event.target)) return;
      setMenu(false);
    });

    const desktop = window.matchMedia("(min-width: 769px)");
    if (desktop.addEventListener) {
      desktop.addEventListener("change", (event) => {
        if (event.matches) setMenu(false);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Blog hover preview and category filters
     ------------------------------------------------------------------------ */

  const blogEntries = Array.from(document.querySelectorAll(".blog-entry"));
  const preview = document.querySelector(".hover-preview");
  const subtitle = document.querySelector(".preview-subtitle");
  const branchSvg = document.querySelector(".branch-svg");
  const branchPath = document.querySelector(".branch-path");
  const legendItems = Array.from(document.querySelectorAll(".legend-item"));
  const blogList = document.getElementById("blog-list");

  if (blogEntries.length && preview && subtitle && blogList) {
    const placePreview = () => {
      const viewportWidth = window.innerWidth;
      const listRight = blogList.getBoundingClientRect().right;
      const left = Math.max(
        viewportWidth / 2 + (viewportWidth >= 1400 ? 220 : 120),
        listRight + 40
      );
      const width = Math.min(viewportWidth >= 1400 ? 360 : 320, viewportWidth - 32 - left);
      if (width < 200) return false;

      preview.style.left = `${left}px`;
      preview.style.width = `${width}px`;
      return true;
    };

    const drawBranch = (entry) => {
      if (!branchSvg || !branchPath) return;

      const title = entry.querySelector(".blog-title");
      if (!title) return;

      const from = title.getBoundingClientRect();
      const to = preview.getBoundingClientRect();
      const sx = from.right + 12;
      const sy = from.top + from.height / 2;
      const ex = to.left - 16;
      const ey = to.top + to.height / 2;
      const bend = (ex - sx) * 0.45;

      branchPath.setAttribute(
        "d",
        `M ${sx} ${sy} C ${sx + bend} ${sy}, ${ex - bend} ${ey}, ${ex} ${ey}`
      );

      const length = branchPath.getTotalLength();
      branchPath.style.transition = "none";
      branchPath.style.strokeDasharray = String(length);
      branchPath.style.strokeDashoffset = String(length);
      branchPath.getBoundingClientRect();
      branchPath.style.transition = "";
      branchPath.style.strokeDashoffset = "0";
    };

    blogEntries.forEach((entry) => {
      entry.addEventListener("mouseenter", () => {
        if (window.innerWidth <= 768 || !placePreview()) return;
        subtitle.textContent = entry.getAttribute("data-subtitle") || "";
        preview.classList.add("visible");
        drawBranch(entry);
        if (branchSvg) branchSvg.classList.add("visible");
      });

      entry.addEventListener("mouseleave", () => {
        preview.classList.remove("visible");
        if (branchSvg) branchSvg.classList.remove("visible");
      });
    });

    if (legendItems.length) {
      let activeFilter = null;

      const applyFilter = (category) => {
        activeFilter = category;
        legendItems.forEach((item) => {
          const active = item.dataset.category === category;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        blogEntries.forEach((entry) => {
          entry.classList.toggle("hidden", !entry.classList.contains(category));
        });
      };

      legendItems.forEach((item) => {
        item.setAttribute("aria-pressed", "false");
        item.addEventListener("click", () => {
          const category = item.dataset.category;
          if (activeFilter === category) {
            activeFilter = null;
            legendItems.forEach((legend) => {
              legend.classList.remove("active");
              legend.setAttribute("aria-pressed", "false");
            });
            blogEntries.forEach((entry) => entry.classList.remove("hidden"));
            return;
          }
          applyFilter(category);
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     Fresh HTML
     GitHub Pages does not let us set Cache-Control. So:
       1. every page asks for build.json with cache: "no-store";
       2. if the deployed build is newer, it reloads once;
       3. the service worker serves navigations network-first.
     ------------------------------------------------------------------------ */

  if (script) {
    const siteRoot = new URL("../../", script.src);

    fetch(new URL("build.json", siteRoot), { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data || !data.version) return;

        const current = doc.dataset.build;
        if (!current || current === data.version) return;

        const guard = `xb:reload:${data.version}`;
        try {
          if (sessionStorage.getItem(guard)) return;
          sessionStorage.setItem(guard, "1");
        } catch (_) {
          return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set("v", data.version);
        window.location.replace(url.href);
      })
      .catch(() => {
        // Offline or blocked: the page already works.
      });

    if ("serviceWorker" in navigator) {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "[::1]";

      if (window.location.protocol === "https:" || isLocal) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register(new URL("sw.js", siteRoot), { scope: siteRoot.pathname })
            .catch(() => {
              // A page should never depend on a service worker.
            });
        });
      }
    }
  }
})();
