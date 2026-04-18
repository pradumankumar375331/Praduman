/* ═══════════════════════════════════════════════
   PRADUMAN KUMAR — Portfolio JavaScript
   Final Clean Version (Stable + Safe)
═══════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   1. THEME TOGGLE (Dark / Light)
────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const root        = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('pk-theme', theme);

  if (theme === 'dark') {
    themeIcon && (themeIcon.className = 'fa-solid fa-sun');
    themeToggle?.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeIcon && (themeIcon.className = 'fa-solid fa-moon');
    themeToggle?.setAttribute('aria-label', 'Switch to dark mode');
  }
}

const savedTheme = localStorage.getItem('pk-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ──────────────────────────────────────────────
   2. NAVBAR SCROLL EFFECT
────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* ──────────────────────────────────────────────
   3. HAMBURGER MENU (Mobile)
────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', false);
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar?.contains(e.target)) {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
  }
});


/* ──────────────────────────────────────────────
   4. ACTIVE NAV LINK
────────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));


/* ──────────────────────────────────────────────
   5. SCROLL REVEAL
────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ──────────────────────────────────────────────
   6. SKILL PROGRESS BARS
────────────────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.getAttribute('data-width') || '0';

      setTimeout(() => {
        el.style.width = target + '%';
      }, 200);

      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(bar => barObserver.observe(bar));


/* ──────────────────────────────────────────────
   7. SCROLL TO TOP BUTTON
────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ──────────────────────────────────────────────
   8. CONTACT FORM VALIDATION
────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(input, errorId, msg) {
  input.classList.add('error');
  const err = document.getElementById(errorId);
  if (err) err.textContent = msg;
}

function clearError(input, errorId) {
  input.classList.remove('error');
  const err = document.getElementById(errorId);
  if (err) err.textContent = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const subject = document.getElementById('fsubject');
  const message = document.getElementById('fmessage');

  let valid = true;

  clearError(name, 'nameError');
  if (name.value.trim().length < 2) {
    showError(name, 'nameError', 'Enter valid name');
    valid = false;
  }

  clearError(email, 'emailError');
  if (!email.value.trim() || !isValidEmail(email.value)) {
    showError(email, 'emailError', 'Enter valid email');
    valid = false;
  }

  clearError(subject, 'subjectError');
  if (subject.value.trim().length < 3) {
    showError(subject, 'subjectError', 'Enter subject');
    valid = false;
  }

  clearError(message, 'messageError');
  if (message.value.trim().length < 10) {
    showError(message, 'messageError', 'Message too short');
    valid = false;
  }

  return valid;
}

// Live error clearing
['fname','femail','fsubject','fmessage'].forEach((id, i) => {
  const errIds = ['nameError','emailError','subjectError','messageError'];
  const el = document.getElementById(id);

  el?.addEventListener('input', () => {
    clearError(el, errIds[i]);
  });
});

// Submit handler
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const btn = document.getElementById('btnText');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  setTimeout(() => {
    contactForm.reset();

    if (btn) {
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    }

    if (formSuccess) {
      formSuccess.style.display = 'block';

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 4000);
    }
  }, 1500);
});


/* ──────────────────────────────────────────────
   9. SMOOTH SCROLL
────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});


/* ──────────────────────────────────────────────
   10. PAGE LOAD
────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});
