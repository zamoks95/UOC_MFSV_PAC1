import * as THREE from "three";

export default function Tutorial5() {
  const canvasElement = document.getElementById("Tutorial5Canvas");
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  let camera;

  // Initialize Objects
  // x, y and z rotation
  var xRotation = 0.0;
  var yRotation = 0.0;
  var zRotation = 0.0;

  // Initialize Dice
  var boxMesh;

  // Initialize Sin
  let degrees = 0;

  // Initialize Scene
  initializeScene();

  // Animate Scene
  animateScene();

  // Initialize Scene - Start
  function initializeScene() {
    renderer.setClearColor(0x000000, 1);
    let canvasWidth = canvasElement.offsetWidth; // Canvas Width
    let canvasHeight = canvasElement.offsetHeight; // Canvas Height
    renderer.setSize(canvasWidth, canvasHeight);

    canvasElement.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      1,
      100
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Create Box - Start
    var boxGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);
    boxMesh = new THREE.Mesh(boxGeometry, diceFaceMaterial());
    boxMesh.position.set(0.0, 0.0, 4.0);
    scene.add(boxMesh);
    // Create Box - End
  }
  // Initialize Scene - End

  // Render Scene - Start
  function renderScene() {
    renderer.render(scene, camera);
  }
  function animateScene() {
    xRotation += 0.03;
    yRotation += 0.02;
    zRotation += 0.04;

    boxMesh.rotation.set(xRotation, yRotation, zRotation);
    requestAnimationFrame(animateScene);
    renderScene();
  }
  // Render Scene - End

  // Calculate Sinus - Start
  function getSinus() {
    if (degrees > 360) {
      degrees = 0;
    } else {
      degrees += 1;
    }
    return Math.sin((degrees * Math.PI) / 180);
  }
  // Calculate Sinus - End

  // Window Resize Handler - Start
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = canvasElement.offsetWidth / canvasElement.offsetHeight;
    camera.updateProjectionMatrix(); // Update Camera
    renderer.setSize(canvasElement.offsetWidth, canvasElement.offsetHeight);
    animateScene(); // Rerender Scene
  }
  // Window Resize Handler - End
}

// diceFaceMaterial - Start
function diceFaceMaterial(){
  let textureLoader = new THREE.TextureLoader();
  const materials = [
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-1.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-2.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-3.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-4.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-5.jpg"),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/dice-6.jpg"),
    }),
  ];
  return new THREE.MeshFaceMaterial(materials);
}
// diceFaceMaterial - End
