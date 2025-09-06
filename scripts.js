/*
 * Shared functions for loading JSON news and rendering lists for Tech News MY.
 * Each function fetches data from its corresponding JSON file and populates a
 * designated container in the DOM. A home page helper fetches the top
 * three stories from each category to display a dashboard overview.
 */

// Helper to fetch and parse JSON from a given path
async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    return await response.json();
}

// Helper to render a list of news items into a container element
function populateList(listId, items) {
    const container = document.getElementById(listId);
    if (!container) return;
    container.innerHTML = '';
    // Display a placeholder if no items are provided
    if (!Array.isArray(items) || items.length === 0) {
        const msg = document.createElement('p');
        msg.classList.add('error-message');
        msg.textContent = 'No items available at the moment. Please check back soon.';
        container.appendChild(msg);
        return;
    }
    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('news-item');
        div.innerHTML = `<h3>${item.title}</h3>` +
                        `<p><a href="${item.link}" target="_blank">Read more &raquo;</a></p>`;
        container.appendChild(div);
    });
}

// Fetch functions for individual pages
async function fetchLocalNews() {
    try {
        const data = await fetchJson('news_local.json');
        populateList('local-news-list', data);
    } catch (err) {
        const target = document.getElementById('local-news-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load local news.</p>';
        console.error(err);
    }
}

async function fetchGlobalNews() {
    try {
        const data = await fetchJson('news_global.json');
        populateList('global-news-list', data);
    } catch (err) {
        const target = document.getElementById('global-news-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load global news.</p>';
        console.error(err);
    }
}

async function fetchAINews() {
    try {
        const data = await fetchJson('ai_news.json');
        populateList('ai-news-list', data);
    } catch (err) {
        const target = document.getElementById('ai-news-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load AI news.</p>';
        console.error(err);
    }
}

async function fetchProducts() {
    try {
        const data = await fetchJson('products.json');
        populateList('products-list', data);
    } catch (err) {
        const target = document.getElementById('products-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load product releases.</p>';
        console.error(err);
    }
}

async function fetchCerts() {
    try {
        const data = await fetchJson('certs.json');
        populateList('certs-list', data);
    } catch (err) {
        const target = document.getElementById('certs-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load certifications.</p>';
        console.error(err);
    }
}

// Fetch limited items for the home page dashboard
async function fetchHomeNews() {
    // Each fetch is independent so failure in one doesn't block others
    try {
        const data = await fetchJson('news_local.json');
        populateList('home-local-list', data.slice(0, 3));
    } catch (err) {
        const target = document.getElementById('home-local-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load Malaysia news.</p>';
        console.error(err);
    }
    try {
        const data = await fetchJson('news_global.json');
        populateList('home-global-list', data.slice(0, 3));
    } catch (err) {
        const target = document.getElementById('home-global-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load global news.</p>';
        console.error(err);
    }
    try {
        const data = await fetchJson('ai_news.json');
        populateList('home-ai-list', data.slice(0, 3));
    } catch (err) {
        const target = document.getElementById('home-ai-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load AI news.</p>';
        console.error(err);
    }
    try {
        const data = await fetchJson('products.json');
        populateList('home-products-list', data.slice(0, 3));
    } catch (err) {
        const target = document.getElementById('home-products-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load product releases.</p>';
        console.error(err);
    }
    try {
        const data = await fetchJson('certs.json');
        populateList('home-certs-list', data.slice(0, 3));
    } catch (err) {
        const target = document.getElementById('home-certs-list');
        if (target) target.innerHTML = '<p class="error-message">Unable to load certifications.</p>';
        console.error(err);
    }
}
/**
 * Initialize a simple hero slider for the home page.
 * Cycles through slides inside .hero-slider every 4 seconds.
 */
function initializeHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.slide');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 4000);
}

// Automatically initialize the hero slider when DOM is loaded
if (document.readyState !== 'loading') {
    initializeHeroSlider();
} else {
    document.addEventListener('DOMContentLoaded', initializeHeroSlider);
}
