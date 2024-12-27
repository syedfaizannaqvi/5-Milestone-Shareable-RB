
interface Education {
    school: string;
    degree: string;
    graduationYear: string;
}

interface Experience {
    company: string;
    jobtitle: string;
    duration: string;
    details: string;
}

interface Resume {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
}


function getResumeData(): Resume | null {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedResumeData = urlParams.get('data');
    
    if (encodedResumeData) {
        try {
            return JSON.parse(decodeURIComponent(encodedResumeData)) as Resume;
        } catch (error) {
            console.error('Error decoding resume data:', error);
        }
    }
    return null;
}


function displaySharedResume(resume: Resume): void {
    if (resume) {
        const resumeContainer = document.getElementById('resume-container') as HTMLElement;
        const resumeHTML = `
            <h2>${resume.firstName} ${resume.lastName}</h2>
            <p>Email: ${resume.email}</p>
            <p>Phone: ${resume.phone}</p>
            <h3>Skills:</h3>
            <ul>
                ${resume.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <h3>Education:</h3>
            ${resume.education.map(edu => `
                <div>
                    <h4>${edu.school} (${edu.graduationYear})</h4>
                    <p>${edu.degree}</p>
                </div>
            `).join('')}
            <h3>Experience:</h3>
            ${resume.experience.map(exp => `
                <div>
                    <h4>${exp.company}</h4>
                    <p>Title: ${exp.jobtitle} (${exp.duration})</p>
                    <p>${exp.details}</p>
                </div>
            `).join('')}
        `;
        resumeContainer.innerHTML = resumeHTML;
    }
}


const resumeData = getResumeData();
if (resumeData) {
    displaySharedResume(resumeData);
} else {
    const resumeContainer = document.getElementById('resume-container') as HTMLElement;
    resumeContainer.innerText = 'No resume data found.';
}