'use strict';

/* exported Controls */
function Controls(camera){
  var self = this;
  var moveForward,
      moveBackward,
      moveLeft,
      moveRight,
      canJump;
  var velocity = new THREE.Vector3();
  var clock = new THREE.Clock();
  var controlsEnabled;
  var havePointerLock = checkForPointerLock();
  self.camera = camera || {};
  self.controls = {};
  self.depth = '';

  self.init = function(depth){
    if(depth){ self.setDepth(depth); }
    self.controls = new THREE.PointerLockControls(self.camera);

    initPointerLock();
    initControls();

    return self.controls;
  };

  self.getObject = function(){
    return self.controls.getObject();
  };

  self.setDepth = function(depth){
    self.depth = depth.toLowerCase() || '3d';
  };

  self.updateControls = function() {
    if (controlsEnabled) {
      var delta = clock.getDelta();
      var walkingSpeed = 2000.0;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta;

      if (moveForward){ velocity.z -= walkingSpeed * delta; }
      if (moveBackward){ velocity.z += walkingSpeed * delta; }
      if (moveLeft){ velocity.x -= walkingSpeed * delta; }
      if (moveRight){ velocity.x += walkingSpeed * delta; }

      self.controls.getObject().translateX(velocity.x * delta);
      self.controls.getObject().translateY(velocity.y * delta);
      self.controls.getObject().translateZ(velocity.z * delta);

      if (self.controls.getObject().position.y < 10) {
        velocity.y = 0;
        self.controls.getObject().position.y = 10;
        canJump = true;
      }
    }
  };

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
          self.controls.enabled = true;
        } else {
          controlsEnabled = false;
          self.controls.enabled = false;
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

    function onKeyDown(e) {
      if( self.depth === '2d'){
        switch (e.keyCode) {
          case 37: // left
          case 65: // a
            moveLeft = true;
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

      } else {    
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
    }

    function onKeyUp(e) {
      if( self.depth === '2d'){
        switch(e.keyCode) {
          case 37: // left
          case 65: // a
            moveLeft = false;
            break;
          case 39: // right
          case 68: // d
            moveRight = false;
            break;
        }
      } else {
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
    }
  }

  return{
    init: self.init,
    updateControls: self.updateControls,
    getObject: self.getObject,
    setDepth: self.setDepth
  };
}