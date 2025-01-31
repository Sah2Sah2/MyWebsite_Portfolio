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
            localStorage.setItem("theme", "light"); // Save light theme in localStorage
        } else {
            // Dark theme settings
            body.style.backgroundColor = '#AEC6CF';  // Dark theme background color (pastel blue)
            if (typeof scene !== 'undefined') {
                scene.background = new THREE.Color(0xAEC6CF); // Dark theme for Three.js scene
            }
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            moonIcon.textContent = '🌕'; // Dark theme emoji (same emoji used)
            localStorage.setItem("theme", "dark"); // Save dark theme in localStorage
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
