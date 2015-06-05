'use strict';

function Player(opts){
  var self = this;

  if(opts.camera){
    self.camera = opts.camera;
  } else{
    console.warn('No camera passed Player creating new camera');
    self.camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  }

  if(opts.scene){
    self.scene = opts.scene;
  } else{
    console.warn('No scene passed Player creating new scene');
    self.scene = new THREE.Scene();
  }

  if(opts.renderer){
    self.renderer = opts.renderer;
  } else {
    console.warn('No renderer passed Player creating new renderer');
    self.renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  var controls, controlsEnabled;
  var moveForward,
      moveBackward,
      moveLeft,
      moveRight,
      canJump;
  var velocity = new THREE.Vector3();
  var havePointerLock = checkForPointerLock();
  var clock = new THREE.Clock();

  self.go = function(){
    init();
    self.animate();
  };
      
  self.animate = function() {
    requestAnimationFrame(self.animate);
    updateControls();
    self.renderer.render(self.scene, self.camera);
  }

  function init(){

    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    self.camera.position.y = 100;
    self.camera.position.z = 100;

    controls = new THREE.PointerLockControls(self.camera);
    self.scene.add(controls.getObject());

    initPointerLock();
    initControls();
    
  }

  function checkForPointerLock() {
    return 'pointerLockElement' in document || 
           'mozPointerLockElement' in document || 
           'webkitPointerLockElement' in document;
  }

  function initPointerLock() {
    var element = document.body;

    if (havePointerLock) {
      var pointerlockchange = function () {
        if (document.pointerLockElement === element ||
            document.mozPointerLockElement === element ||
            document.webkitPointerLockElement === element) {
          controlsEnabled = true;
          controls.enabled = true;
        } else {
          controlsEnabled = false;
          controls.enabled = false;
        }
      };

      var pointerlockerror = function () {
        element.innerHTML = 'PointerLock Error';
      };

      document.addEventListener('pointerlockchange', pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

      document.addEventListener('pointerlockerror', pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

      var requestPointerLock = function() {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
      };
      element.addEventListener('click', requestPointerLock, false);
    } else {
      element.innerHTML = 'Bad browser; No pointer lock';
    }
  }

  function initControls() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true;
        break;
      case 37: // left
      case 65: // a
        moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        moveRight = true;
        break;
      case 32: // space
        if (canJump === true){ velocity.y += 350; }
        canJump = false;
        break;
    }
  }

  function onKeyUp(e) {
    switch(e.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      case 37: // left
      case 65: // a
        moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  }

  function updateControls() {
    if (controlsEnabled) {
      var delta = clock.getDelta();
      var walkingSpeed = 1200.0;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta;

      if (moveForward){ velocity.z -= walkingSpeed * delta; }
      if (moveBackward){ velocity.z += walkingSpeed * delta; }
      if (moveLeft){ velocity.x -= walkingSpeed * delta; }
      if (moveRight){ velocity.x += walkingSpeed * delta; }

      controls.getObject().translateX(velocity.x * delta);
      controls.getObject().translateY(velocity.y * delta);
      controls.getObject().translateZ(velocity.z * delta);

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canJump = true;
      }
    }
  }
  
  return {
    go: self.go
  }

}
