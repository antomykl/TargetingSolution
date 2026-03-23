/**
 * Shared navigation bar — auto-injected on any page that includes this script.
 * Base URL is derived from this script's own src, so links work on any host.
 */
(function () {
  // Capture before any async gap (document.currentScript is null after DOMContentLoaded)
  var _base = (document.currentScript || {}).src.replace(/\/nav\.js(\?.*)?$/, '');

  function norm(p) {
    return p.replace(/\/index\.html$/, '').replace(/\/$/, '');
  }

  function init() {
    // ── CSS ──────────────────────────────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = '\
:root { --snav-h: 58px; }\
body { padding-top: var(--snav-h) !important; }\
#snav {\
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;\
  height: var(--snav-h);\
  background: rgba(255,255,255,.88);\
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);\
  border-bottom: 1px solid #cfd9d5;\
  display: flex; align-items: center; padding: 0 24px; gap: 20px;\
  font-family: "Space Grotesk","Segoe UI",sans-serif;\
  box-sizing: border-box;\
}\
.snav-brand {\
  font-family: "IBM Plex Mono",monospace; font-weight: 600; font-size: 1rem;\
  color: #1b2a27; text-decoration: none; white-space: nowrap; flex-shrink: 0;\
}\
.snav-brand span { color: #0f8d67; }\
.snav-links {\
  display: flex; align-items: center; gap: 4px;\
  list-style: none; margin: 0; padding: 0; margin-left: auto;\
}\
.snav-links a {\
  display: block; padding: 6px 12px; border-radius: 8px;\
  font-size: .9rem; font-weight: 500; color: #5b6b67;\
  text-decoration: none; transition: background .15s, color .15s;\
}\
.snav-links a:hover, .snav-links a.snav-active {\
  background: rgba(15,141,103,.12); color: #0f8d67;\
}\
.snav-item { position: relative; }\
.snav-item > a::after { content: " \u25be"; font-size: .7rem; opacity: .6; }\
.snav-dd {\
  display: none; position: absolute; top: calc(100% + 6px); right: 0;\
  min-width: 220px; background: #fff; border: 1px solid #cfd9d5;\
  border-radius: 10px; box-shadow: 0 8px 24px rgba(20,36,31,.12);\
  padding: 6px; list-style: none; margin: 0; z-index: 200;\
}\
.snav-item:hover .snav-dd, .snav-item:focus-within .snav-dd { display: block; }\
.snav-dd a {\
  display: block; padding: 8px 12px; border-radius: 7px;\
  font-size: .85rem; font-weight: 500; color: #1b2a27; text-decoration: none;\
}\
.snav-dd a:hover { background: rgba(15,141,103,.12); color: #0f8d67; }\
.snav-dd-sub {\
  font-family: "IBM Plex Mono",monospace; font-size: .74rem;\
  color: #5b6b67; display: block; margin-top: 2px;\
}\
.snav-tog {\
  display: none; margin-left: auto; background: none;\
  border: 1px solid #cfd9d5; border-radius: 8px; padding: 6px 9px;\
  cursor: pointer; color: #1b2a27;\
  flex-direction: column; gap: 4px; align-items: center; justify-content: center;\
}\
.snav-tog span {\
  display: block; width: 20px; height: 2px; background: currentColor;\
  border-radius: 2px; transition: transform .22s, opacity .22s;\
}\
#snav-drawer {\
  display: none; position: fixed; top: var(--snav-h); left: 0; right: 0; bottom: 0;\
  z-index: 999; background: rgba(255,255,255,.97);\
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);\
  padding: 16px 20px; overflow-y: auto;\
  flex-direction: column; gap: 4px; border-top: 1px solid #cfd9d5;\
}\
#snav-drawer.snav-open { display: flex; }\
#snav-drawer a {\
  display: block; padding: 11px 14px; border-radius: 9px;\
  font-size: .95rem; font-weight: 500; color: #1b2a27;\
  text-decoration: none; transition: background .14s;\
}\
#snav-drawer a:hover { background: rgba(15,141,103,.12); color: #0f8d67; }\
.snav-dsec {\
  font-family: "IBM Plex Mono",monospace; font-size: .72rem; font-weight: 600;\
  color: #5b6b67; text-transform: uppercase; letter-spacing: .07em;\
  padding: 12px 14px 4px;\
}\
.snav-dsub { font-size: .82rem !important; color: #5b6b67 !important; padding-left: 26px !important; }\
@media (max-width: 600px) {\
  .snav-links, .snav-item { display: none; }\
  .snav-tog { display: flex; }\
}';
    document.head.appendChild(style);

    // ── Nav bar HTML ──────────────────────────────────────────────────────────
    var nav = document.createElement('nav');
    nav.id = 'snav';
    nav.setAttribute('role', 'navigation');
    nav.innerHTML =
      '<a class="snav-brand" href="' + _base + '/index.html">Targeting<span>Solution</span></a>' +
      '<ul class="snav-links">' +
        '<li><a href="' + _base + '/index.html">Home</a></li>' +
        '<li class="snav-item">' +
          '<a href="' + _base + '/CoordinateSystem/index.html">CoordinateSystem</a>' +
          '<ul class="snav-dd">' +
            '<li><a href="' + _base + '/CoordinateSystem/index.html">Overview' +
              '<span class="snav-dd-sub">Samples index</span></a></li>' +
            '<li><a href="' + _base + '/CoordinateSystem/frame-hierarchy-sample.html">Frame Hierarchy' +
              '<span class="snav-dd-sub">NED \u2192 Drone \u2192 Camera</span></a></li>' +
            '<li><a href="' + _base + '/CoordinateSystem/svg-sample.html">SVG Sample' +
              '<span class="snav-dd-sub">SVG coordinate demo</span></a></li>' +
            '<li><a href="' + _base + '/CoordinateSystem/canvas-sample.html">Canvas Sample' +
              '<span class="snav-dd-sub">Canvas coordinate demo</span></a></li>' +
          '</ul>' +
        '</li>' +
      '</ul>' +
      '<button class="snav-tog" id="snav-tog" aria-label="Toggle menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>';

    // ── Mobile drawer HTML ────────────────────────────────────────────────────
    var drawer = document.createElement('div');
    drawer.id = 'snav-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Navigation');
    drawer.innerHTML =
      '<div class="snav-dsec">Navigation</div>' +
      '<a href="' + _base + '/index.html">Home</a>' +
      '<div class="snav-dsec">CoordinateSystem</div>' +
      '<a href="' + _base + '/CoordinateSystem/index.html">Overview</a>' +
      '<a class="snav-dsub" href="' + _base + '/CoordinateSystem/frame-hierarchy-sample.html">Frame Hierarchy</a>' +
      '<a class="snav-dsub" href="' + _base + '/CoordinateSystem/svg-sample.html">SVG Sample</a>' +
      '<a class="snav-dsub" href="' + _base + '/CoordinateSystem/canvas-sample.html">Canvas Sample</a>';

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.insertBefore(drawer, nav.nextSibling);

    // ── Active link highlighting ──────────────────────────────────────────────
    var cur = norm(location.pathname);
    [nav, drawer].forEach(function (el) {
      el.querySelectorAll('a[href]').forEach(function (a) {
        if (norm(new URL(a.href).pathname) === cur) {
          a.classList.add('snav-active');
        }
      });
    });
    // Activate parent item when a dropdown child is active
    nav.querySelectorAll('.snav-item').forEach(function (item) {
      if (item.querySelector('.snav-active')) {
        var parent = item.querySelector(':scope > a');
        if (parent) parent.classList.add('snav-active');
      }
    });

    // ── Hamburger toggle ─────────────────────────────────────────────────────
    var tog = document.getElementById('snav-tog');
    var spans = tog.querySelectorAll('span');

    function closeDrawer() {
      drawer.classList.remove('snav-open');
      tog.setAttribute('aria-expanded', 'false');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }

    tog.addEventListener('click', function () {
      var open = drawer.classList.toggle('snav-open');
      tog.setAttribute('aria-expanded', String(open));
      if (open) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        closeDrawer();
      }
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
