var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;

	scene = new THREE.Scene();

	geometry = new THREE.IcosahedronGeometry(200, 2);
	material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		wireframe: true,
		wireframeLinewidth: 5
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.y = Date.now() * 0.0001;

	renderer.render(scene, camera);
}
