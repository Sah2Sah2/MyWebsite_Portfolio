document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle"); // Ensure this is your theme toggle button
    const sunIcon = document.getElementById("sun"); // If you have a sun icon (optional)
    const moonIcon = document.getElementById("moon"); // If you have a moon icon (optional)

    // Function to toggle the theme
    function toggleTheme(isLightTheme) {
        if (isLightTheme) {
            // Light theme settings
            body.style.backgroundColor = '#d3c8e0';  // Light theme background color
            scene.background = new THREE.Color(0xd3c8e0); // Light theme for Three.js scene
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            document.getElementById("theme-toggle").textContent = '🌕'; // Light theme emoji
            localStorage.setItem("theme", "light"); // Save light theme in localStorage
        } else {
            // Dark theme settings
            body.style.backgroundColor = '#AEC6CF';  // Dark theme background color (pastel blue)
            scene.background = new THREE.Color(0xAEC6CF); // Dark theme for Three.js scene
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            document.getElementById("theme-toggle").textContent = '🌑'; // Dark theme emoji
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
        if (savedTheme === 'light') {
            toggleTheme(true); // Apply light theme
        } else {
            toggleTheme(false); // Apply dark theme
        }
    } else {
        // Default to light theme if no theme is saved
        toggleTheme(true);
    }

    // Optional: Dynamically add padding to body if there's a header
    var navbarHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
    document.body.style.paddingTop = navbarHeight + 'px'; // Dynamically apply the top padding
});
