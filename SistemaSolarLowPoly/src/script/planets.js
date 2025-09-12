import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function createSun (scene) {
    loader.load('src/assets/models/Sun.glb', (gltf) => {
        const sun = gltf.scene;
        sun.scale.set(20,20,20); // Tamanho do Sol
        sun.position.set(0,0,0); // Posição 
        scene.add(sun);

    });
}

export function loadPlanets( scene ) {
    const createdPlanet = {};
    const planetsData =[]
}