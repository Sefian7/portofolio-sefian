// ===== DOM Elements =====
const mobileToggle = document.getElementById('mobileToggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    navbar.classList.toggle('active-navbar');
    const expanded = navbar.classList.contains('active-navbar');
    mobileToggle.setAttribute('aria-expanded', expanded);
    // Ubah icon hamburger / close
    const icon = mobileToggle.querySelector('i');
    if (expanded) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

mobileToggle.addEventListener('click', toggleMobileMenu);

// Tutup mobile menu saat link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active-navbar')) {
            toggleMobileMenu();
        }
    });
});

// ===== Active Navigation based on scroll =====
function handleActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 150; // offset

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active-nav');
        }
    });
}

window.addEventListener('scroll', handleActiveNav);
window.addEventListener('load', handleActiveNav);

// ===== Smooth scroll dengan CSS sudah ada, tapi perbaiki klik pada tombol CTA =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Tutup mobile menu jika terbuka
            if (navbar.classList.contains('active-navbar')) {
                toggleMobileMenu();
            }
        }
    });
});

// ===== Form Submit Handling (Demo) =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formFeedback.textContent = 'Harap isi semua bidang!';
        formFeedback.style.color = '#e53e3e';
        setTimeout(() => { formFeedback.textContent = ''; }, 2500);
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        formFeedback.textContent = 'Masukkan email yang valid.';
        formFeedback.style.color = '#e53e3e';
        setTimeout(() => { formFeedback.textContent = ''; }, 2500);
        return;
    }

    // Simulasi pengiriman sukses
    formFeedback.textContent = `Terima kasih ${name}! Pesan Anda telah terkirim.`;
    formFeedback.style.color = '#4c51bf';
    contactForm.reset();
    setTimeout(() => {
        formFeedback.textContent = '';
    }, 4000);
});

// ===== Efek tambahan: Hover interaktif ringan untuk skill dan card =====
const cards = document.querySelectorAll('.about-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.25s ease, box-shadow 0.3s';
    });
});

// ===== Intersection Observer untuk fade-in (opsional) =====
const fadeElements = document.querySelectorAll('.about-card, .project-card, .hero-content, .contact-wrapper');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});