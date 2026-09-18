/* =========================================================
   Número Imaginário — interações
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Menu móvel ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Fecha ao clicar em um link (útil em mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 820) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Fecha ao redimensionar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Filtro de artigos ---------- */
  var filterButtons = document.querySelectorAll('.tag-button');
  var articleItems = document.querySelectorAll('.article-item');
  var yearGroups = document.querySelectorAll('.year-group');

  function applyFilter(filter) {
    articleItems.forEach(function (item) {
      var tags = (item.dataset.tags || '').split(/\s+/);
      var show = filter === 'all' || tags.indexOf(filter) !== -1;
      item.classList.toggle('is-hidden', !show);
    });

    // Esconde um grupo de ano inteiro se nenhum artigo ficou visível
    yearGroups.forEach(function (group) {
      var visible = group.querySelectorAll('.article-item:not(.is-hidden)').length;
      group.classList.toggle('is-hidden', visible === 0);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      applyFilter(btn.dataset.filter || 'all');
    });
  });

  /* ---------- Rolagem suave para âncoras (com compensação do header fixo) ---------- */
  var header = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal-on-scroll discreto ---------- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.book-card, .article-item, .series-list li').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      observer.observe(el);
    });
  }
})();
