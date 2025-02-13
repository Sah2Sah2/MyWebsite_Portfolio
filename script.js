document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle"); // Ensure this is your theme toggle button
    const moonIcon = document.getElementById("theme-toggle"); // Using a single element for the moon icon

    // Function to toggle the theme
    function toggleTheme(isLightTheme) {
        if (isLightTheme) {
            // Light theme settings
            body.style.backgroundColor = '#d3c8e0';  // Light theme background color
            if (typeof scene !== 'undefined') {
                scene.background = new THREE.Color(0xd3c8e0); // Light theme for Three.js scene
            }
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            moonIcon.textContent = '🌕'; // Light theme emoji
            localStorage.setItem("theme", "light-theme"); // Save light theme in localStorage
        } else {
            // Dark theme settings
            body.style.backgroundColor = '#AEC6CF';  // Dark theme background color (pastel blue)
            if (typeof scene !== 'undefined') {
                scene.background = new THREE.Color(0xAEC6CF); // Dark theme for Three.js scene
            }
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            moonIcon.textContent = '🌕'; // Dark theme emoji (same emoji used)
            localStorage.setItem("theme", "dark-theme"); // Save dark theme in localStorage
        }
    }

    // Event listener for the theme toggle button
    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains('light-theme')) {
            toggleTheme(false); // Switch to dark theme
        } else {
            toggleTheme(true); // Switch to light theme
        }
    });

    // On page load, apply the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme); // Apply the saved theme class
        toggleTheme(savedTheme === 'light-theme');
    } else {
        toggleTheme(true); // Default to light theme
    };

    // Optional: Dynamically add padding to body if there's a header
    var navbarHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
    document.body.style.paddingTop = navbarHeight + 'px'; // Dynamically apply the top padding
});


// Ensure GSAP is included (place this in your HTML head if not already included)


// Stars creation function
function createStars(numberOfStars) {
    for (var i = 0; i < numberOfStars; i++) {
        drawStars();
    }
}

// Function to create and position stars
function drawStars() {
    var tmpStar = document.createElement('figure');
    tmpStar.className = "star";
    
    // Randomize the size of the stars for more variety
    var size = Math.random() * 3 + 1;  // Random size between 1px and 4px
    tmpStar.style.width = `${size}px`;
    tmpStar.style.height = `${size}px`;
    
    // Random positions
    tmpStar.style.top = Math.random() * 100 + '%';  // Random top position
    tmpStar.style.left = Math.random() * 100 + '%'; // Random left position
    
    document.getElementById('sky').appendChild(tmpStar);  // Append to #sky
}

// Function to select all stars
function selectStars() {
    var stars = document.querySelectorAll(".star");
    return stars;
}

// Animate stars (this should not affect the h1 element)
function animateStars() {
    var stars = selectStars();
    
    Array.prototype.forEach.call(stars, function(el) {
        gsap.to(el, { 
            opacity: Math.random() * 0.5 + 0.2, // Adding a minimum opacity value
            duration: Math.random() * 0.5 + 0.5, // Random duration
            repeat: -1, // Makes the animation repeat indefinitely
            yoyo: true, // Ensures the animation reverses (makes the fade effect smooth)
        });
    });
}

// Create and animate stars once the page is loaded
window.onload = function() {
    createStars(100); // Create 100 stars (you can change this number)
    animateStars();   // Animate the stars
}



// Initialize stars and animation
createStars(100);
selectStars();
animateStars();

//Sliding text
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("sliding-text");

    textElement.addEventListener("mouseenter", () => {
        textElement.style.animationPlayState = "paused"; // Pause the animation
    });

    textElement.addEventListener("mouseleave", () => {
        textElement.style.animationPlayState = "running"; // Resume the animation
    });
});


// FAQ

const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentNode.classList.toggle('active');
  });
});