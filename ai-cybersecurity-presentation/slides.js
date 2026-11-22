/* ============================================================
   cybersecurity-presentation — إدارة الشريحات
   ============================================================ */

const slides = Array.from(document.querySelectorAll('.slide'));
const counterEl = document.getElementById('slideCounter');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const total = slides.length;
let current = 0;

function goToSlide(index) {
  const next = Math.min(Math.max(index, 0), total - 1);
  slides.forEach((slide, i) => slide.classList.toggle('active', i === next));
  current = next;

  if (counterEl) {
    counterEl.textContent = (next + 1) + ' / ' + total;
  }

  if (progressBar) {
    progressBar.style.width = ((next + 1) / total) * 100 + '%';
  }
}

function nextSlide() {
  goToSlide(current + 1);
}

function prevSlide() {
  goToSlide(current - 1);
}

/* أزرار التنقل */
if (nextBtn) {
  nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
  prevBtn.addEventListener('click', prevSlide);
}

/* التنقل عبر لوحة المفاتيح */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    prevSlide();
  } else if (e.key === 'Home') {
    goToSlide(0);
  } else if (e.key === 'End') {
    goToSlide(total - 1);
  }
});

/* التنقل عبر التمرير اللمسي (الجوال) */
let touchStartX = null;
let touchStartY = null;

document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;

  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  touchStartX = null;
  touchStartY = null;

  if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextSlide();
    else prevSlide();
  }
}, { passive: true });

/* تحديث الحالة عند التحميل */
goToSlide(0);
