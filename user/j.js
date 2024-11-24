document.getElementById("Status1").onclick = function() {
    this.classList.toggle("clicked"); 
};
document.getElementById("Status2").onclick = function() {
    this.classList.toggle("clicked"); 
};

document.addEventListener('DOMContentLoaded', function () {
    const featuresMenu = document.getElementById('featuresMenu');
    const submenu = featuresMenu.querySelector('.submenu-content');

    // Show the submenu when hovering or focusing
    featuresMenu.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
    });

    // Hide the submenu when leaving the menu
    featuresMenu.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
    });

    // Ensure submenu stays visible when hovering over it
    submenu.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
    });

    submenu.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
    });
});

fetch('http://localhost:3000/api/jobs')
    .then(response => response.json())
    .then(data => {
        const jobContainer = document.getElementById('job-list');
        jobContainer.innerHTML = ''; // Clear existing jobs

        data.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.description}</p>
                <button onclick="applyJob(${job.id})">Apply</button>
            `;
            jobContainer.appendChild(jobElement);
        });
    })
    .catch(err => console.error('Error fetching jobs:', err));
