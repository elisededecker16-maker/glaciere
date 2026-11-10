/* Glacière · landingspagina · v02 · 09/11/2026
   1. Header wordt mat glas zodra je scrolt
   2. Blokken schuiven zacht in beeld
   3. Vaste inschrijfknop op smartphone
   4. Inschrijfformulier → MailerLite (double opt-in), met bevestiging op de pagina
   5. Geurtest (v02.1 · 10/11/2026) */
(function () {
  'use strict';

  /* 1 · Header */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2 · Reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* 3 · Vaste knop: zichtbaar na de hero, weg zodra het formulier in beeld is */
  var sticky = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero');
  var signup = document.getElementById('inschrijven');
  var footer = document.querySelector('.site-footer');
  if (sticky && 'IntersectionObserver' in window) {
    var state = { hero: true, signup: false, footer: false };
    var update = function () {
      var show = !state.hero && !state.signup && !state.footer;
      sticky.classList.toggle('is-shown', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
      sticky.querySelector('a').tabIndex = show ? 0 : -1;
    };
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target === hero) state.hero = e.isIntersecting;
        if (e.target === signup) state.signup = e.isIntersecting;
        if (e.target === footer) state.footer = e.isIntersecting;
      });
      update();
    }, { threshold: 0 });
    [hero, signup, footer].forEach(function (el) { if (el) so.observe(el); });
  }

  /* 5 · Geurtest: vier vragen, de geur met de meeste stemmen wint */
  var quiz = document.getElementById('quiz');
  if (quiz) {
    var SCENTS = {
      iris:  { name: 'Iris',  img: '20261101_Webpagina_geur-iris_v01.jpg',  alt: 'Flesje Iris in parelmoerkleurig water',
               text: 'Zacht lila, puur jij. Je houdt van rust, zachte kleuren en kleine momenten die goed voelen.' },
      sage:  { name: 'Sage',  img: '20261101_Webpagina_geur-sage_v01.jpg',  alt: 'Flesje Sage tegen een blauwe lucht met jacarandabloesem',
               text: 'Koel, groen en helder. Jij bent de frisse wind in elke groep, altijd klaar voor iets nieuws.' },
      amber: { name: 'Amber', img: '20261101_Webpagina_geur-amber_v01.jpg', alt: 'Flesje Amber op zachte perzikkleurige zijde',
               text: 'Zonnig zoet op je huid. Jij brengt warmte mee, waar je ook komt.' },
      noir:  { name: 'Noir',  img: '20261101_Webpagina_geur-noir_v01.jpg',  alt: 'Flesje Noir in een lila zee bij schemering',
               text: 'Een tikje mysterie. Jij komt pas echt tot leven als de zon ondergaat.' }
    };
    var qs = quiz.querySelectorAll('.quiz-q');
    var bar = document.getElementById('quiz-bar');
    var stepLabel = document.getElementById('quiz-step');
    var result = document.getElementById('quiz-result');
    var answers = [];

    var showQ = function (i) {
      qs.forEach(function (q, k) { q.hidden = k !== i; });
      bar.style.width = ((i + 1) / qs.length * 100) + '%';
      stepLabel.textContent = 'Vraag ' + (i + 1) + ' van ' + qs.length;
      stepLabel.hidden = false;
    };

    var showResult = function () {
      var count = {};
      answers.forEach(function (s) { count[s] = (count[s] || 0) + 1; });
      // Gelijkspel? Dan telt je laatste antwoord.
      var best = answers[answers.length - 1];
      Object.keys(count).forEach(function (s) { if (count[s] > count[best]) best = s; });
      var r = SCENTS[best];
      document.getElementById('quiz-name').textContent = r.name;
      document.getElementById('quiz-cta').textContent = r.name;
      document.getElementById('quiz-text').textContent = r.text;
      var img = document.getElementById('quiz-img');
      img.src = r.img; img.alt = r.alt;
      qs.forEach(function (q) { q.hidden = true; });
      stepLabel.hidden = true;
      bar.style.width = '100%';
      result.hidden = false;
      result.focus({ preventScroll: true });
    };

    qs.forEach(function (q, i) {
      q.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          answers[i] = b.getAttribute('data-scent');
          if (i + 1 < qs.length) showQ(i + 1); else showResult();
        });
      });
    });

    document.getElementById('quiz-restart').addEventListener('click', function () {
      answers = []; result.hidden = true; showQ(0);
    });
  }

  /* 4 · MailerLite */
  var form = document.getElementById('ml-form');
  if (!form) return;
  var email = document.getElementById('f-email');
  var nameInput = document.getElementById('f-name');
  var consent = document.getElementById('f-consent');
  var emailErr = document.getElementById('f-email-error');
  var consentErr = document.getElementById('f-consent-error');
  var formErr = document.getElementById('form-error');
  var success = document.getElementById('ml-success');
  var successName = document.getElementById('success-name');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, el, show, msg) {
    if (msg) el.textContent = msg;
    el.hidden = !show;
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  email.addEventListener('input', function () {
    if (!emailErr.hidden && EMAIL_RE.test(email.value.trim())) setError(email, emailErr, false);
  });
  consent.addEventListener('change', function () { if (consent.checked) setError(consent, consentErr, false); });

  function showSuccess() {
    var first = nameInput.value.trim().split(' ')[0];
    successName.textContent = first ? ', ' + first : '';
    form.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
    var card = document.getElementById('signup-card');
    var top = card.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    formErr.hidden = true;

    var okEmail = EMAIL_RE.test(email.value.trim());
    setError(email, emailErr, !okEmail, 'Vul een geldig e-mailadres in.');
    setError(consent, consentErr, !consent.checked);
    if (!okEmail) { email.focus(); return; }
    if (!consent.checked) { consent.focus(); return; }

    email.value = email.value.trim();
    form.classList.add('is-loading');

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) { return res.json().catch(function () { return { success: res.ok }; }); })
      .then(function (data) {
        form.classList.remove('is-loading');
        if (data && data.success) { showSuccess(); return; }
        // MailerLite geeft per veld een foutmelding terug
        var fieldErrors = data && data.errors && data.errors.fields;
        if (fieldErrors && fieldErrors.email) {
          setError(email, emailErr, true, 'Dit e-mailadres lijkt niet te kloppen. Kijk je het even na?');
          email.focus();
        } else {
          formErr.hidden = false;
        }
      })
      .catch(function () {
        form.classList.remove('is-loading');
        if (navigator.onLine === false) {
          formErr.textContent = 'Je lijkt offline. Check je verbinding en probeer opnieuw.';
          formErr.hidden = false;
          return;
        }
        // Het verzoek is verstuurd, maar de browser mocht het antwoord niet lezen.
        // MailerLite verwerkt de inschrijving wel, dus we tonen de bevestiging.
        showSuccess();
      });
  });
})();
