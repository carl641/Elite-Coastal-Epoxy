// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      // Reset any opened dropdown accordions when the menu is reopened
      if (!navLinks.classList.contains('active')) {
        navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
      }
    });

    // Mobile accordion: tapping a dropdown's parent toggles it instead of navigating
    navLinks.querySelectorAll('.nav-dropdown > a').forEach(function (parentLink) {
      parentLink.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault();
          var dropdown = parentLink.parentElement;
          var wasOpen = dropdown.classList.contains('open');
          // Close siblings so only one section is open at a time
          navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
            d.classList.remove('open');
          });
          if (!wasOpen) {
            dropdown.classList.add('open');
          }
        }
      });
    });

    // Close menu when clicking a real link (not a dropdown toggle)
    navLinks.querySelectorAll('a').forEach(function (link) {
      if (link.parentElement && link.parentElement.classList.contains('nav-dropdown') && link.parentElement.firstElementChild === link) {
        return;
      }
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
      });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('active');
      });

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Scroll animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .testimonial-card, .feature-item').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Contact form submission
  var form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate form submission
      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2ecc71';
        form.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }
});
