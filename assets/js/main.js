import * as THREE from '../../vendors/three.min';
import { GLTFLoader } from '../../vendors/GLTFLoader';
import TweenMax, { Power4, TimelineMax } from 'gsap/TweenMax';

import { onWindowResize } from './resize';
import { camera } from './camera';
import { renderer, light } from './renderer';

import screen from '../3d/screen.gltf';
import mainScene from '../3d/mainScene.glb';


const scene = new THREE.Scene();

//Grid Helpers
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//Fn Helpers
function item(gltf, nom) {
    return gltf.scene.children.filter(item => item.name === nom)[0];
}

// Load a glTF resource
var loader = new GLTFLoader();
loader.load(
    mainScene,
    function (gltf) {
        console.log(gltf);

        scene.add(gltf.scene);

        let globalScene = gltf.scene,
            casque = item(gltf, 'casque'),
            lampe = item(gltf, 'lampe'),
            pot2 = item(gltf, 'pot2'),
            pot = item(gltf, 'pot'),
            mug = item(gltf, 'mug'),
            clavier = item(gltf, 'clavier'),
            editeur = item(gltf, 'editeur'),
            carte = item(gltf, 'carte'),
            popup = item(gltf, 'popup'),
            searchbar = item(gltf, 'searchbar'),
            sidebar = item(gltf, 'sidebar'),
            screen = item(gltf, 'screen');

        console.log(popup.position)

        const tl = new TimelineMax();
        tl
            .set(globalScene.position, { y: '+=0.5' })
            .set([casque, popup, lampe, carte, editeur, sidebar, searchbar], { visible: false })
            .add('screen')
            .from(screen.position, 1, { y: 5, ease: Power4.easeOut })
            .from(screen.rotation, 1, { z: -0.5, ease: Power4.easeOut }, "-=1")
            //SearchBar
            .add('searchbar')
            .set(searchbar, { visible: true }, 'screen+=0.5')
            .from(searchbar.position, 1, { z: -0.5, ease: Power4.easeOut }, 'screen+=0.5')
            //Sidebar
            .add('sidebar')
            .set(sidebar.position, { z: -1 }, 'searchbar+=0.5')
            .set(sidebar, { visible: true }, 'searchbar+=0.5')
            .to(sidebar.position, 1, { x: -2.4, y: -0.223, z: 0.1, ease: Power4.easeOut }, 'searchbar+=0.5')
            .from(sidebar.rotation, 1, { x: 4, y: 4, ease: Power4.easeOut }, 'searchbar+=0.5')
            .to(sidebar.position, 1, { x: -0.988, y: -0.223, z: 0.077, ease: Power4.easeOut })
            //Editeur
            .add('editeur')
            .set(editeur.position, { z: -1 }, 'searchbar+=0.9')
            .set(editeur, { visible: true }, 'searchbar+=0.9')
            .to(editeur.position, 1, { x: 2.8, y: -0.184, z: 0.1, ease: Power4.easeOut }, 'searchbar+=0.9')
            .from(editeur.rotation, 1, { x: 3.15, y: 1, z: 3.15, ease: Power4.easeOut }, 'searchbar+=0.9')
            .to(editeur.position, 1, { x: 0.656, y: -0.184, z: 0.079, ease: Power4.easeOut }, '-=0.6')
            //PopUp
            .add('popup', 'sidebar+=1.9')
            .set(popup, { visible: true }, 'sidebar+=1.9')
            .from(popup.position, 1, { x: -1.255, y: 0.47, ease: Power4.easeOut }, 'sidebar+=1.9')
            .from(popup.scale, 0.8, { x: 0, y: 0, ease: Power2.easeOut }, 'popup')
            .from(popup.rotation, 0.8, { x: 2, y: 1, ease: Power2.easeOut }, 'popup')
            //Card
            .add('carte', 'popup+=0.2')
            .set(carte, { visible: true }, 'popup+=0.2')
            .set(carte.position, { x: 0.472, y: -0.216, z: -3, ease: Power4.easeOut }, 'popup+=0.2')
            .to(carte.position, 1, { x: 0.472, y: 1.45, z: 0.36, ease: Power4.easeOut }, 'popup+=0.2')
            .from(carte.rotation, 1, { x: -5.1, y: -0.1, z: -0.01, ease: Power4.easeOut }, 'carte')
            .to(carte.position, 1, { x: 0.472, y: -0.216, z: 0.46, ease: Power4.easeOut })



        console.log(editeur.rotation)
        //tl.seek('popup')

    },
    null,
    function (error) {
        console.log('An error happened ', error);
    }
);

scene.add(light);

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false);



animate();