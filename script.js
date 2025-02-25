document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");
    const moonIcon = document.getElementById("theme-toggle"); 

    // Function to toggle the theme
    function toggleTheme(isLightTheme) {
        if (isLightTheme) {
            // Light theme settings
            body.style.backgroundColor = '#d3c8e0';  
            if (typeof scene !== 'undefined') {
                scene.background = new THREE.Color(0xd3c8e0); 
            }
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            moonIcon.textContent = '🌕'; 
            localStorage.setItem("theme", "light-theme"); 
        } else {
            // Dark theme settings
            body.style.backgroundColor = '#AEC6CF'; 
            if (typeof scene !== 'undefined') {
                scene.background = new THREE.Color(0xAEC6CF); 
            }
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            moonIcon.textContent = '🌕'; 
            localStorage.setItem("theme", "dark-theme"); 
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

    var navbarHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
    document.body.style.paddingTop = navbarHeight + 'px'; 
});

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

// Animate stars 
function animateStars() {
    var stars = selectStars();
    
    Array.prototype.forEach.call(stars, function(el) {
        gsap.to(el, { 
            opacity: Math.random() * 0.5 + 0.2, 
            duration: Math.random() * 0.5 + 0.5, 
            repeat: -1,
            yoyo: true, 
        });
    });
}

// Create and animate stars once the page is loaded
window.onload = function() {
    createStars(150); // Create 100 stars 
    animateStars();  
}

// Initialize stars and animation
createStars(150);
selectStars();
animateStars();

// Typed text
document.addEventListener('DOMContentLoaded', function () {
    const typedText = "Hello Moon! I'm Sara.";
    let index = 0;
    const speed = 100; // Typing speed in milliseconds
    const textElement = document.getElementById("typed-text");
    const cursor = document.getElementById("cursor");

    function typeText() {
        if (index < typedText.length) {
            textElement.innerHTML += typedText.charAt(index);
            index++;
            setTimeout(typeText, speed);
        } else {
            // Once typing is done, hide the cursor
            cursor.style.display = "none";
        }
    }

    typeText();
});



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



