// ── Wedding Kenangan Page JS ──────────────────────────────────

// ── Theme Toggle (shared key with dashboard) ─────────────────
const THEME_KEY = 'dashboard-theme';

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const iconSun  = document.getElementById('themeIconSun');
  const iconMoon = document.getElementById('themeIconMoon');
  if (iconSun && iconMoon) {
    iconSun.style.display  = theme === 'dark' ? 'block' : 'none';
    iconMoon.style.display = theme === 'dark' ? 'none'  : 'block';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Gallery Data ─────────────────────────────────────────────
const timelineData = {
  akad: [
    'SIRL0076.webp','SIRL0080.webp','SIRL0084.webp',
    'SIRL0092.webp','SIRL0104.webp','SIRL0111.webp',
    'SIRL0118.webp','SIRL0142.webp','SIRL0155.webp',
  ],
  resepsi: [
    'SIRL0161.webp','SIRL0163.webp','SIRL0175.webp',
    'SIRL0191.webp','SIRL0203.webp','SIRL0222.webp',
    'SIRL0226.webp','SIRL0240.webp','SIRL0247.webp',
  ],
  momen: [
    'SIRL0256.webp','SIRL0377.webp','SIRL0383.webp',
    'SIRL0404.webp','SIRL0423.webp','SIRL0522.webp',
    'SIRL0529.webp','SIRL0539.webp','SIRL0550.webp',
  ]
};

const galleryImages = [
  'SIRL0560.webp','SIRL0562.webp','SIRL0566.webp','SIRL0569.webp',
  'SIRL0575.webp','SIRL0584.webp','SIRL0596.webp','SIRL0603.webp',
  'SIRL0610.webp','SIRL0615.webp','SIRL0628.webp','SIRL0635.webp',
  'SIRL0646.webp','SIRL0653.webp','SIRL0655.webp','SIRL0659.webp',
  'SIRL0666.webp','SIRL0677.webp','SIRL0682.webp','SIRL0688.webp',
  'SIRL0700.webp','SIRL0714.webp','SIRL0717.webp','SIRL0724.webp',
];

const IMG_BASE = '/assets/wed/';

// ── Render Timeline Grids ────────────────────────────────────
function renderTimeline() {
  Object.keys(timelineData).forEach(section => {
    const container = document.getElementById(`timeline-${section}`);
    if (!container) return;
    timelineData[section].forEach(file => {
      const div = document.createElement('div');
      div.className = 'overflow-hidden rounded-xl shadow-lg group cursor-pointer reveal';
      div.innerHTML = `<img src="${IMG_BASE}${file}" alt="Foto ${section}" loading="lazy"
        class="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105">`;
      div.addEventListener('click', () => openLightbox(IMG_BASE + file));
      container.appendChild(div);
    });
  });
}

// ── Render Gallery Grid ──────────────────────────────────────
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;
  galleryImages.forEach(file => {
    const div = document.createElement('div');
    div.className = 'overflow-hidden rounded-xl shadow-lg group cursor-pointer reveal';
    div.innerHTML = `<img src="${IMG_BASE}${file}" alt="Galeri Pernikahan" loading="lazy"
      class="w-full h-44 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105">`;
    div.addEventListener('click', () => openLightbox(IMG_BASE + file));
    container.appendChild(div);
  });
}

// ── Lightbox ─────────────────────────────────────────────────
let lightboxEl = null;

function createLightbox() {
  lightboxEl = document.createElement('div');
  lightboxEl.id = 'lightbox';
  lightboxEl.className = 'lightbox-overlay';
  lightboxEl.innerHTML = `
    <button id="lightboxClose" class="lightbox-close" aria-label="Tutup">&times;</button>
    <img id="lightboxImg" class="lightbox-img" src="" alt="Preview">
  `;
  document.body.appendChild(lightboxEl);

  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(src) {
  if (!lightboxEl) createLightbox();
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lightboxEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove('active');
  document.body.style.overflow = '';
}

// ── Scroll Reveal (IntersectionObserver) ─────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Video Autoplay on Scroll (IntersectionObserver) ────────────
function initVideoAutoplay() {
  const videoIframe = document.getElementById('weddingVideo');
  if (!videoIframe) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Jika video masuk ke area pandang (visible)
      if (entry.isIntersecting) {
        // Kirim perintah play ke YouTube API
        videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else {
        // Pause saat video keluar dari area pandang (opsional)
        videoIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  }, { threshold: 0.5 }); // Mulai memutar saat 50% video terlihat

  observer.observe(videoIframe);
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getPreferredTheme());

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

  renderTimeline();
  renderGallery();
  initVideoAutoplay();

  // Delay observer slightly so DOM-injected elements can be found
  requestAnimationFrame(() => {
    initReveal();
  });
});
