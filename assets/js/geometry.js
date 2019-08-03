import * as THREE from '../../vendors/three.min';


const rand = (min, max) => min + Math.random() * (max - min);
//Coffee smoke particles
var geometry = new THREE.SphereBufferGeometry(0.05, 12, 12);
export var coffeeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
coffeeMaterial.transparent = true;
coffeeMaterial.opacity = 0.5;

export function createParticule() {
    var sphere = new THREE.Mesh(geometry, coffeeMaterial);
    var randSize = rand(0.5, 1);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.x += rand(0.05, 0.15);
    sphere.position.z += rand(0.10, 0.18);
    sphere.position.y += rand(0.1, 0.2);
    sphere.scale.set(randSize, randSize, randSize);
    sphere.param = {
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0.001, 0),
        acceleration: new THREE.Vector3(0, rand(0.0001, 0.0003), 0)
    }

    return sphere;
}

