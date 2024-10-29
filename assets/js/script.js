// Toggle Menu
function toggleMenu(){
    const menu =document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// typing ...
const texts = ["Frontend Development", "Backend Development"];
const typingSpeed = 50; // Time in ms for each letter
const delayBetweenTexts = 1500; // Delay between strings in ms
let textIndex = 0; 
let charIndex = 0;

function type() {
    if (charIndex < texts[textIndex].length) {
        document.getElementById("text").innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenTexts);
    }
}

function erase() {
    if (charIndex > 0) {
        document.getElementById("text").innerHTML = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, typingSpeed);
    } else {
        textIndex = (textIndex + 1) % texts.length; 
        setTimeout(type, typingSpeed); 
    }
}

// fecting data from json
async function fetchData(type = "skills") {
    try {
        let response;
        // Fetch the appropriate JSON file based on type
        response = await fetch(type === "skills" ? "skills.json" : "projects.json");
        
        if (!response.ok) throw new Error("Network response was not ok"); // Check if response is okay

        const data = await response.json(); // Parse JSON
        return data;
    } catch (error) {
        console.error("Error fetching data:", error); // Log any errors to the console
    }
}

// Function to display skills
function showSkills(skills) {
    let skillsContainer = document.getElementById("skills-container");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
            <article data-aos="zoom-in">
                <img src="${skill.image}" alt="${skill.name} logo" class="icon">
                <div>
                    <h3>${skill.name}</h3>
                </div>
            </article>
        `;
    });
    // Add skills to parant element
    skillsContainer.innerHTML = skillHTML;
}

// Function to display projects
function showProjects(projects) {
    let projectsContainer = document.querySelector("#project-container");
    let projectHTML = "";
    let ProState = ""

    projects.forEach(project => {
        ProState = (project.status == "Completed") ? "Code" : project.status;
        projectHTML += `
            <div class="details-container color-container" data-aos="zoom-in">
                <div class="flex article-container">
                    <img src="${project.image}" alt="${project.name}" class="project-img">
                </div>
                <p class="experience-sub-title project-title">${project.name}</p>
                <div class="flex-center btn-container">
                    <button class="btn btn-color-1 project-btn" target='_blank' onclick="location.href='${project.github}'">GitHub</button>
                    <button class="btn btn-color-1 project-btn" target='_blank'" onclick="location.href='${project.demo}'">${ProState}</button>
                </div>
            </div>
        `;
    });
    // add projects to parante element
    projectsContainer.innerHTML = projectHTML;
}

// calling type function
type();

// Fetch and display skills
fetchData().then(data => {
    if (data) showSkills(data); // Only call showSkills if data is available
});

// Fetch and display projects
fetchData("projects").then(data => {
    if (data) showProjects(data); // Only call showProjects if data is available
});