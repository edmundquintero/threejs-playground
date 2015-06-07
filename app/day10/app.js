'use strict';

(function(){

  var camera, scene, renderer;

  setup();

  function setup(){
    setupCanvas();
    setupScene();

    requestAnimationFrame(function animate(){
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    });
  }

  function setupCanvas(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.rotation.x = -35 * Math.PI / 180;
    camera.position.y = 500;
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function setupScene(){

    // Light
    var spotLight = new THREE.SpotLight( 0xffffff );

    renderer.shadowMapEnabled = true;
    spotLight.position.set( 1000, 1000, 1000 );
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;
    scene.add(spotLight);

    // Floor
    var plane = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
      color: 0xefefef,
      overdraw: true
    });
    var floor = new THREE.Mesh(plane, mat);
    floor.rotation.x = -90 * Math.PI / 180;
    floor.position.y = -100;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ball model
    var geometry = new THREE.SphereGeometry(100, 50, 50);
    var material = new THREE.MeshPhongMaterial({
      overdraw: true,
      color: 0xdfdfdf
    });

    for (var i = 0; i < 2; i++) {
      var ball = new THREE.Mesh(geometry.clone(), material);
      ball.position.x = (i * 300) - 200;
      ball.castShadow = true;
      scene.add(ball);
    }
  }

})();
