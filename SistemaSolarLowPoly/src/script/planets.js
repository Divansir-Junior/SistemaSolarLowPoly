import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
const loader = new GLTFLoader();

export function createSun (scene) {
    loader.load('models/Sun.glb', (gltf) => {
        const sun = gltf.scene;
        sun.scale.set(200,200,200); // Tamanho do Sol
        sun.position.set(0,0,0); // Posição 
        scene.add(sun);

    });
}

export function loadPlanets(scene) {
    const loader = new GLTFLoader();
    const createdPlanets = {};

    const Planets = {
        Mercury: { path: "models/Mercury.glb", scale: 100, position: [300, 0, 0] },
        Venus:   { path: "models/Venus.glb", scale: 0.2, position: [400, 0, 0] },
        Earth:   { path: "models/Earth.glb", scale: 0.8, position: [900, 0, 0] },
        Mars:    { path: "models/Mars.glb", scale: 0.6, position: [10, 0, 0] },
        Jupiter: { path: "models/Jupiter.glb", scale: 1.5, position: [120, 0, 0] },
        Saturn:  { path: "models/Saturn.glb", scale: 1.2, position: [150, 0, 0] },
        Uranus:  { path: "models/Uranus.glb", scale: 1.0, position: [180, 0, 0] },
        Neptune: { path: "models/Neptune.glb", scale: 1.0, position: [210, 0, 0] },
    };

    function setupPlanet(name, config) {
        if (createdPlanets[name]) {
            console.log(`${name} já existe!`);
            return createdPlanets[name];
        }

        const pivot = new THREE.Object3D();
        scene.add(pivot);

        loader.load(config.path, (gltf) => {
            const planet = gltf.scene;
            planet.scale.set(config.scale, config.scale, config.scale);
            planet.position.set(...config.position);

            planet.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            pivot.add(planet);
        });

        createdPlanets[name] = pivot;
        return pivot;
    }

    // Criar todos os planetas de forma dinâmica
    Object.entries(Planets).forEach(([name, config]) => {
        setupPlanet(name, config);
    });

    return createdPlanets; // retorna os pivots criados caso precise manipular depois
}
