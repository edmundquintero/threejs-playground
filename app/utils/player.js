'use strict';

/* global Controls */ 
/* exported Player */
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
    self.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(self.renderer.domElement);
  }

  self.controls = {};

  self.go = function(){
    init();
    self.animate();
  };
      
  self.animate = function() {
    requestAnimationFrame(self.animate);
    self.controls.updateControls();
    self.renderer.render(self.scene, self.camera);
  };

  function init(){

    self.controls = new Controls( self.camera );
    self.controls.init('2d');
    self.scene.add(self.controls.getObject());

  }
 
  return {
    go: self.go
  };

}
