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
renderer.setClearColor(0x000000, 0); // Transparent background for Three.js canvas
// Append the canvas to the body
document.body.appendChild(renderer.domElement);
// Load Moon texture
const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('textures/2k_moon.jpg');  

// Create Moon sphere
const geometry = new THREE.SphereGeometry(15, 20, 20); // Lower segments for better performance

const material = new THREE.MeshBasicMaterial({ map: moonTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
// Set Moon position
sphere.position.set(8, -5, -20);
// Set camera position
camera.position.z = 30;
// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Render function
function animate() {
    renderer.setAnimationLoop(animate); // This is more optimized for Three.js

    sphere.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();