// main.js - CR7 Tribute Website

// --- Hamburger menu ---
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger) return;

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// --- Scroll counter animation ---
function animateCounter(el, target) {
  let count = 0;
  const timer = setInterval(function () {
    count += Math.ceil(target / 50);
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count;
  }, 30);
}

// --- Start counters when visible ---
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });

  nums.forEach(function (el) { observer.observe(el); });
}

// --- Nav changes on scroll ---
function initNavScroll() {
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(8,8,8,1)';
    } else {
      nav.style.background = 'rgba(8,8,8,0.95)';
    }
  });
}

// --- Form validation ---
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    document.querySelectorAll('.error').forEach(function (el) {
      el.textContent = '';
    });

    if (name.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Please enter your name.';
      valid = false;
    }

    if (!email.value.includes('@')) {
      document.getElementById('email-error').textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (message.value.trim().length < 10) {
      document.getElementById('msg-error').textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (valid) {
      const success = document.getElementById('form-success');
      success.style.display = 'block';
      form.reset();
      setTimeout(function () {
        success.style.display = 'none';
      }, 3000);
    }
  });
}

// --- Run everything ---
document.addEventListener('DOMContentLoaded', function () {
  initHamburger();
  initCounters();
  initNavScroll();
  initForm();
});