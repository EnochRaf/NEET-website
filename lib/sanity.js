// ── Sanity CMS Client ───────────────────────
(function () {
  const PROJECT_ID = '98iuxa94';
  const DATASET = 'production';
  const API = 'https://' + PROJECT_ID + '.api.sanity.io/v2024-01-01/data/query/' + DATASET;

  function sanityImageUrl(ref) {
    if (!ref || !ref.asset || !ref.asset._ref) return '';
    var parts = ref.asset._ref.replace('image-', '').split('-');
    var ext = parts.pop();
    var id = parts.join('-');
    return 'https://cdn.sanity.io/images/' + PROJECT_ID + '/' + DATASET + '/' + id + '.' + ext;
  }

  function query(groq) {
    return fetch(API + '?query=' + encodeURIComponent(groq))
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.result; })
      .catch(function () { return null; });
  }

  // SVG icons for social platforms
  var socialIcons = {
    instagram: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" fill="none"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 108 0 4 4 0 00-8 0z" fill="none"/><path d="M16 8v8a5 5 0 005-5V3h-3a5 5 0 00-5 5" fill="none"/><path d="M8 16v-8a5 5 0 00-5 5v8h3a5 5 0 005-5" fill="none"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="none"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.99.04-2.85.19-.78 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.47 0 .9-.57 2.24-.87 3.48-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.29-1.96 3.29-4.79 0-2.51-1.8-4.26-4.38-4.26-2.98 0-4.74 2.24-4.74 4.55 0 .9.35 1.87.78 2.4.09.1.1.19.07.3-.08.32-.25 1.05-.29 1.19-.05.2-.16.24-.37.14-1.39-.65-2.26-2.69-2.26-4.33 0-3.52 2.56-6.76 7.39-6.76 3.88 0 6.89 2.76 6.89 6.46 0 3.86-2.43 6.96-5.81 6.96-1.13 0-2.2-.59-2.57-1.29l-.7 2.66c-.25.98-.94 2.21-1.4 2.96A10 10 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="none"/></svg>',
  };

  // Determine path prefix for links (are we in a subdirectory?)
  var isSubDir = window.location.pathname.indexOf('/articles/') !== -1;
  var prefix = isSubDir ? '../' : '';

  // ── Navigation ──
  query('*[_type == "navigation"][0]').then(function (nav) {
    if (!nav) return;
    document.querySelectorAll('.navbar').forEach(function (navbar) {
      // Logo
      if (nav.logo) {
        var logoImg = navbar.querySelector('.navbar__logo img');
        if (logoImg) {
          logoImg.src = sanityImageUrl(nav.logo);
          if (nav.logoAlt) logoImg.alt = nav.logoAlt;
        }
      }
      // Menu links
      if (nav.menuLinks && nav.menuLinks.length > 0) {
        var ul = navbar.querySelector('.navbar__links');
        if (ul) {
          ul.innerHTML = nav.menuLinks.map(function (link) {
            var url = link.url || '#';
            // Adjust relative links for subdirectories
            if (isSubDir && !url.startsWith('http') && !url.startsWith('#')) {
              url = prefix + url;
            }
            return '<li><a href="' + url + '">' + (link.label || '') + '</a></li>';
          }).join('');
        }
      }
      // CTA
      if (nav.ctaText) {
        var cta = navbar.querySelector('.navbar__cta');
        if (cta) {
          cta.textContent = nav.ctaText;
          if (nav.ctaLink) {
            var ctaUrl = nav.ctaLink;
            if (isSubDir && !ctaUrl.startsWith('http') && !ctaUrl.startsWith('#')) {
              ctaUrl = prefix + ctaUrl;
            }
            cta.href = ctaUrl;
          }
        }
      }
    });
  });

  // ── Footer ──
  query('*[_type == "footer"][0]').then(function (ft) {
    if (!ft) return;
    document.querySelectorAll('.footer').forEach(function (footer) {
      // Brand name
      if (ft.brandName) {
        var bn = footer.querySelector('.footer__brand-name');
        if (bn) bn.textContent = ft.brandName;
      }
      // Brand description
      if (ft.brandDescription) {
        var bd = footer.querySelector('.footer__brand-desc');
        if (bd) bd.textContent = ft.brandDescription;
      }
      // Explore links
      if (ft.exploreLinks && ft.exploreLinks.length > 0) {
        var cols = footer.querySelectorAll('.footer__col');
        var exploreCol = cols[0];
        if (exploreCol) {
          var ul = exploreCol.querySelector('ul');
          if (ul) {
            ul.innerHTML = ft.exploreLinks.map(function (link) {
              var url = link.url || '#';
              if (isSubDir && !url.startsWith('http') && !url.startsWith('#')) {
                url = prefix + url;
              }
              return '<li><a href="' + url + '">' + (link.label || '') + '</a></li>';
            }).join('');
          }
        }
      }
      // Contact info
      var contactCol = footer.querySelectorAll('.footer__col')[1];
      if (contactCol) {
        var ul = contactCol.querySelector('ul');
        if (ul && (ft.phone || ft.email || ft.location)) {
          var html = '';
          if (ft.phone) html += '<li><a href="tel:+1' + ft.phone.replace(/\D/g, '') + '">' + ft.phone + '</a></li>';
          if (ft.email) html += '<li><a href="mailto:' + ft.email + '">' + ft.email + '</a></li>';
          if (ft.location) html += '<li>' + ft.location + '</li>';
          ul.innerHTML = html;
        }
      }
      // Social links
      if (ft.socialLinks && ft.socialLinks.length > 0) {
        var connectCol = footer.querySelectorAll('.footer__col')[2];
        if (connectCol) {
          var ul = connectCol.querySelector('ul');
          if (ul) {
            ul.innerHTML = ft.socialLinks.map(function (s) {
              var icon = socialIcons[s.platform] || '';
              var name = s.platform.charAt(0).toUpperCase() + s.platform.slice(1);
              return '<li><a href="' + (s.url || '#') + '" target="_blank" rel="noopener noreferrer" class="footer__social-link">' + icon + '<span>' + name + '</span></a></li>';
            }).join('');
          }
        }
      }
      // Copyright
      if (ft.copyright) {
        var cp = footer.querySelector('.footer__copyright');
        if (cp) cp.innerHTML = '&copy; ' + ft.copyright;
      }
    });
  });

  // Expose for page-specific use
  window.sanityCMS = {
    query: query,
    imageUrl: sanityImageUrl,
  };
})();
