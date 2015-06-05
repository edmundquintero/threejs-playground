


var demo = new Demo();
demo.init(8);
demo.animate();


function Demo(){

	var camera, scene, renderer,
	    geometry, material, mesh,
	    self = this;
	self.num = 0;
	self.objs = {};

	self.init = function(num) {
		if (num) {self.num = num}

		// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
		camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 2000 );
		camera.position.z = 1000;
		camera.position.y = 0;
		camera.position.x = 300;

		scene = new THREE.Scene();

		geometry = new THREE.TorusKnotGeometry( 150, 30, 200, 32, 4, 1, 4 );
		material = new THREE.MeshNormalMaterial({
			color: 0x000000,
			wireframe: true,
			wireframeLinewidth: 1
		});

		for (var i = 0; i < self.num; i++){
			self.objs['mesh'+i] = new THREE.Mesh(geometry, material);
			scene.add(self.objs['mesh'+i]);
			self.objs['mesh'+i].position.x = i*250 -600;
			if(i%2 === 0){
				self.objs['mesh'+i].position.y = 100;
			}
		}

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		document.body.appendChild(renderer.domElement);

	}

	self.animate = function(){
		requestAnimationFrame(self.animate);

		// console.log('what?', self);

		for (var a = 0; a < self.num; a++){
			var mesh = self.objs['mesh'+a];
			if(a%7 === 0){
				mesh.rotation.x = Date.now() * 0.001;
				mesh.rotation.y = Date.now() * 0.001;
			} else{
				mesh.rotation.x = Date.now() * 0.002;
				mesh.rotation.y = Date.now() * 0.002;
			}
		}
		renderer.render(scene, camera);
	}

	return {
		init: self.init,
		animate: self.animate
	}

}
