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
        status.textContent = '\u2717 Something went wrong. Please try again or email hello@gracefitsum.com directly.';
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

