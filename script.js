
/* 1. NAVBAR SCROLL SHADOW */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

/* 2. MENU */
const menuBtn = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

/* 3. ACTIVE NAV LINK */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-links a")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

/* 4. DARK MODE TOGGLE */
const themeBtn = document.getElementById("themeToggle");
const sunSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
themeBtn.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-mode");
  themeBtn.innerHTML = dark ? moonSVG : sunSVG;
});

/* 5. LIVE SCORE TICKER (simulated) */
let runs = 245,
  balls = 255;
const scoreEl = document.getElementById("indScore");
const runOpts = [0, 0, 1, 1, 1, 2, 4, 6];
setInterval(() => {
  const r = runOpts[Math.floor(Math.random() * runOpts.length)];
  runs += r;
  balls += 1;
  const ov = Math.floor(balls / 6),
    b = balls % 6;
  if (scoreEl) scoreEl.textContent = `${runs}/5`;
  const oversEl = scoreEl?.nextElementSibling;
  if (oversEl) oversEl.textContent = `(${ov}.${b})`;
}, 5000);

/* 6. SCROLL REVEAL — IntersectionObserver */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }, i * 80); // staggered delay
      }
    });
  },
  { threshold: 0.08 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* 7. PERFORMER CARD CAROUSEL (simple) */
const row = document.getElementById("performersRow");
const prev = document.getElementById("perfPrev");
const next = document.getElementById("perfNext");
if (row && prev && next) {
  const scrollAmt = 180;
  prev.addEventListener("click", () =>
    row.scrollBy({ left: -scrollAmt, behavior: "smooth" }),
  );
  next.addEventListener("click", () =>
    row.scrollBy({ left: scrollAmt, behavior: "smooth" }),
  );
}

/* 8. SEARCH: highlight on focus */
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") searchInput.blur();
  });
}

console.log("🏏 CricScore loaded");
