var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry(200, 200, 200, widthSegments = 1, heightSegments = 1, depthSegments = 1);
	material = new THREE.MeshNormalMaterial({
		color: 0x000000,
		wireframe: false,
		wireframeLinewidth: 1
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
  
  mesh.rotation.x = Date.now() * 0.00008;
	mesh.rotation.y = Date.now() * 0.0002;

	renderer.render(scene, camera);
}
