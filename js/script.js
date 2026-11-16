
// ==========================================
// SMK NEGERI 2 KLATEN
// JAVASCRIPT WEBSITE INTERAKTIF
// ==========================================

// Mengambil elemen HTML
const $ = (id) => document.getElementById(id);

const tombolTema = $('theme');
const tombolMenu = $('hamburger');
const menu = $('menu');
const tombolAtas = $('top');
const kolomCari = $('cari');
const track = $('majorTrack');
const formulir = $('contactForm');
const modal = $('imageModal');
const gambarModal = $('modalImage');

// 1. DARK MODE / LIGHT MODE
tombolTema?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  const terang = document.body.classList.contains('light-mode');
  tombolTema.innerHTML = `<span class="theme-icon">${terang ? '☀' : '◐'}</span>`;
});

// 2. MENU NAVIGASI
tombolMenu?.addEventListener('click', () => {
  const terbuka = menu.classList.toggle('open');
  tombolMenu.setAttribute('aria-expanded', terbuka);
  tombolMenu.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.remove('open');
    tombolMenu?.setAttribute('aria-expanded', 'false');
  });
});

// 3. PENCARIAN JURUSAN
function cariJurusan() {
  const kata = kolomCari.value.toLowerCase().trim();
  let jumlah = 0;

  document.querySelectorAll('.major-card').forEach(kartu => {
    const cocok = kartu.textContent.toLowerCase().includes(kata);
    kartu.style.display = cocok ? '' : 'none';
    if (cocok) jumlah++;
  });

  const hasil = $('searchCount');
  if (hasil) hasil.textContent = jumlah + ' PROGRAM';
}

kolomCari?.addEventListener('input', cariJurusan);

// 4. SLIDER JURUSAN
$('majorNext')?.addEventListener('click', () => {
  track?.scrollBy({ left: 330, behavior: 'smooth' });
});

$('majorPrev')?.addEventListener('click', () => {
  track?.scrollBy({ left: -330, behavior: 'smooth' });
});

// 5. VALIDASI FORMULIR
formulir?.addEventListener('submit', e => {
  e.preventDefault();

  const nama = $('nama')?.value.trim();
  const email = $('email')?.value.trim();
  const pesan = $('pesan')?.value.trim();
  const hasil = $('formMessage');

  if (!nama || !email || !pesan) {
    hasil.textContent = 'Semua kolom wajib diisi!';
    hasil.style.color = '#9a342d';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    hasil.textContent = 'Format email belum benar!';
    hasil.style.color = '#9a342d';
    return;
  }

  hasil.textContent = 'Pesan berhasil divalidasi. Ini hanya simulasi dan belum dikirim ke server.';
  hasil.style.color = '#285b38';
  formulir.reset();
});

// 6. GALERI FOTO
function tutupModal() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  if (gambarModal) gambarModal.src = '';
}

document.querySelectorAll('.gallery-item').forEach(tombol => {
  tombol.addEventListener('click', () => {
    if (!modal || !gambarModal) return;

    gambarModal.src = tombol.dataset.full;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

$('modalClose')?.addEventListener('click', tutupModal);

modal?.addEventListener('click', e => {
  if (e.target === modal) tutupModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') tutupModal();
});

// 7. KEMBALI KE ATAS
window.addEventListener('scroll', () => {
  tombolAtas?.classList.toggle('show', window.scrollY > 400);
});

tombolAtas?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 8. FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(tombol => {
  tombol.addEventListener('click', () => {
    const item = tombol.parentElement;
    const terbuka = item.classList.toggle('open');

    tombol.setAttribute('aria-expanded', terbuka);

    const simbol = tombol.querySelector('span');
    if (simbol) simbol.textContent = terbuka ? '−' : '+';
  });
});

// 9. TAHUN OTOMATIS
if ($('year')) {
  $('year').textContent = new Date().getFullYear();
}

// 10. JAM DIGITAL REALTIME
function updateClock() {
  const sekarang = new Date();

  if ($('clock')) {
    $('clock').textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(sekarang);
  }

  if ($('date')) {
    $('date').textContent = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(sekarang);
  }
}

updateClock();
setInterval(updateClock, 1000);
