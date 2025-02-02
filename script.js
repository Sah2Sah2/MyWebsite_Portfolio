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


// Stars creation function
function createStars(numberOfStars) {
    for (var i = 0; i < numberOfStars; i++) {
        drawStars();
    }
}

// Function to create and position stars
function drawStars(){
    var tmpStar = document.createElement('figure');
    tmpStar.className = "star";
    tmpStar.style.top = Math.random() * 100 + '%';  // Random top position
    tmpStar.style.left = Math.random() * 100 + '%'; // Random left position
    document.getElementById('sky').appendChild(tmpStar);  // Append to #sky
}

// Function to select all stars
function selectStars() {
    var stars = document.querySelectorAll(".star");
    console.log(stars); // This will log all the stars to the console
}

// Animate stars (this should not affect the h1 element)
function animateStars() {
    var stars = document.querySelectorAll(".star");
    Array.prototype.forEach.call(stars, function(el) {
        gsap.to(el, { 
            opacity: Math.random() * 0.5 + 0.2, // Adding a minimum opacity value
            duration: Math.random() * 0.5 + 0.5,
            onComplete: animateStars
        });
    });
}

// Initialize stars and animation
createStars(200);
selectStars();
animateStars();

const canvas = document.getElementById('scrollingCanvas');
const ctx = canvas.getContext('2d');
const text = "Scrolling Text Example";  // Your text
let x = canvas.width;  // Start off-screen to the right

// Set the font and size
ctx.font = '20px Jost, serif'; 

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
  ctx.fillStyle = 'black';  // Set the color of the text
  ctx.fillText(text, x, 30);  // Draw the text at position (x, 30)

  // Move the text to the left (speed)
  x -= 2;

  // When the text has completely moved off the left side, reset its position to the right
  if (x <= -ctx.measureText(text).width) {
    x = canvas.width;  // Reset x to start from the right edge
  }

  requestAnimationFrame(draw);  // Keep the loop running
}

draw();  // Start the drawing process



// FAQ

const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentNode.classList.toggle('active');
  });
});