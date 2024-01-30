const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create a detailed 3D background
const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load('1836499.jpg'), // Replace with your own image
  side: THREE.BackSide,
  roughness: 0.2,  // Lowering the roughness for a smoother appearance
  metalness: 0.5, // Adjust metalness for brightness
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights for better visualization
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Increase intensity
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.0); // Increase intensity
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Add a rotating cube
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000 }); // Add emissive for brightness
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotation for the background sphere
  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;

  // Rotation for the additional cube
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Start the animation loop
animate();
