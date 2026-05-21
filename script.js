// Full-page background theme switcher
(function () {
  var themeButton = document.querySelector('.theme-switcher-toggle');
  var storageKey = 'hog-theme';

  if (!themeButton) return;

  function applyTheme(theme) {
    var nextTheme = theme === 'brochure' ? 'brochure' : 'classic';
    var isBrochure = nextTheme === 'brochure';

    document.body.dataset.theme = nextTheme;
    themeButton.classList.toggle('is-active', isBrochure);
    themeButton.setAttribute('aria-pressed', String(isBrochure));
    themeButton.setAttribute('aria-label', isBrochure ? 'Switch to classic background' : 'Switch to brochure background');
    themeButton.setAttribute('title', isBrochure ? 'Switch to classic background' : 'Switch to brochure background');

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch (error) {
      // Ignore storage issues and keep the in-memory theme.
    }
  }

  var storedTheme = 'classic';

  try {
    storedTheme = window.localStorage.getItem(storageKey) || 'classic';
  } catch (error) {
    storedTheme = 'classic';
  }

  applyTheme(storedTheme);

  themeButton.addEventListener('click', function () {
    var nextTheme = document.body.dataset.theme === 'brochure' ? 'classic' : 'brochure';
    applyTheme(nextTheme);
  });
})();

// Scroll-spy: highlight the active nav link as sections scroll into view
(function () {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function activate() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();

// Contact form submission (Formspree)
// Sign up free at formspree.io, create a form, then replace YOUR_FORM_ID below
(function () {
  var FORMSPREE_ID = 'YOUR_FORM_ID';
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';
    status.hidden = true;
    status.className = 'form-status';

    fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        if (res.ok) {
          status.textContent = '\u2713 Message sent! Grace will be in touch soon.';
          status.classList.add('form-status--success');
          form.reset();
        } else {
          return res.json().then(function (data) {
            throw new Error(data && data.error ? data.error : 'error');
          });
        }
      })
      .catch(function () {
        status.textContent = '\u2717 Something went wrong. Please try again or email Info.gracefullprod@gmail.com directly.';
        status.classList.add('form-status--error');
      })
      .finally(function () {
        status.hidden = false;
        btn.disabled = false;
        btn.textContent = 'Send Message';
      });
  });
})();

// Scroll-triggered reveal animations
(function () {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();

// About motto floating particles and icons
(function () {
  var shell = document.querySelector('.about-tagline-shell');
  var particlesLayer = document.querySelector('.about-tagline-particles');
  var iconsLayer = document.querySelector('.about-tagline-icons');

  if (!shell || !particlesLayer || !iconsLayer) return;

  var colors = ['#efd37f', '#f7edd2', '#8ea381', '#6f8772', '#1f2954'];
  var icons = ['✦', '✧', '★', '☆', '❀'];

  for (var particleIndex = 0; particleIndex < 18; particleIndex += 1) {
    var particle = document.createElement('span');
    var size = Math.random() * 7 + 3;
    particle.className = 'about-tagline-particle';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 6 + 9) + 's';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particlesLayer.appendChild(particle);
  }

  for (var iconIndex = 0; iconIndex < 8; iconIndex += 1) {
    var icon = document.createElement('span');
    icon.className = 'about-tagline-icon';
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + '%';
    icon.style.top = Math.random() * 100 + '%';
    icon.style.color = colors[Math.floor(Math.random() * colors.length)];
    icon.style.animationDuration = (Math.random() * 7 + 10) + 's';
    icon.style.animationDelay = Math.random() * 5 + 's';
    iconsLayer.appendChild(icon);
  }
})();

