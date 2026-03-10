/* ========================================
   ADNAN KHOKHAWALA — PORTFOLIO SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV: scroll shadow ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.style.display = 'block';
    requestAnimationFrame(() => {
      mobileMenu.classList.toggle('open', !isOpen);
    });
    // Animate hamburger bars
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-img');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Stagger children inside timeline items & grids
        const children = entry.target.querySelectorAll('.tl-card, .pd-card, .skill-category, .edu-card');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.08}s`;
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- LANGUAGE BAR ANIMATION ---- */
  const langFills = document.querySelectorAll('.lang-fill');
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        // Delay slightly so user sees the animation
        setTimeout(() => { target.style.width = width; }, 300);
        langObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  langFills.forEach(fill => langObserver.observe(fill));

  /* ---- HERO IMAGE LOAD ---- */
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    // Image is referenced directly; trigger fade-in on load
    heroPhoto.style.opacity = '0';
    heroPhoto.style.transition = 'opacity 0.8s ease';
    if (heroPhoto.complete) {
      heroPhoto.style.opacity = '1';
    } else {
      heroPhoto.addEventListener('load', () => {
        heroPhoto.style.opacity = '1';
      });
      heroPhoto.addEventListener('error', () => {
        // Fallback: show placeholder if image fails
        heroPhoto.style.opacity = '0.3';
        const frame = heroPhoto.closest('.image-frame');
        if (frame) {
          frame.style.background = '#E8EDF5';
          const placeholder = document.createElement('div');
          placeholder.style.cssText = `
            position: absolute; inset: 0;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Cormorant Garamond', serif;
            font-size: 4rem; color: #0D1B3E; opacity: 0.2;
          `;
          placeholder.textContent = 'AK';
          frame.appendChild(placeholder);
        }
      });
    }
  }

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- CONTACT FORM (demo) ---- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        success.classList.add('show');
        form.reset();
        btn.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
        btn.disabled = false;
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1000);
    });
  }

  /* ---- SMOOTH active nav styling ---- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active { color: var(--red) !important; }
    .nav-links a.active::after { width: 100% !important; }
    .nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav-hamburger.active span:nth-child(2) { opacity: 0; }
    .nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `;
  document.head.appendChild(style);

  /* ---- STAT COUNTER ANIMATION ---- */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const raw = el.textContent.trim();
    const numMatch = raw.match(/[\d.]+/);
    if (!numMatch) return;

    const end = parseFloat(numMatch[0]);
    const suffix = raw.replace(numMatch[0], '');
    const isDecimal = String(end).includes('.');
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      el.textContent = (isDecimal ? current.toFixed(0) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ---- HERO parallax subtle ---- */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });

});
