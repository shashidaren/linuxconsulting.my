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

    function activate(name, pushState) {
        if (TABS.indexOf(name) === -1) {
            name = DEFAULT_TAB;
        }

        buttons.forEach(function (btn) {
            var active = btn.getAttribute('data-tab') === name;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

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

        window.scrollTo({ top: 0, behavior: 'smooth' });
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
