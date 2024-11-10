document.getElementById('profilePic').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('profilePicPreview').src = e.target.result;
          document.getElementById('profilePicPreview').style.display = 'block';
      };
      reader.readAsDataURL(file);
  }
});

function generateCV() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const summary = document.getElementById('summary').value;
  const about = document.getElementById('about').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const experience = document.getElementById('experience').value.split('\n');
  const education = document.getElementById('education').value.split('\n');

  const cvContent = `
      <div class="left-column">
          <img id="profilePicPreview" class="profile-pic" style="display: none;">
          <h2>${name}</h2>
          <h4>${title}</h4>
          <div class="contact-info">
              <p>${email}</p>
              <p>${phone}</p>
          </div>
          <h3>Skills</h3>
          <div>${skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}</div>
      </div>
      <div class="right-column">
          <h3>Summary</h3>
          <p>${summary}</p>
          <h3>About Me</h3>
          <p>${about}</p>
          <h3>Experience</h3>
          <ul>${experience.map(exp => `<li>${exp}</li>`).join('')}</ul>
          <h3>Education</h3>
          <ul>${education.map(edu => `<li>${edu}</li>`).join('')}</ul>
      </div>
  `;

  document.getElementById('cvContent').innerHTML = cvContent;
}

function downloadCV() {
  const element = document.getElementById('cvContent');
  html2pdf(element, {
      margin: 1,
      filename: 'my_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  });
}
