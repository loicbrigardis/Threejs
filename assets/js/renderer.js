import * as THREE from '../../vendors/three.min';

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xD7D3D2);
document.querySelector('#scene').appendChild(renderer.domElement);

var light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.7);
light.position.set(0, 50, 0);

export { renderer, light };