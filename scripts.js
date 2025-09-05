/*
 * Helper functions for dynamically populating course and hardware data.
 * Each function attempts to fetch JSON data from the repository; if the
 * file is missing or cannot be parsed it will fall back to a friendly
 * message rather than throwing an uncaught error in the browser.
 */

async function fetchCourses() {
  const list = document.getElementById('courses-list');
  try {
    const response = await fetch('courses.json');
    if (!response.ok) {
      throw new Error('Courses data not available');
    }
    const data = await response.json();
    if (Array.isArray(data) && list) {
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p><a href="${item.link}">${item.title}</a> (Free Course – Affiliate)</p>`;
        list.appendChild(div);
      });
    }
  } catch (err) {
    // Show a fallback message if the JSON couldn't be loaded
    if (list) {
      list.innerHTML = '<p>No course data available at the moment.</p>';
    }
    console.error('Failed to fetch courses:', err);
  }
}

async function fetchHardware() {
  const list = document.getElementById('hardware-list');
  try {
    const response = await fetch('hardware.json');
    if (!response.ok) {
      throw new Error('Hardware data not available');
    }
    const data = await response.json();
    if (Array.isArray(data) && list) {
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p><a href="${item.link}">${item.title}</a> – Linux Certified (Affiliate)</p>`;
        list.appendChild(div);
      });
    }
  } catch (err) {
    if (list) {
      list.innerHTML = '<p>No hardware data available at the moment.</p>';
    }
    console.error('Failed to fetch hardware:', err);
  }
}

async function fetchLLMGpus() {
  const list = document.getElementById('llm-gpus');
  try {
    const response = await fetch('llm-gpus.json');
    if (!response.ok) {
      throw new Error('GPU data not available');
    }
    const data = await response.json();
    if (Array.isArray(data) && list) {
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<p><a href="${item.link}">${item.title}</a> – For LLMs on Linux (Affiliate)</p>`;
        list.appendChild(div);
      });
    }
  } catch (err) {
    if (list) {
      list.innerHTML = '<p>No GPU recommendations available at the moment.</p>';
    }
    console.error('Failed to fetch LLM GPUs:', err);
  }
}