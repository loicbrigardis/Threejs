import * as THREE from '../../vendors/three.min';
import { GLTFLoader } from '../../vendors/GLTFLoader';
import TweenMax, { Power4 } from 'gsap/TweenMax';

import { onWindowResize } from './resize';
import { camera } from './camera';
import { renderer, light } from './renderer';
import { cube } from './geometry';

import screen from '../3d/screen.gltf';

const scene = new THREE.Scene();

//Grid Helpers
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Load a glTF resource
var loader = new GLTFLoader();
var ttt;
loader.load(
    // resource URL
    screen,
    // called when the resource is loaded
    function (gltf) {
        ttt = gltf.scene.children[0];
        scene.add(gltf.scene);
        TweenMax.from(ttt.position, 2, { x: 1, ease: Power4.easeInOut })
    },
    null,
    // called when loading has errors
    function (error) {
        console.log('An error happened ', error);
    }
);

scene.add(light);

//scene.add(cube);
var cpt = 0;
const animate = function () {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false);



animate();