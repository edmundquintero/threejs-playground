'use strict';

 /* global Player */ 

(function() {

  var scene, camera, renderer;
  var geometry, material;
  
  init();

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var player = new Player({scene: scene, camera: camera, renderer: renderer});
    player.go();

    var mesh = createFloor();
    scene.add(mesh);

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
