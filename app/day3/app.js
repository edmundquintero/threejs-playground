var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;

	scene = new THREE.Scene();

  THREE.ImageUtils.loadTexture('laughingman.jpg', undefined, function(texture) {
  	geometry = new THREE.SphereGeometry(300, 20, 20);
  	material = new THREE.MeshBasicMaterial({
  		map: texture,
  		overdraw: true
  	});
  	mesh = new THREE.Mesh(geometry, material);
  	scene.add(mesh);
  });

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
  
	mesh.rotation.y = Date.now() * 0.0004;

	renderer.render(scene, camera);
}
