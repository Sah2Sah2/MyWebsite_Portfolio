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

// Load textures for the Moon and Sun
const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('textures/8k_moon.jpg');  
const sunTexture = textureLoader.load('textures/8k_sun.jpg');    

// Create sphere and apply the moon or sun texture
const geometry = new THREE.SphereGeometry(15, 50, 50);  // Increase radius to 15 for a bigger sphere
const material = new THREE.MeshBasicMaterial({ map: moonTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set the sphere position to the bottom-right of the screen
sphere.position.set(8, -5, -20);  // Adjust X, Y, Z position to fit larger sphere

// Set camera position
camera.position.z = 30;  // Move the camera back to accommodate the larger sphere

// Function to toggle the theme
let isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Update sphere texture and body background based on theme
function updateTheme() {
    if (isDarkTheme) {
        // Apply moon texture to sphere
        sphere.material.map = moonTexture;  
        // Change background to moon theme
        document.body.classList.add('moon-theme');
        document.body.classList.remove('sun-theme');
        // Update theme toggle emoji to full moon
        document.getElementById("theme-toggle").textContent = '🌕';
    } else {
        // Apply sun texture to sphere
        sphere.material.map = sunTexture;   
        // Change background to sun theme
        document.body.classList.add('sun-theme');
        document.body.classList.remove('moon-theme');
        // Update theme toggle emoji to sun
        document.getElementById("theme-toggle").textContent = '☀️';
    }
}

// Call updateTheme to set the initial texture and background
updateTheme();

// Add event listener to the theme toggle button
document.getElementById("theme-toggle").addEventListener("click", () => {
    // Toggle theme
    isDarkTheme = !isDarkTheme;
    updateTheme();  // Apply the new theme texture and background
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002; // Rotate slower
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
