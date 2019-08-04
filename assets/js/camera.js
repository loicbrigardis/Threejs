import * as THREE from '../../vendors/three.min';

var camera = new THREE.PerspectiveCamera(75, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 1000);

camera.position.z = 3.5;
camera.position.y = 0.2;
camera.rotation.x = 0;

export { camera };