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
