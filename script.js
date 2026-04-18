/* ═══════════════════════════════════════════════
   PRADUMAN KUMAR — Portfolio JavaScript
   Features:
   - Dark/Light mode toggle (persisted in localStorage)
   - Responsive navbar toggle (hamburger menu)
   - Navbar scroll effect (glass-morphism on scroll)
   - Active nav link highlighting (Intersection Observer)
   - Scroll reveal animations (Intersection Observer)
   - Skill progress bar animations
   - Smooth scroll-to-top button
   - Contact form validation
═══════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   1. THEME TOGGLE (Dark / Light)
────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const root        = document.documentElement;

/**
 * Apply a theme ('dark' | 'light') and persist the choice.
 */
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('pk-theme', theme);

  // Swap icon: sun shown in dark mode (click → switch to light), moon in light mode
  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeIcon.className = 'fa-solid fa-moon';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Restore saved preference or use system preference
const savedTheme  = localStorage.getItem('pk-theme');
const systemDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ──────────────────────────────────────────────
   2. NAVBAR — Scroll glass effect
────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // Run once on load


/* ──────────────────────────────────────────────
   3. HAMBURGER MENU (Mobile)
────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});


/* ──────────────────────────────────────────────
   4. ACTIVE NAV LINK (Intersection Observer)
────────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(sec => sectionObserver.observe(sec));


/* ──────────────────────────────────────────────
   5. SCROLL REVEAL (Intersection Observer)
────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ──────────────────────────────────────────────
   6. SKILL PROGRESS BARS
   Animate when the skill section enters the viewport
────────────────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-width') || '0';
        // Small delay to ensure transition is visible
        setTimeout(() => {
          el.style.width = target + '%';
        }, 200);
        barObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

skillFills.forEach(bar => barObserver.observe(bar));


/* ──────────────────────────────────────────────
   7. SCROLL TO TOP BUTTON
────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopVisibility() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ──────────────────────────────────────────────
   8. CONTACT FORM VALIDATION
────────────────────────────────────────────── */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

/**
 * Show an error message for a field.
 * @param {HTMLElement} input - The input element
 * @param {string}      errorId - ID of the error <span>
 * @param {string}      msg - Error message to display
 */
function showError(input, errorId, msg) {
  input.classList.add('error');
  document.getElementById(errorId).textContent = msg;
}

/**
 * Clear the error state of a field.
 */
function clearError(input, errorId) {
  input.classList.remove('error');
  document.getElementById(errorId).textContent = '';
}

/**
 * Validate a single email address string.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Full form validation — returns true if all fields pass.
 */
function validateForm() {
  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const subject = document.getElementById('fsubject');
  const message = document.getElementById('fmessage');

  let valid = true;

  // Name: required, min 2 chars
  clearError(name, 'nameError');
  if (name.value.trim().length < 2) {
    showError(name, 'nameError', 'Please enter your full name (min. 2 characters).');
    valid = false;
  }

  // Email: required, valid format
  clearError(email, 'emailError');
  if (!email.value.trim()) {
    showError(email, 'emailError', 'Email address is required.');
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, 'emailError', 'Please enter a valid email address.');
    valid = false;
  }

  // Subject: required, min 3 chars
  clearError(subject, 'subjectError');
  if (subject.value.trim().length < 3) {
    showError(subject, 'subjectError', 'Please enter a subject (min. 3 characters).');
    valid = false;
  }

  // Message: required, min 10 chars
  clearError(message, 'messageError');
  if (message.value.trim().length < 10) {
    showError(message, 'messageError', 'Message must be at least 10 characters long.');
    valid = false;
  }

  return valid;
}

// Live validation: clear error when user starts typing
['fname','femail','fsubject','fmessage'].forEach((id, idx) => {
  const errIds = ['nameError','emailError','subjectError','messageError'];
  const el = document.getElementById(id);
  el.addEventListener('input', () => clearError(el, errIds[idx]));
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Simulate sending (replace with real fetch/EmailJS in production)
  const btn     = document.getElementById('btnText');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    // Reset
    contactForm.reset();
    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

    // Show success
    formSuccess.style.display = 'block';
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});


/* ──────────────────────────────────────────────
   9. SMOOTH SCROLLING (for all anchor links)
   Ensures correct offset accounting for fixed navbar
────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ──────────────────────────────────────────────
   10. HERO — Staggered entrance (already handled
       by CSS animation-delay, but we add a small
       class to trigger after DOM ready)
────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});
