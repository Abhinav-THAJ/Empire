/* ============================================
   EMPIRE AE — MAIN JAVASCRIPT
   Scroll animations, navbar, FAQ, portfolio filter
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Enable animations (safe: elements default to visible without this) ───
  // Small delay so elements are painted first, then we hide + animate them in
  requestAnimationFrame(() => {
    document.body.classList.add('js-ready');
    // Immediately reveal elements already in the viewport
    const animatedEls2 = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .scale-up, .blur-in');
    animatedEls2.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });

  // ─── Navbar scroll effect ───
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Hamburger mobile menu ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ─── Scroll-triggered Reveal Animations ───
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .scale-up, .blur-in');
  animatedEls.forEach(el => observer.observe(el));

  // ─── FAQ Accordion ───
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = btn.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-question.open').forEach(openBtn => {
      openBtn.classList.remove('open');
      openBtn.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  };

  // ─── Portfolio Filter ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ─── Contact Form Submit Handler ───
  window.handleSubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    const form = document.getElementById('contactForm');

    // Loading state
    btn.innerHTML = `<svg class="spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Sending...`;
    btn.disabled = true;

    setTimeout(() => {
      // Simulate success
      form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
      btn.innerHTML = `Send Message <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;
      btn.disabled = false;
      if (success) {
        success.style.display = 'flex';
        setTimeout(() => { success.style.display = 'none'; }, 6000);
      }
    }, 1800);
  };

  // ─── Smooth active nav link detection ───
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Counter animation for stats (number count-up) ───
  const statNumbers = document.querySelectorAll('.stat-number, .hero-stat-number, .result-num, .achievement-stat, .strip-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        if (isNaN(num) || num === 0) return;
        let start = 0;
        const duration = 1800;
        const step = duration / 60;
        const increment = num / (duration / (1000 / 60));
        const suffix = text.replace(/[0-9]/g, '').trim();
        const timer = setInterval(() => {
          start += increment;
          if (start >= num) {
            el.textContent = num + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start) + suffix;
          }
        }, step);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => countObserver.observe(el));

  // ─── Parallax effect on hero blob ───
  document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.hero-blob, .about-hero-blob, .portfolio-blob, .services-hero-blob, .contact-blob');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((blob, i) => {
      const factor = i % 2 === 0 ? 1 : -1;
      blob.style.transform = `translate(${x * factor * 0.5}px, ${y * factor * 0.5}px)`;
    });
  });

  // ─── Scroll to Top Button ───
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ─── Smooth scroll for internal anchors ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
