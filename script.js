// ----- theme -----
const root = document.documentElement;
const stored = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
function setTheme(mode) {
  if (mode === "auto") {
    root.setAttribute("data-theme", systemDark ? "dark" : "light");
  } else {
    root.setAttribute("data-theme", mode);
  }
  localStorage.setItem("theme", mode);
}
setTheme(stored || "auto");

document.getElementById("themeToggle").addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "auto";
  const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
  setTheme(next);
});

// ----- mobile menu -----
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ----- reveal on scroll -----
const io = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ----- role rotator -----
const roles = ["HTML • CSS • JavaScript", "Frontend Developer", "UI Focus • Responsive", "Clean & Fast Web Apps"];
const rotator = document.getElementById("roleRotator");
let r = 0;
setInterval(() => {
  r = (r + 1) % roles.length;
  rotator.textContent = roles[r];
}, 2200);

// ----- contact form (Web3Forms AJAX) -----
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";
  const formData = new FormData(form);
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      statusEl.textContent = "Thanks! Your message has been sent.";
      form.reset();
    } else {
      statusEl.textContent = "Failed to send. Please try again.";
    }
  } catch (err) {
    statusEl.textContent = "Network error. Please try later.";
  }
});

// ----- year -----
document.getElementById("year").textContent = new Date().getFullYear();
