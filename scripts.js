async function fetchJSON(file, listId, emptyMessage) {
  const list = document.getElementById(listId);
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Data not available');
    const data = await response.json();
    if (Array.isArray(data) && list) {
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${item.title}</h3><p><a href="${item.link}" target="_blank"><i class="fas fa-external-link-alt"></i> Read more</a></p>`;
        list.appendChild(div);
      });
    }
  } catch (err) {
    if (list) {
      list.innerHTML = '<div class="error-message"><p><i class="fas fa-exclamation-circle"></i> ' + emptyMessage + '</p></div>';
    }
    console.error('Failed to fetch', file, ':', err);
  }
}

function fetchLocalNews(){fetchJSON('news_local.json','local-news-list','No Malaysia news available');}
function fetchGlobalNews(){fetchJSON('news_global.json','global-news-list','No global news available');}
function fetchAINews(){fetchJSON('ai_news.json','ai-news-list','No AI news available');}
function fetchProducts(){fetchJSON('products.json','products-list','No product news available');}
function fetchCerts(){fetchJSON('certs.json','certs-list','No certification info available');}
