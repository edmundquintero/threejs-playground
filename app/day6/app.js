var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 1000;
	camera.position.y = 0;
	camera.position.x = 300;

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry(400, 400, 400, widthSegments = 4, heightSegments = 4, depthSegments = 4);
	geometry2 = new THREE.CubeGeometry(400, 400, 400, widthSegments = 4, heightSegments = 4, depthSegments = 4);
	material = new THREE.MeshNormalMaterial({
		color: 0x000000,
		wireframe: false,
		wireframeLinewidth: 1
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	mesh2 = new THREE.Mesh(geometry2, material);
	mesh2.position.x = 600;
	scene.add(mesh2);

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

	mesh2.rotation.x = Date.now() * 0.0002;
	mesh.rotation.y = Date.now() * 0.0002;


	renderer.render(scene, camera);
}
