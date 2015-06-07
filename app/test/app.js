'use strict';

 /* global Player,Building */ 

(function() {

  var scene, camera, renderer;
  var geometry, material;
  
  init();
  animate();

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 0;
    camera.position.y = 10;
    camera.position.x = 0;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var player = new Player({scene: scene, camera: camera, renderer: renderer});
    player.go();

    geometry = new THREE.CubeGeometry(100, 500, 100, 4, 20, 4);
    material = new THREE.MeshNormalMaterial({
      color: 0x000000,
      wireframe: false,
      wireframeLinewidth: 1
    });

    var building = new Building({scene: scene, square: geometry, material: material});
    building.go();
    var building2position = {
      x: 120
    };
    var building2 = new Building({scene: scene, square: geometry, material: material, position: building2position});
    building2.go();
    var building3position = {
      x: -120
    };
    var building3 = new Building({scene: scene, square: geometry, material: material, position: building3position});
    building3.go();
    var building4position = {
      x: 240
    };
    var building4 = new Building({scene: scene, square: geometry, material: material, position: building4position});
    building4.go();
    var building5position = {
      x: 240,
      z: 120
    };
    var building5 = new Building({scene: scene, square: geometry, material: material, position: building5position});
    building5.go();
    var building6position = {
      x: 120,
      z: 120
    };
    var building6 = new Building({scene: scene, square: geometry, material: material, position: building6position});
    building6.go();

    var mesh = createFloor();
    scene.add(mesh);

  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  function createFloor() {
    geometry = new THREE.PlaneGeometry(5000, 5000, 5, 5);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
    var texture = THREE.ImageUtils.loadTexture('textures/water1.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
    return new THREE.Mesh(geometry, material);
  }



})();
