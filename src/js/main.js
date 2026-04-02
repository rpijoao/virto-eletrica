/* ══════════════════════════════════════════════════
   VIRTO ELÉTRICA — Home Page JS
   Menu hamburger + Scroll Reveal
   ══════════════════════════════════════════════════ */

import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/home.css';

// ── Hamburger Menu ──
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Expor globalmente para os onclick inline
window.toggleMenu = toggleMenu;

// ── Scroll Reveal ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
