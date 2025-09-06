
document.addEventListener('DOMContentLoaded', () => {
    // Central configuration for the entire site
    const config = {
        categories: [
            {
                id: 'local',
                title: 'Malaysia News',
                description: 'Latest technology news and developments from Malaysia.',
                json: 'news_local.json',
                icon: 'fa-newspaper',
                image: 'https://images.unsplash.com/photo-1509233738633-deb32895b5b0?w=800'
            },
            {
                id: 'global',
                title: 'Global News',
                description: 'Global technology headlines and industry developments.',
                json: 'news_global.json',
                icon: 'fa-globe',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
            },
            {
                id: 'ai',
                title: 'AI News',
                description: 'The latest breakthroughs and trends in Artificial Intelligence.',
                json: 'ai_news.json',
                icon: 'fa-robot',
                image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800'
            },
            {
                id: 'products',
                title: 'Product Releases',
                description: 'News and reviews on the latest gadgets and hardware.',
                json: 'products.json',
                icon: 'fa-box-open',
                image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800'
            },
            {
                id: 'certs',
                title: 'Certifications',
                description: 'Updates on free IT certifications and professional courses.',
                json: 'certs.json',
                icon: 'fa-graduation-cap',
                image: 'https://images.unsplash.com/photo-1523289333742-be124282b7ee?w=800'
            }
        ]
    };

    const currentPage = window.location.pathname.split('/').pop();
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic');

    // --- Core Functions ---

    async function fetchJson(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch ${path}:`, error);
            return [];
        }
    }

    function renderNav(activeTopicId) {
        const navContainer = document.getElementById('main-nav');
        if (!navContainer) return;

        const homeLink = `<a href="index.html"><i class="fas fa-home"></i> Home</a>`;
        const categoryLinks = config.categories.map(cat => `
            <a href="category.html?topic=${cat.id}" class="${cat.id === activeTopicId ? 'active' : ''}">
                <i class="fas ${cat.icon}"></i> ${cat.title}
            </a>
        `).join('');

        navContainer.innerHTML = homeLink + categoryLinks;
    }

    function renderPlaceholder(container, message) {
        container.innerHTML = `<div class="placeholder"><p>${message}</p></div>`;
    }

    // --- Page Initializers ---

    function initHomePage() {
        renderNav(null);
        const grid = document.getElementById('home-cards-grid');
        if (!grid) return;

        config.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'card card-with-image';
            card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${cat.image}')`;

            card.innerHTML = `
                <div>
                    <h2><i class="fas ${cat.icon}"></i> ${cat.title}</h2>
                    <div id="home-list-${cat.id}"></div>
                </div>
                <p><a href="category.html?topic=${cat.id}" class="more-link">More ${cat.title} &raquo;</a></p>
            `;
            grid.appendChild(card);

            const listContainer = document.getElementById(`home-list-${cat.id}`);
            fetchJson(cat.json).then(items => {
                if (items.length > 0) {
                    const listHtml = items.slice(0, 3).map(item => `
                        <div class="news-item">
                            <h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
                        </div>
                    `).join('');
                    listContainer.innerHTML = listHtml;
                } else {
                    renderPlaceholder(listContainer, 'No recent news.');
                }
            });
        });

        initializeHeroSlider();
    }

    function initCategoryPage() {
        const category = config.categories.find(c => c.id === topicId);
        if (!category) {
            window.location.href = '404.html';
            return;
        }

        renderNav(topicId);

        // Update page content with category info
        document.title = `${category.title} | Tech News MY`;
        document.getElementById('page-title').textContent = `${category.title} | Tech News MY`;
        document.getElementById('category-title').textContent = category.title;
        document.getElementById('category-description').textContent = category.description;

        const listContainer = document.getElementById('news-list');
        renderPlaceholder(listContainer, 'Loading news...');

        fetchJson(category.json).then(items => {
            if (items.length > 0) {
                const listHtml = items.map(item => `
                    <div class="news-item">
                        <h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
                    </div>
                `).join('');
                listContainer.innerHTML = listHtml;
            } else {
                renderPlaceholder(listContainer, 'No items available at the moment. Please check back soon.');
            }
        });
    }

    function init404Page() {
        renderNav(null);
    }

    function initializeHeroSlider() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;
        const slides = slider.querySelectorAll('.slide');
        if (slides.length === 0) return;
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 4000);
    }

    // --- Router ---
    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'category.html') {
        initCategoryPage();
    } else if (currentPage === '404.html') {
        init404Page();
    }
});
