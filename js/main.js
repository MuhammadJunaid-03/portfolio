/* ═══════════════════════════════════════════
   MAIN JS — Portfolio
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initTypingEffect();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initContactForm();
  setFooterYear();
});

/* --- Typing Effect ---
   EDIT: Change the words array to customize what gets typed */
function initTypingEffect() {
  const words = [
    'web applications.',
    'mobile games.',
    'AR experiences.',
    'multiplayer systems.',
    'Unity projects.',
  ];

  const el = document.getElementById('typed-text');
  if (!el) return;

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseAfterType = 2000;
  const pauseAfterDelete = 400;

  function tick() {
    const current = words[wordIdx];
    el.textContent = current.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        setTimeout(() => { deleting = true; tick(); }, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
}

/* --- Sticky Navbar with background on scroll --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    // Toggle background
    navbar.classList.toggle('nav-scrolled', window.scrollY > 50);

    // Highlight active section link
    let current = '';
    for (const section of sections) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* --- Scroll Reveal (IntersectionObserver) --- */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Respect animation-delay from inline styles
          const delay = entry.target.style.animationDelay || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    form.querySelectorAll('.error-msg').forEach(msg => msg.classList.add('hidden'));
    form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    // Validate name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
      showError(name);
      valid = false;
    }

    // Validate email
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email);
      valid = false;
    }

    // Validate message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
      showError(message);
      valid = false;
    }

    if (valid) {
      // Show success (replace with EmailJS / backend call for real use)
      document.getElementById('form-success').classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        document.getElementById('form-success').classList.add('hidden');
      }, 5000);
    }
  });

  function showError(input) {
    input.classList.add('error');
    input.parentElement.querySelector('.error-msg').classList.remove('hidden');
  }
}

/* --- Footer Year --- */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
