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

  var storedTheme = 'brochure';

  try {
    storedTheme = window.localStorage.getItem(storageKey) || 'brochure';
  } catch (error) {
    storedTheme = 'brochure';
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

// Masonry gallery with filters and lightbox
(function () {
  var photos = [
    { cat: 'wedding', name: 'Photo 1', venue: 'House of Grace Events', src: '1.JPG', alt: 'Gallery photo 1', height: 320 },
    { cat: 'reception', name: 'Photo 2', venue: 'House of Grace Events', src: '2.JPG', alt: 'Gallery photo 2', height: 210 },
    { cat: 'decor', name: 'Photo 3', venue: 'House of Grace Events', src: '3.JPG', alt: 'Gallery photo 3', height: 260 },
    { cat: 'wedding', name: 'Photo 4', venue: 'House of Grace Events', src: '4.JPG', alt: 'Gallery photo 4', height: 380 },
    { cat: 'intimate', name: 'Photo 5', venue: 'House of Grace Events', src: '5.JPG', alt: 'Gallery photo 5', height: 230 },
    { cat: 'decor', name: 'Photo 6', venue: 'House of Grace Events', src: '6.JPG', alt: 'Gallery photo 6', height: 290 },
    { cat: 'reception', name: 'Photo 7', venue: 'House of Grace Events', src: '7.PNG', alt: 'Gallery photo 7', height: 200 },
    { cat: 'wedding', name: 'Photo 8', venue: 'House of Grace Events', src: '8.PNG', alt: 'Gallery photo 8', height: 340 },
    { cat: 'intimate', name: 'Photo 9', venue: 'House of Grace Events', src: '9.JPG', alt: 'Gallery photo 9', height: 270 }
  ];

  var grid = document.getElementById('gallery-grid');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lb-image');
  var lightboxCaption = document.getElementById('lb-caption');
  var prevButton = document.getElementById('lb-prev');
  var nextButton = document.getElementById('lb-next');
  var closeButton = document.getElementById('lb-close');
  var filterButtons = document.querySelectorAll('.filter-btn');
  var visibleItems = [];
  var currentIdx = -1;
  var touchStartX = 0;
  var touchEndX = 0;

  if (!grid || !lightbox || !lightboxImage || !lightboxCaption || !prevButton || !nextButton || !closeButton) {
    return;
  }

  function buildGallery(filter) {
    grid.innerHTML = '';
    visibleItems = filter === 'all' ? photos.slice() : photos.filter(function (photo) {
      return photo.cat === filter;
    });

    visibleItems.forEach(function (photo, index) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'masonry-item';
      item.dataset.idx = String(index);
      item.innerHTML = [
        '<img src="' + photo.src + '" alt="' + photo.alt + '" loading="lazy" />',
        '<span class="item-overlay">',
        '<span class="overlay-tag">' + photo.cat.charAt(0).toUpperCase() + photo.cat.slice(1) + '</span>',
        '<span class="overlay-name">' + photo.name + '</span>',
        '<span class="overlay-venue">' + photo.venue + '</span>',
        '</span>'
      ].join('');

      item.addEventListener('click', function () {
        openLightbox(index, item);
      });

      grid.appendChild(item);
      setTimeout(function () {
        item.classList.add('visible');
      }, index * 70);
    });
  }

  function renderLightbox() {
    var photo = visibleItems[currentIdx];

    if (!photo) {
      return;
    }

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxCaption.innerHTML = [
      '<span class="overlay-tag">' + photo.cat.charAt(0).toUpperCase() + photo.cat.slice(1) + '</span>',
      '<span class="overlay-name">' + photo.name + '</span>',
      '<span class="overlay-venue">' + photo.venue + '</span>',
      '<span class="lightbox-counter">' + String(currentIdx + 1) + ' / ' + String(visibleItems.length) + '</span>'
    ].join('');
  }

  function openLightbox(index, trigger) {
    currentIdx = index;
    renderLightbox();
    lightbox.hidden = false;
    lightbox.dataset.lastTrigger = trigger ? trigger.dataset.idx : '';
    document.body.classList.add('gallery-lightbox-open');
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('gallery-lightbox-open');
  }

  function step(direction) {
    currentIdx = (currentIdx + direction + visibleItems.length) % visibleItems.length;
    renderLightbox();
  }

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  prevButton.addEventListener('click', function () {
    step(-1);
  });

  nextButton.addEventListener('click', function () {
    step(1);
  });

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      step(-1);
    }

    if (event.key === 'ArrowRight') {
      step(1);
    }
  });

  lightboxImage.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  lightboxImage.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;

    if (Math.abs(touchEndX - touchStartX) < 40) {
      return;
    }

    step(touchEndX < touchStartX ? 1 : -1);
  }, { passive: true });

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (item) {
        item.classList.remove('active');
      });
      button.classList.add('active');
      buildGallery(button.getAttribute('data-filter'));
    });
  });

  buildGallery('all');
})();

