(() => {
  "use strict";
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const icon = toggle?.querySelector("i");
  const label = toggle?.querySelector(".theme-label");
  const saved = localStorage.getItem("portfolio-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  function applyTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    if (icon) icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
  }
  applyTheme(saved || preferred);
  toggle?.addEventListener("click", () => {
    const next = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next); applyTheme(next);
  });

  const counters = document.querySelectorAll(".stat-number");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0), suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const start = performance.now(), duration = 1200;
    const tick = (now) => { const progress = Math.min((now - start) / duration, 1); el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))) + suffix; if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } }), { threshold: .45 });
  counters.forEach(c => observer.observe(c));

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("contactForm")?.addEventListener("submit", (event) => {
    event.preventDefault(); const form = event.currentTarget, status = document.getElementById("formStatus");
    if (!form.checkValidity()) { form.classList.add("was-validated"); status.textContent = "Please complete all required fields."; return; }
    status.textContent = "Thanks! This demo is ready to connect to a form service or back end."; form.reset(); form.classList.remove("was-validated");
  });
})();