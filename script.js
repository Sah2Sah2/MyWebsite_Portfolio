// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Load Moon texture
const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('textures/8k_moon.jpg');  

// Create Moon sphere
const geometry = new THREE.SphereGeometry(15, 50, 50);  
const material = new THREE.MeshBasicMaterial({ map: moonTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set Moon position
sphere.position.set(8, -5, -20);

// Set camera position
camera.position.z = 30;

// Detect user preference for dark mode or light mode
let isDarkTheme = localStorage.getItem("theme") === "dark" || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Function to toggle the theme
function updateTheme() {
    if (isDarkTheme) {
        // Dark theme: Light Blue background
        renderer.setClearColor(0xAEC6CF, 1);
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        document.getElementById("theme-toggle").textContent = '🌑'; // Dark theme emoji
        localStorage.setItem("theme", "dark"); // Save dark mode in local storage
    } else {
        // Light theme: Soft purple background
        renderer.setClearColor(0xd3c8e0, 1);
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        document.getElementById("theme-toggle").textContent = '🌕'; // Light theme emoji
        localStorage.setItem("theme", "light"); // Save light mode in local storage
    }
}

// Apply initial theme based on the stored value or system preference
updateTheme();

// Toggle theme on button click
document.getElementById("theme-toggle").addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    updateTheme();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002; // Spin the moon
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('DOMContentLoaded', (event) => {
    var navbarHeight = document.querySelector('header').offsetHeight;
    document.body.style.paddingTop = navbarHeight + 'px'; // Dynamically apply the top padding
});
