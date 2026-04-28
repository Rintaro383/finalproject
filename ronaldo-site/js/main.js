// main.js - JavaScript File - CR7 Cristiano Ronaldo Tribute Website

// --- Hamburger menu for mobile navigation ---
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger) return;

  // Event handler: click on hamburger button opens/closes nav
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// --- Counter animation for hero stats ---
function animateCounter(el, target) {
  let count = 0;
  // Loop: setInterval counts up from 0 to target number
  const timer = setInterval(function () {
    count += Math.ceil(target / 50);
    // if statement: stop when count reaches target
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    // DOM manipulation: update the text content of the element
    el.textContent = count;
  }, 30);
}

// --- Start counters when elements are visible on screen ---
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  // IntersectionObserver watches when elements enter the viewport
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // if statement: only animate when element is visible
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });

  nums.forEach(function (el) { observer.observe(el); });
}

// --- Change nav background on scroll ---
function initNavScroll() {
  // Event handler: scroll event changes nav opacity
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    // if statement: darken nav when scrolled down
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

  // Event handler: form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Variables: get form field values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Clear all previous error messages
    document.querySelectorAll('.error').forEach(function (el) {
      el.textContent = '';
    });

    // Input validation: check name field
    if (name.value.trim() === '') {
      // DOM manipulation: show error message
      document.getElementById('name-error').textContent = 'Please enter your name.';
      valid = false;
    }

    // Input validation: check email field
    if (!email.value.includes('@')) {
      document.getElementById('email-error').textContent = 'Please enter a valid email.';
      valid = false;
    }

    // Input validation: check message length
    if (message.value.trim().length < 10) {
      document.getElementById('msg-error').textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    // if statement: show success message if all fields are valid
    if (valid) {
      const success = document.getElementById('form-success');
      // DOM manipulation: show success message
      success.style.display = 'block';
      form.reset();
      // Loop: setTimeout hides success message after 3 seconds
      setTimeout(function () {
        success.style.display = 'none';
      }, 3000);
    }
  });
}

// --- Run all functions when page loads ---
document.addEventListener('DOMContentLoaded', function () {
  initHamburger();
  initCounters();
  initNavScroll();
  initForm();
});
