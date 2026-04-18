/* ══════════════════════════════════════════════════
   VIRTO ELÉTRICA — Home Page JS
   Menu hamburger + Scroll Reveal
   ══════════════════════════════════════════════════ */

import { inject } from '@vercel/analytics';

import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/home.css';

// Vercel Analytics
inject();

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
  initGaleria();
});

// ── Galeria & Lightbox ──
const galeriaItens = [
  { ico: `🗂️`, label: `Quadro Elétrico`, src: null },
  { ico: `💡`, label: `Iluminação LED`, src: null },
  { ico: `🔌`, label: `Instalação Tomadas`, src: null },
  { ico: `⚡`, label: `Passagem de Cabeamento`, src: null },
  { ico: `🛠️`, label: `Manutenção Preventiva`, src: null },
  { ico: `🏗️`, label: `Instalação Comercial`, src: null },
];

let lightboxIndex = 0;

function initGaleria() {
  // Verifica se há imagens reais definidas e substitui os placeholders
  const items = document.querySelectorAll('.galeria-item');
  items.forEach((item, i) => {
    const dado = galeriaItens[i];
    if (dado && dado.src) {
      item.innerHTML = `
        <img src="${dado.src}" alt="${dado.label}" loading="lazy">
        <div class="galeria-overlay"><span>Ver foto</span></div>
      `;
    }
  });

  // Fechar lightbox com Escape e navegar com setas
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('ativo')) return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowLeft') navegarLightbox(-1);
    if (e.key === 'ArrowRight') navegarLightbox(1);
  });
}

function abrirLightbox(index) {
  lightboxIndex = index;
  renderizarLightbox();
  const lb = document.getElementById('lightbox');
  lb.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('ativo');
  document.body.style.overflow = '';
}

function navegarLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + galeriaItens.length) % galeriaItens.length;
  renderizarLightbox();
}

function renderizarLightbox() {
  const dado = galeriaItens[lightboxIndex];
  const content = document.querySelector('.lightbox-content');

  if (dado.src) {
    content.innerHTML = `<img src="${dado.src}" alt="${dado.label}">`;
  } else {
    document.getElementById('lightboxIco').textContent = dado.ico;
    document.getElementById('lightboxLabel').textContent = dado.label;
  }
}

// Expor funções globalmente para os onclick inline
window.abrirLightbox   = abrirLightbox;
window.fecharLightbox  = fecharLightbox;
window.navegarLightbox = navegarLightbox;
