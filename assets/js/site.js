// Theme toggle, reveal-on-scroll and pausing off-screen videos.
(function () {
  const root = document.documentElement;
  root.classList.add("js");

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    const sync = () => {
      btn.textContent = isDark() ? "☀" : "☾";
      btn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
    };
    sync();
    btn.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      localStorage.setItem("theme", root.dataset.theme);
      sync();
    });
  });

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealer.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

  const player = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !reduced) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.25 });
  document.querySelectorAll("video[data-autoplay]").forEach((v) => player.observe(v));
})();

// Download buttons marked data-release="owner/repo" follow the newest GitHub release: the label
// shows its version and the link goes straight to the asset ending in data-asset (.apk, .msi).
// Without the API (offline, rate limit) they keep pointing at the releases/latest page.
(() => {
  const buttons = document.querySelectorAll("a[data-release]");
  if (!buttons.length) return;
  const latest = (repo) => {
    const key = "release:" + repo;
    try {
      const hit = JSON.parse(sessionStorage.getItem(key) || "null");
      if (hit && Date.now() - hit.at < 3600e3) return Promise.resolve(hit.data);
    } catch (e) {}
    return fetch("https://api.github.com/repos/" + repo + "/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const data = {
          tag: json.tag_name,
          assets: (json.assets || []).map((a) => ({ name: a.name, url: a.browser_download_url })),
        };
        try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch (e) {}
        return data;
      });
  };
  const requests = {};
  buttons.forEach((a) => {
    const repo = a.dataset.release;
    requests[repo] = requests[repo] || latest(repo);
    requests[repo].then((data) => {
      if (!data || !data.tag) return;
      a.textContent = "Download " + data.tag;
      const suffix = (a.dataset.asset || "").toLowerCase();
      const asset = suffix && data.assets.find((x) => x.name.toLowerCase().endsWith(suffix));
      if (asset) a.href = asset.url;
    }).catch(() => {});
  });
})();
