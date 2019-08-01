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
//scene.add(gridHelper);

//Fn Helpers
function item(gltf, nom) {
    return gltf.scene.children.filter(item => item.name === nom)[0];
}

/* Retourne un Int aléatoire - max en param */
function getRandomInt(max, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load a glTF resource
var loader = new GLTFLoader();
loader.load(
    mainScene,
    function (gltf) {

        scene.add(gltf.scene);

        const globalScene = gltf.scene,
            casque = item(gltf, 'casque'),
            lampe = item(gltf, 'lampe'),
            lampeClone = { position: { ...lampe.position }, rotation: { ...lampe.rotation }, scale: { ...lampe.scale } },
            pot2 = item(gltf, 'pot2'),
            pot2Clone = { position: { ...pot2.position }, rotation: { ...pot2.rotation }, scale: { ...pot2.scale } },
            pot = item(gltf, 'pot'),
            potClone = { position: { ...pot.position }, rotation: { ...pot.rotation }, scale: { ...pot.scale } },
            mug = item(gltf, 'mug'),
            mugClone = { position: { ...mug.position }, rotation: { ...mug.rotation }, scale: { ...mug.scale } },
            clavier = item(gltf, 'clavier'),
            clavierClone = { position: { ...clavier.position }, rotation: { ...clavier.rotation }, scale: { ...clavier.scale } },
            carte = item(gltf, 'carte'),
            carteClone = { position: { ...carte.position }, rotation: { ...carte.rotation }, scale: { ...carte.scale } },
            popup = item(gltf, 'popup'),
            popupClone = { position: { ...popup.position }, rotation: { ...popup.rotation }, scale: { ...popup.scale } },
            searchbar = item(gltf, 'searchbar'),
            searchbarClone = { position: { ...searchbar.position }, rotation: { ...searchbar.rotation }, scale: { ...searchbar.scale } },
            editeur = item(gltf, 'editeur'),
            editeurClone = { position: { ...editeur.position }, rotation: { ...editeur.rotation }, scale: { ...editeur.scale } },
            sidebar = item(gltf, 'sidebar'),
            sidebarClone = { position: { ...sidebar.position }, rotation: { ...sidebar.rotation }, scale: { ...sidebar.scale } },
            screen = item(gltf, 'screen'),
            screenClone = { position: { ...screen.position }, rotation: { ...screen.rotation }, scale: { ...screen.scale } };


        const touchesTl = new TimelineMax();
        clavier.children[0].children.forEach(touche => {
            let rand = getRandomInt(6, 3);
            touchesTl
                .from(touche.position, rand, { x: getRandomInt(6, -6), y: getRandomInt(6, 0), z: getRandomInt(6, 0), ease: Power2.easeOut }, 0)
                .from(touche.rotation, rand, { x: getRandomInt(12, -12), y: getRandomInt(12, -12), z: getRandomInt(12, -12), ease: Power2.easeOut }, 0)
        })

        const clavierTl = new TimelineMax();
        clavierTl
            .set(clavier, { visible: true })
            .from(clavier.position, 2, { y: -0.2, z: 3.5 })
            .from(clavier.rotation, 1, { y: -0.2, z: 3.5 }, '-=2')
            .add(touchesTl, '-=2')

        const potTl = new TimelineMax();
        potTl
            .staggerFrom([pot.children[0].scale, pot.children[1].scale, pot.children[2].scale], 1.3, { x: 0, y: 0, z: 0, ease: Power4.easeInOut }, 0.4);

        const pot2Tl = new TimelineMax();
        pot2Tl
            .staggerFrom([pot2.children[0].scale, pot2.children[1].scale], 1.3, { x: 0, y: 0, z: 0, ease: Power4.easeInOut }, 0.4);

        const mugTl = new TimelineMax({ repeat: -1 });
        mugTl
            .to(mug.children[1].position, 3, { x: -0.015, y: -0.09, z: -0.021, delay: getRandomInt(8, 4) })
            .to(mug.position, 0.8, { x: 6, ease: Power2.easeOut })
            .to(mug.position, 0.8, { x: 1.36, ease: Power2.easeOut })
            .to(mug.children[1].position, 0, { x: 0.061, y: 0.104, z: 0.087 }, '-=1')


        const mainTl = new TimelineMax();
        const noiseSpeed = 0.01;
        mainTl
            .set(globalScene.position, { y: '+=0.5' })
            .set([casque, clavier, popup, carte, editeur, sidebar, searchbar], { visible: false })
            .add('screen')
            .from(screen.position, 1, { y: 5, ease: Power4.easeOut })
            .from(screen.rotation, 1, { z: -0.5, ease: Power4.easeOut }, "-=1")
            /*Noise*/
            .to(screen.position, 0.8, { y: screenClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(screen.rotation, 0.8, { z: screenClone.rotation._z - noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //SearchBar
            .add('searchbar')
            .set(searchbar, { visible: true }, 'screen+=0.5')
            .from(searchbar.position, 1, { z: -0.5, ease: Power4.easeOut }, 'screen+=0.5')
            /*Noise*/
            .to(searchbar.position, 0.8, { y: searchbarClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(searchbar.rotation, 0.8, { z: searchbarClone.rotation._z + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //Sidebar
            .add('sidebar')
            .set(sidebar.position, { z: -1 }, 'searchbar+=0.5')
            .set(sidebar, { visible: true }, 'searchbar+=0.5')
            .to(sidebar.position, 1, { x: -2.4, y: -0.223, z: 0.1, ease: Power4.easeOut }, 'searchbar+=0.5')
            .from(sidebar.rotation, 1, { x: 4, y: 4, ease: Power4.easeOut }, 'searchbar+=0.5')
            .to(sidebar.position, 1, { x: -0.988, y: -0.223, z: 0.077, ease: Power4.easeOut })
            /*Noise*/
            .to(sidebar.position, 0.8, { y: sidebarClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(sidebar.rotation, 0.8, { z: sidebarClone.rotation._z + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //Editeur
            .add('editeur')
            .set(editeur.position, { z: -1 }, 'searchbar+=1')
            .set(editeur, { visible: true }, 'searchbar+=1')
            .to(editeur.position, 1, { x: 2.8, y: -0.184, z: 0.1, ease: Power4.easeOut }, 'searchbar+=1')
            .from(editeur.rotation, 1, { x: 3.15, y: 1, z: 3.15, ease: Power4.easeOut }, 'searchbar+=1')
            .to(editeur.position, 1, { x: 0.656, y: -0.184, z: 0.079, ease: Power4.easeOut })
            /*Noise*/
            .to(editeur.position, 0.8, { y: editeurClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(editeur.rotation, 0.8, { z: editeurClone.rotation._z - noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //PopUp
            .add('popup', 'sidebar+=2.3')
            .set(popup, { visible: true }, 'sidebar+=2.3')
            .from(popup.position, 1, { x: -1.255, y: 0.47, ease: Power4.easeOut }, 'sidebar+=2.3')
            .from(popup.scale, 0.8, { x: 0, y: 0, ease: Power2.easeOut }, 'popup')
            .from(popup.rotation, 0.8, { x: 2, y: 1, ease: Power2.easeOut }, 'popup')
            /*Noise*/
            .to(popup.position, 0.8, { y: popupClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(popup.rotation, 0.8, { z: popupClone.rotation._z + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //Card
            .add('carte', 'popup+=0.2')
            .set(carte, { visible: true }, 'popup+=0.2')
            .set(carte.position, { x: 0.472, y: -0.216, z: -3, ease: Power4.easeOut }, 'popup+=0.2')
            .to(carte.position, 1, { x: 0.472, y: 1.45, z: 0.36, ease: Power4.easeOut }, 'popup+=0.2')
            .from(carte.rotation, 1, { x: -5.1, y: -0.1, z: -0.01, ease: Power4.easeOut }, 'carte')
            .to(carte.position, 1, { x: 0.472, y: -0.216, z: 0.46, ease: Power4.easeOut })
            /*Noise*/
            .to(carte.position, 0.8, { y: carteClone.position.y + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(carte.rotation, 0.8, { z: carteClone.rotation._z + noiseSpeed, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=0.8')
            //Clavier
            .add(clavierTl, 'clavier', '-=1')
            /*Noise*/
            .to(clavier.position, 0.8, { y: clavierClone.position.y + noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            .to(clavier.rotation, 0.8, { x: clavierClone.rotation._x - noiseSpeed * 2, z: clavierClone.rotation._z - noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            //Pot1
            .add('pot')
            .from(pot.position, 0.8, { x: -6, ease: Power2.easeOut })
            .from(pot.rotation, 0.8, { z: 2.6, y: -0.6, ease: Power2.easeOut }, '-=0.8')
            /*Noise*/
            .to(pot.position, 2, { y: potClone.position.y + noiseSpeed * 8, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(pot.rotation, 2, { y: potClone.rotation._y + noiseSpeed * 2, x: potClone.rotation._x + noiseSpeed * 8, z: potClone.rotation._z - noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            .add(potTl, '-=3.5')
            //Pot2
            .add('pot2', '-=1')
            .from(pot2.position, 0.8, { x: 6, ease: Power2.easeOut }, '-=1')
            .from(pot2.rotation, 0.8, { z: 2.6, y: -0.6, ease: Power2.easeOut }, '-=1')
            /*Noise*/
            .to(pot2.position, 2, { y: pot2Clone.position.y + noiseSpeed * 8, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(pot2.rotation, 2, { y: pot2Clone.rotation._y - noiseSpeed * 2, x: pot2Clone.rotation._x + noiseSpeed * 8, z: pot2Clone.rotation._z - noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            .add(pot2Tl, '-=3')
            //Lampe
            .add('lampe')
            .from(lampe.position, 1, { x: -6 })
            .from(lampe.rotation, 1, { y: 2 }, '-=1')
            /*Noise*/
            .to(lampe.position, 2, { y: lampeClone.position.y + noiseSpeed * 4, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(lampe.rotation, 2, { y: lampeClone.rotation._y + noiseSpeed * 2, x: lampeClone.rotation._x + noiseSpeed * 2, z: lampeClone.rotation._z - noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            //mug
            .from(mug.position, 0.8, { x: 6, ease: Power2.easeOut }, '-=2')
            .from(mug.rotation, 0.8, { y: 3, ease: Power2.easeOut }, '-=0.8')
            /*Noise*/
            .to(mug.position, 2, { y: mugClone.position.y + noiseSpeed * 8, yoyo: true, repeat: -1, ease: Power2.easeInOut })
            .to(mug.rotation, 2, { y: mugClone.rotation._y - noiseSpeed * 2, x: mugClone.rotation._x + noiseSpeed * 8, z: mugClone.rotation._z - noiseSpeed * 2, yoyo: true, repeat: -1, ease: Power2.easeInOut }, '-=2')
            .add(mugTl)

        //mainTl.seek('lampe')
        //mainTl.timeScale(1.2)

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