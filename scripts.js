async function fetchCourses() {
  const response = await fetch('courses.json');  // Load from repo file
  const data = await response.json();
  const list = document.getElementById('courses-list');
  if (list) {
    data.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}">${item.title}</a> (Free Course - Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}

async function fetchHardware() {
  const response = await fetch('hardware.json');
  const data = await response.json();
  const list = document.getElementById('hardware-list');
  if (list) {
    data.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}">${item.title}</a> - Linux Certified (Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}

async function fetchLLMGpus() {
  const response = await fetch('llm-gpus.json');
  const data = await response.json();
  const list = document.getElementById('llm-gpus');
  if (list) {
    data.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p><a href="${item.link}">${item.title}</a> - For LLMs on Linux (Affiliate)</p>`;
      list.appendChild(div);
    });
  }
}
