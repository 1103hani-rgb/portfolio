async function loadProjects() {
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    const grid = document.getElementById('projects-grid');
    if (projects.length === 0) {
      grid.innerHTML = '<p>No projects yet.</p>';
      return;
    }
    grid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="tech">🛠 ${project.tech}</p>
        <div>
          ${project.github_url ? `<a href="${project.github_url}" target="_blank">GitHub</a>` : ''}
          ${project.live_url ? `<a href="${project.live_url}" target="_blank">Live Demo</a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });
  } 
  catch (err) {
    document.getElementById('projects-grid').innerHTML = '<p>Failed to load projects.</p>';
    console.error(err);
  }
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = result.message;
    e.target.reset();
  } 
  catch (err) {
    document.getElementById('form-message').textContent = 'Something went wrong. Try again.';
    console.error(err);
  }
});
loadProjects();