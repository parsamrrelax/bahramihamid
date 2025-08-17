// Theme toggle with localStorage persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const toggleMobile = document.getElementById('themeToggleMobile');
  const stored = localStorage.getItem('theme');

  if (stored === 'light') {
    root.classList.add('light');
  }

  function setTheme(next) {
    if (next === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', next);
  }

  function toggleTheme() {
    const isLight = root.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  }

  toggle?.addEventListener('click', toggleTheme);
  toggleMobile?.addEventListener('click', toggleTheme);

  // Mobile menu toggle
  function closeMenu() {
    mobileMenu?.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close on link click
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860) {
      closeMenu();
    }
  });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Progressive reveal on scroll (IntersectionObserver)
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.style.willChange = 'transform, opacity';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  const nodes = document.querySelectorAll('.reveal-up');
  nodes.forEach((el) => observer.observe(el));
})();


