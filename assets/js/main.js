tailwind.config = {
      theme: {
        extend: {
          colors: {
            'primary-blue': '#3B82F6', // Biru Cerah
            'dark-blue': '#1E3A8A',   // Biru Tua
            'light-blue-bg': '#E0F7FA', // Biru Sangat Muda
            'dark-blue-bg': '#0F172A'  // Biru Gelap untuk mode gelap
          }
        }
      }
    }

// ---- Animasi buka undangan ----
const intro = document.getElementById('intro');
const content = document.getElementById('content');
const openBtn = document.getElementById('openBtn');
const musicBtn = document.getElementById('musicBtn');


openBtn.addEventListener('click', () => {
  requestFullscreen();
    intro.classList.add('intro-hide');
    setTimeout(() => {
        intro.classList.add('hidden');
        content.classList.remove('hidden');
        musicBtn.classList.remove('hidden');
        content.classList.add('content-show');
        document.body.style.overflow = 'auto';
        bgm.play().then(() => {
            playing = true;
            toggleIcon(playing);
        }).catch(e => {
            playing = false;
            toggleIcon(playing);
            console.log("Auto-play diblokir. Klik tombol speaker untuk memulai.");
        }); 
    }, 900);
});

// ---- Nama Tamu dari URL ----
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("to");
    
    const displayIntro = document.getElementById('guestNameDisplayIntro');
    const displayContent = document.getElementById('guestNameDisplayContent');

    if (guestName) {
      guestName = decodeURIComponent(guestName.replace(/%20/g, ' '));
      guestName = guestName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      displayIntro.textContent = guestName;
      displayContent.textContent = guestName;
    } else {
      displayIntro.textContent = "Tamu Undangan";
      displayContent.textContent = "Tamu Undangan";
    }
});

// ---- Countdown ----
function startCountdown(targetDate, elementId, selesaiText = "Acara Sedang Berlangsung!") {
  const el = document.getElementById(elementId);
  if (!el) return;

  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) {
    el.innerHTML = `<span class="text-green-600 font-semibold text-lg">${selesaiText}</span>`;
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  el.innerHTML = `
    <div class="countdown-box">
      <div class="countdown-number">${d}</div>
      <div class="countdown-label">Hari</div>
    </div>
    <div class="countdown-box">
      <div class="countdown-number">${h}</div>
      <div class="countdown-label">Jam</div>
    </div>
    <div class="countdown-box">
      <div class="countdown-number">${m}</div>
      <div class="countdown-label">Menit</div>
    </div>
    <div class="countdown-box">
      <div class="countdown-number">${s}</div>
      <div class="countdown-label">Detik</div>
    </div>
  `;
}

const akadDate    = new Date("2026-02-02T08:00:00").getTime();
const resepsiDate = new Date("2026-02-03T10:00:00").getTime();
setInterval(() => {
    startCountdown(akadDate, "countdown", "Acara Sedang Berlangsung");
    startCountdown(resepsiDate, "countdown2", "Acara Sedang Berlangsung");
}, 1000);



// ---- Musik ----
const bgm = document.getElementById('bgm');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');
let playing = false;

function toggleIcon(isPlaying) {
    if (isPlaying) {
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
    } else {
        musicIconOn.classList.add('hidden');
        musicIconOff.classList.remove('hidden');
    }
}

musicBtn.addEventListener('click', () => {
    if (!playing) { 
        bgm.play().catch(e => alert("Pastikan Anda memiliki file audio valid di 'src' tag audio.")); 
        playing = true;
    }
    else { 
        bgm.pause(); 
        playing = false;
    }
    toggleIcon(playing);
});

// ---- Bunga Jatuh ----
const petalSymbols = ['✿', '❀', '❃']; // Simbol bunga/dekorasi
function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    petal.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 5 + 5;
    petal.style.animationDuration = duration + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";
    const size = Math.random() * 10 + 10;
    petal.style.fontSize = size + "px";
    document.body.appendChild(petal);
    setTimeout(() => {
        petal.remove();
    }, duration * 1000 + 2000);
}

// Bikin bunga tiap 300ms
setInterval(createPetal, 700);

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'scale-75');
            entry.target.classList.add('opacity-100', 'scale-100');
        // } else {
        //     entry.target.classList.add('opacity-0', 'scale-75');
        //     entry.target.classList.remove('opacity-100', 'scale-100');
        }
    });
}, { threshold: 0.2 });

revealItems.forEach(el => revealObserver.observe(el));

function requestFullscreen() {
    const el = document.documentElement; // fullscreen seluruh halaman

    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { // Safari
        el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { // IE/Edge lama
        el.msRequestFullscreen();
    }
}

function copyRek(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);

  const el = document.getElementById(id);
  const old = el.innerText;
  el.innerText = "Tersalin ✓";

  setTimeout(() => el.innerText = old, 1500);
}

function toggleGift() {
  const gift = document.getElementById('giftContent');
  gift.classList.toggle('hidden');
}
