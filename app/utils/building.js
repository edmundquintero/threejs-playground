'use strict';
/* exported Building */
function Building(opts){
  var self = this;

  self.position ={};
  self.scene = {};
  self.square = {};
  self.material = {};

  if(opts.position){
    self.position.x = opts.position.x || 0;
    self.position.y = opts.position.y || 0;
    self.position.z = opts.position.z || 0;
  } else {
    self.position = {
      x: 0,
      y: 0,
      z: 0
    };
  }

  if(opts.scene){
    self.scene = opts.scene;
  } else{
    console.warn('No scene passed Player creating new scene');
    self.scene = new THREE.Scene();
  }

  if(opts.square){
    self.square = opts.square;
  } else{
    console.warn('No square passed Player creating new square');
    self.square = new THREE.CubeGeometry(400, 400, 400, 4, 4, 4);
  }

  if(opts.material){
    self.material = opts.material;
  } else{
    console.warn('No material passed Player creating new material');
    self.material = new THREE.MeshNormalMaterial({
      color: 0x000000,
      wireframe: false,
      wireframeLinewidth: 1
    });
  }

  self.go = function(){
    init();
  };

  function init(){
    var mesh = new THREE.Mesh(self.square, self.material);
    mesh.position.x = self.position.x;
    mesh.position.y = self.position.y;
    mesh.position.z = self.position.z;
    self.scene.add(mesh);
    console.log(self.scene);
  }
  
  return {
    go: self.go
  };

}
