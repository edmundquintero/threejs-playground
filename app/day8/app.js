'use strict';

(function(){

  var camera, scene, renderer;
  var geometry, geometry2, material, material2, mesh, mesh2;
  var radiusSegments, heightSegments, openEnded;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    THREE.ImageUtils.loadTexture('nukacola.jpg', undefined, function(texture){
      geometry = new THREE.CylinderGeometry(100, 100, 300, radiusSegments = 100, heightSegments = 1, openEnded = false);
      material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: true
      });

      mesh = new THREE.Mesh (geometry, material);
      scene.add(mesh);
    });

    geometry2 = new THREE.CylinderGeometry(99, 99, 310, radiusSegments = 100, heightSegments = 1, openEnded = false);
    material2 = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: false,
      wireframeLinewidth: 0
    });
    mesh2 = new THREE.Mesh (geometry2, material2);
    scene.add(mesh2);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
  }

  function animate(){
    requestAnimationFrame(animate);

    mesh.rotation.y = Date.now() * 0.001;

    renderer.render(scene, camera);
  }

})();
