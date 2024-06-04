// script.js

// Image preview for photo upload
document.getElementById('photo-input').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('student-photo').setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('certificate').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            document.getElementById('certificate-preview').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('achievement-image').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            document.getElementById('achievement-image-preview').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Artworks Section
function addArtwork() {
    const artworkImageInput = document.getElementById('artwork-image');
    const artworkDescription = document.getElementById('artwork-description').value;
    
    if (artworkImageInput.files && artworkImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const artworkItem = document.createElement('div');
            artworkItem.classList.add('artwork-item');
            artworkItem.innerHTML = `
                <img src="${event.target.result}" alt="Artwork">
                <p>${artworkDescription}</p>
            `;
            document.getElementById('artwork-gallery').appendChild(artworkItem);
        };
        reader.readAsDataURL(artworkImageInput.files[0]);
    }
}

// Projects Section
function addProject() {
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectImageInput = document.getElementById('project-image');
    
    if (projectImageInput.files && projectImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = `
                <h3>${projectTitle}</h3>
                <img src="${event.target.result}" alt="Project Image">
                <p>${projectDescription}</p>
            `;
            document.getElementById('project-gallery').appendChild(projectItem);
        };
        reader.readAsDataURL(projectImageInput.files[0]);
    }
}

// AwesoME Section
function addAbility() {
    const uniqueAbility = document.getElementById('unique-ability').value;
    const awesomeItem = document.createElement('div');
    awesomeItem.classList.add('awesome-item');
    awesomeItem.textContent = uniqueAbility;
    document.getElementById('awesome-gallery').appendChild(awesomeItem);
}

// Edit and Save functionality for About Me section
document.getElementById('edit-about-btn').addEventListener('click', function() {
    document.getElementById('about-display').classList.add('hidden');
    document.getElementById('about-edit').classList.remove('hidden');
    document.getElementById('save-about-btn').classList.remove('hidden');
    this.classList.add('hidden');
    document.getElementById('about-edit').value = document.getElementById('about-display').textContent.trim();
});

document.getElementById('save-about-btn').addEventListener('click', function() {
    document.getElementById('about-display').textContent = document.getElementById('about-edit').value;
    document.getElementById('about-display').classList.remove('hidden');
    document.getElementById('about-edit').classList.add('hidden');
    document.getElementById('edit-about-btn').classList.remove('hidden');
    this.classList.add('hidden');
});

// Save portfolio as PDF
document.getElementById('savePortfolioBtn').addEventListener('click', function() {
    // Hide buttons and textareas
    const buttonsAndTextareas = document.querySelectorAll('button, textarea');
    buttonsAndTextareas.forEach(element => {
        element.style.display = 'none';
    });

    // Hide all sections initially
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show "About Me" section
    const aboutSection = document.getElementById('about');
    aboutSection.style.display = '';

    // Show only sections with content
    const filledSections = document.querySelectorAll('section[id]:not(#about)');
    filledSections.forEach(section => {
        const sectionContent = section.querySelectorAll('input, textarea');
        let hasContent = false;
        sectionContent.forEach(content => {
            if (content.value.trim() !== '' || content.src) { // Check if input or textarea has value, or if an image has been uploaded
                hasContent = true;
            }
        });
        if (hasContent) {
            section.style.display = '';
        }
    });

    const content = document.body.innerHTML;
    const opt = {
        margin:       0.5,
        filename:     'student-portfolio.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save();

    // Show buttons and textareas again
    buttonsAndTextareas.forEach(element => {
        element.style.display = '';
    });

    // Show all sections again
    sections.forEach(section => {
        section.style.display = '';
    });
});
