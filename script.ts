
interface ResumeData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    skills: string[];
    experience: {
      jobtitle: string;
      company: string;
      duration: string;
      details: string;
    }[];
    education: {
      degree: string;
      school: string;
      graduationYear: string;
    }[];
  }
  const resumeDisplay = document.getElementById( "resume-display") as HTMLElement;
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const editResume = document.getElementById('editResume') as HTMLButtonElement;
  const generateInk = document.getElementById('generateInk') as HTMLButtonElement;
  
  
  
  
  
  function generateResume(event: Event) {
    event.preventDefault();
    resumeDisplay.style.display = "flex";
    editResume.style.display = "block";
    form.style.display ="none";
    generateInk.style.display = "block";
  
  
  
    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const skills = (
      document.getElementById("skills") as HTMLTextAreaElement
    ).value
      .split(",")
      .map((skill) => skill.trim());
  
    const experience: {
      jobtitle: string;
      company: string;
      duration: string;
      details: string;
    }[] = [];
    const experienceElements = document.querySelectorAll(".experience-entry");
  
    experienceElements.forEach((entry) => {
      const jobtitle = (entry.querySelector(".jobtitle") as HTMLInputElement)
        .value;
      const companyName = (
        entry.querySelector(".companyName") as HTMLInputElement
      ).value;
      const duration = (entry.querySelector(".duration") as HTMLInputElement)
        .value;
      const details = (entry.querySelector(".details") as HTMLTextAreaElement)
        .value;
  
      experience.push({
        jobtitle,
        company: companyName,
        duration,
        details,
      });
    });
  
    const education: {
      degree: string;
      school: string;
      graduationYear: string;
    }[] = [];
    const educationElements = document.querySelectorAll(".education-entry");
  
    educationElements.forEach((entry) => {
      const degree = (entry.querySelector(".degree") as HTMLInputElement).value;
      const school = (entry.querySelector(".school") as HTMLInputElement).value;
      const graduationYear = (
        entry.querySelector(".graduationYear") as HTMLInputElement
      ).value;
  
      education.push({
        degree,
        school,
        graduationYear,
      });
    });
  
    
    const resume: ResumeData = {
      firstName,
      lastName,
      email,
      phone,
      skills,
      experience,
      education,
    };
  
    console.log("Saving resume to localStorage:", resume);
  localStorage.setItem("resume", JSON.stringify(resume));
  
    displayResume(resume);
  }
  
  
  function displayResume(resume: ResumeData) {
    
    const resumeHTML = `
    <main class="main-container">
      <div class="black-section">
      <h1>${resume.firstName} ${resume.lastName}</h1>
      <p>Email: ${resume.email}</p>
      <p>Phone: ${resume.phone}</p> 
        <div>
          <h2>Skills:</h2>
          <ul>
            ${resume.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h2>Education:</h2>
          ${resume.education
            .map(
              (edu) => `
              <div class="education">
              <h4>${edu.school} <span class="educ-span">${edu.graduationYear}</span></h4>
              <h3>${edu.degree}</h3>
              </div>`
            )
            .join("")}
          </div>
  
      </div>
          <h2>Experience:</h2>
          ${resume.experience
            .map(
              (exp) => `
              <div class="experience">
              <h4>${exp.company} </h4>
              <h3>${exp.jobtitle}<span>${exp.duration}</span></h3>
                <p>${exp.details}</p>
              </div>`
            )
            .join("")}
        </div>  
     
        
      </main>
    `;
  
    resumeDisplay.innerHTML = resumeHTML;
    
    editResume.addEventListener("click", goToEditMode);
  }
  
  
  
  form.addEventListener("submit", generateResume);
  
  
  function addExperienceFields() {
    const experienceContainer = document.getElementById(
      "experience-container"
    ) as HTMLElement;
  
    const newExperienceEntry = document.createElement("div");
    newExperienceEntry.classList.add("experience-entry");
    newExperienceEntry.innerHTML = `
      <input type="text" class="jobtitle" placeholder="Job Title" required>
      <input type="text" class="companyName" placeholder="Company Name" required>
      <input type="text" class="duration" placeholder="Duration" required>
      <textarea class="details" placeholder="Job Details" required></textarea>
    `;
  
    experienceContainer.appendChild(newExperienceEntry);
  }
  
  function addEducationFields() {
    const educationContainer = document.getElementById(
      "education-container"
    ) as HTMLElement;
  
    const newEducationEntry = document.createElement("div");
    newEducationEntry.classList.add("education-entry");
    newEducationEntry.innerHTML = `
      <input type="text" class="degree" placeholder="Degree" required>
      <input type="text" class="school" placeholder="School" required>
      <input type="text" class="graduationYear" placeholder="Graduation Year" required>
      <textarea class="educationDetails" placeholder="Details" required></textarea>
    `;
  
    educationContainer.appendChild(newEducationEntry);
  }
  
  
  const addExperienceButton = document.getElementById(
    "addExperience"
  ) as HTMLButtonElement;
  addExperienceButton.addEventListener("click", addExperienceFields);
  
  const addEducationButton = document.getElementById(
    "addEducation"
  ) as HTMLButtonElement;
  addEducationButton.addEventListener("click", addEducationFields);
  
  function goToEditMode() {
  
    const storedResume = localStorage.getItem("resume");
    if (storedResume) {
      const resume: ResumeData = JSON.parse(storedResume);
  
      
      (document.getElementById("firstName") as HTMLInputElement).value = resume.firstName;
      (document.getElementById("lastName") as HTMLInputElement).value = resume.lastName;
      (document.getElementById("email") as HTMLInputElement).value = resume.email;
      (document.getElementById("phone") as HTMLInputElement).value = resume.phone;
      (document.getElementById("skills") as HTMLTextAreaElement).value = resume.skills.join(", ");
  
     
      const experienceContainer = document.getElementById("experience-container") as HTMLElement;
      experienceContainer.innerHTML = ""; 
      resume.experience.forEach((exp, index) => {
        const newExperienceEntry = document.createElement("div");
        newExperienceEntry.classList.add("experience-entry");
        newExperienceEntry.innerHTML = `
          <input type="text" class="jobtitle" value="${exp.jobtitle}" placeholder="Job Title" />
          <input type="text" class="companyName" value="${exp.company}" placeholder="Company Name" />
          <input type="text" class="duration" value="${exp.duration}" placeholder="Duration" />
          <textarea class="details" placeholder="Details">${exp.details}</textarea>
        `;
        experienceContainer.appendChild(newExperienceEntry);
      });
  
     
      const educationContainer = document.getElementById("education-container") as HTMLElement;
      educationContainer.innerHTML = ""; 
      resume.education.forEach((edu) => {
        const newEducationEntry = document.createElement("div");
        newEducationEntry.classList.add("education-entry");
        newEducationEntry.innerHTML = `
          <input type="text" class="degree" value="${edu.degree}" placeholder="Degree" />
          <input type="text" class="school" value="${edu.school}" placeholder="School Name" />
          <input type="text" class="graduationYear" value="${edu.graduationYear}" placeholder="Graduation Year" />
        `;
        educationContainer.appendChild(newEducationEntry);
      });
  
      
      form.style.display = "block";
      editResume.style.display ="none";
      resumeDisplay.style.display = "none";
      generateInk.style.display = "none";
    }
  }
  
  generateInk.addEventListener('click', function() {
    const resumeData = localStorage.getItem('resume');
    if (!resumeData) {
      alert("No resume data found!");
      return;
    }
  
  
    const encodedData = encodeURIComponent(resumeData);
    const baseUrl = `${window.location.origin}/resume.html?data=${encodedData}`;
  
   
    navigator.clipboard.writeText(baseUrl).then(() => {
      alert('Shareable link has been copied to clipboard!');
    });
  
    
  });