// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Tutup menu saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ==================== SMOOTH SCROLL & NAV BUTTONS ====================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Tombol Hire Me (navbar & home)
const hireNav = document.getElementById('hireNavBtn');
const hireHome = document.getElementById('hireHomeBtn');
if (hireNav) hireNav.addEventListener('click', () => scrollToSection('contact'));
if (hireHome) hireHome.addEventListener('click', () => scrollToSection('contact'));

// View My Project -> scroll ke project
const viewProjectBtn = document.getElementById('viewProjectBtn');
if (viewProjectBtn) viewProjectBtn.addEventListener('click', () => scrollToSection('projects'));

// View All Service -> alert sederhana dan scroll ke service (optional)
const viewAllService = document.getElementById('viewAllServiceBtn');
if (viewAllService) {
  viewAllService.addEventListener('click', () => {
    alert("Tersedia 3 layanan utama: UI/UX, Web Dev, Data Analyst. Untuk konsultasi silakan hubungi kontak.");
    scrollToSection('services');
  });
}

// View All Project (tombol di project header)
const viewAllProjects = document.getElementById('viewAllProjectsBtn');
if (viewAllProjects) {
  viewAllProjects.addEventListener('click', () => {
    alert("Menampilkan 3 proyek terbaru. Lihat portofolio lengkap segera hadir!");
  });
}

// Tombol Learn More pada service cards
const learnButtons = document.querySelectorAll('.learn-more');
learnButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = btn.closest('.service-card');
    const serviceName = card.querySelector('h3')?.innerText || 'Layanan';
    alert(`Detail lebih lanjut tentang ${serviceName}. Hubungi saya untuk informasi lengkap.`);
  });
});

// Tombol View Project di project cards
const viewProjectBtns = document.querySelectorAll('.view-project');
viewProjectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Demo project: Silakan hubungi untuk melihat full case study.");
  });
});

// Download CV (simulasi)
const downloadBtn = document.getElementById('downloadCvBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // Membuat file dummy untuk diunduh
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,SGVyZSBpcyB5b3VyIFNWIFRlc3QgKENWKSAtIFNlZmlhbiBTeWFraXIgQWxhYmlkIC0gUG9ydGZvbGlvIERlbW8=';
    link.download = 'CV_Sefian_Syakir.pdf';
    link.click();
    alert("CV sample akan diunduh (demo).");
  });
}

// ==================== FORM SUBMIT HANDLER ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    if (!name || !email || !message) {
      alert("Harap isi nama, email, dan pesan.");
      return;
    }
    alert(`Terima kasih ${name}, pesan Anda telah terkirim! Kami akan membalas ke ${email}`);
    contactForm.reset();
  });
}

// Optional: Menambahkan efek aktif pada navbar saat scroll (tidak wajib tapi membantu)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Tambahan styling untuk active link di navbar
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #2563eb !important;
    font-weight: 700;
  }
`;
document.head.appendChild(style);