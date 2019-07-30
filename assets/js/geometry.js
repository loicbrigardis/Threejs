import * as THREE from '../../vendors/three.min';

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xffffff
});
export var cube = new THREE.Mesh(geometry, material);