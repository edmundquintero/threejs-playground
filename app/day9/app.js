'use strict';

(function(){

  var camera, scene, renderer;

  setup();

  function setup(){
    document.body.style.backgroundColor = '#555';
    setupCanvas();
    setupCity(300);

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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function setupCity(numBuildings){
    
    ambiance();

    // Floor
    var plane = new THREE.PlaneGeometry(2000, 2000, 20, 20);
    var mat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      overdraw: true
    });
    var floor = new THREE.Mesh(plane, mat);
    floor.rotation.x = -90 * Math.PI / 180;
    scene.add(floor);

    // Original building
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
      overdraw: true,
      color: 0xff0000
    });
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    // Cloned buildings
    var cityGeometry = new THREE.Geometry();
    for (var i = 0; i < numBuildings; i++) {
      var building = new THREE.Mesh(geometry.clone());
      building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      building.scale.x = Math.random() * 50 + 10;
      building.scale.y = Math.random() * building.scale.x * 8 + 8;
      building.scale.z = building.scale.x;
      THREE.GeometryUtils.merge(cityGeometry, building);
    }
    var city = new THREE.Mesh(cityGeometry, material);
    scene.add(city);

  }

  function ambiance() {
    // Light
    var light = new THREE.DirectionalLight(0xf6e86d, 1);
    light.position.set(1, 3, 2);
    scene.add(light);

    // Fog
    scene.fog = new THREE.FogExp2(0x9db3b5, 0.00125);
  }

})();
