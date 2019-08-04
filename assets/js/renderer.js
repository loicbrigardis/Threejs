import * as THREE from '../../vendors/three.min';

var renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0xD7D3D2);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.querySelector('#scene').appendChild(renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.85);


var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(4, 3, 12);
//dirLight.position.multiplyScalar(28);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;

export { renderer, ambientLight, dirLight };