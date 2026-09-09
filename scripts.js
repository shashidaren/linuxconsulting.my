/* LinuxConsulting.my — tab navigation for the main hub.
   Tabs are hash-routed (#consulting, #portfolio, #projects, #contact)
   so each view is shareable and browser back/forward works. */
(function () {
    'use strict';

    var TABS = ['consulting', 'portfolio', 'projects', 'contact'];
    var DEFAULT_TAB = 'consulting';

    var buttons = Array.prototype.slice.call(document.querySelectorAll('.tab[data-tab]'));
    var panels = {};
    TABS.forEach(function (name) {
        panels[name] = document.getElementById('panel-' + name);
    });

    function prefersReducedMotion() {
        return !!(window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }

    /* On narrow screens the tab bar is a single sideways-scrolling strip, so a
       tab activated from a hash link (#contact) or the back button can be
       sitting off-screen. Slide it into view within the strip only — never
       touch the page's own scroll position. */
    function revealTab(btn) {
        if (!btn) { return; }
        var strip = btn.parentNode;
        if (!strip || typeof strip.scrollTo !== 'function') { return; }
        if (strip.scrollWidth <= strip.clientWidth + 1) { return; }

        var stripRect = strip.getBoundingClientRect();
        var btnRect = btn.getBoundingClientRect();
        var delta = (btnRect.left - stripRect.left) -
                    (strip.clientWidth - btnRect.width) / 2;

        strip.scrollTo({
            left: strip.scrollLeft + delta,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    }

    function activate(name, pushState) {
        if (TABS.indexOf(name) === -1) {
            name = DEFAULT_TAB;
        }

        var activeButton = null;
        buttons.forEach(function (btn) {
            var active = btn.getAttribute('data-tab') === name;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
            if (active) { activeButton = btn; }
        });
        revealTab(activeButton);

        TABS.forEach(function (tab) {
            if (panels[tab]) {
                panels[tab].classList.toggle('active', tab === name);
            }
        });

        if (pushState !== false) {
            if (window.location.hash.slice(1) !== name) {
                history.pushState(null, '', name === DEFAULT_TAB ? ' ' : '#' + name);
            }
        }

        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activate(btn.getAttribute('data-tab'));
        });
    });

    /* In-page links like <a href="#contact" data-tab-link="contact"> */
    document.querySelectorAll('[data-tab-link]').forEach(function (link) {
        link.addEventListener('click', function (ev) {
            ev.preventDefault();
            activate(link.getAttribute('data-tab-link'));
        });
    });

    window.addEventListener('popstate', function () {
        activate(window.location.hash.slice(1) || DEFAULT_TAB, false);
    });

    /* Initial view from URL hash */
    activate(window.location.hash.slice(1) || DEFAULT_TAB, false);
})();
