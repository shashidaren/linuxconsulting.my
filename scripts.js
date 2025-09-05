async function fetchCourses() {
  // Example: Fetch from Coursera RSS (replace with real API)
  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.coursera.org/browse/computer-science/free?aff=your_aff_id');
  const data = await response.json();
  const list = document.getElementById('courses-list');
  if (list) {
    data.items.slice(0, 5).forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}">${item.title}</a> (Free Course - Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}

async function fetchHardware() {
  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://ubuntu.com/certified/rss');
  const data = await response.json();
  const list = document.getElementById('hardware-list');
  if (list) {
    data.items.slice(0, 5).forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}?tag=your_amazon_id">${item.title}</a> - Linux Certified (Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}

async function fetchLLMGpus() {
  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://nvidia.com/en-us/data-center/rss');
  const data = await response.json();
  const list = document.getElementById('llm-gpus');
  if (list) {
    data.items.slice(0, 5).forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}?tag=your_amazon_id">${item.title}</a> - For LLMs on Linux (Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}
