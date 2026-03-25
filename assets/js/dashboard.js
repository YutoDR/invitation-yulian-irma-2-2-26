// ── Theme Toggle ──────────────────────────────────────────────
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

// ── Staggered Card Animation ─────────────────────────────────
function animateCards() {
  const grid = document.querySelector('.card-grid');
  if (grid) grid.classList.add('js-anim');

  const cards = document.querySelectorAll('.invite-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('card-visible');
    }, 150 + i * 150);
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getPreferredTheme());
  animateCards();

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
});
