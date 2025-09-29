// --- Imports ---
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

let sun = null;

// --- Criar o Sol ---
export function createSun(scene) {
    if (sun) return;

    loader.load('models/Sun.glb', (gltf) => {
        sun = gltf.scene; // aqui não usa "const", senão sobrescreve a variável global
        sun.scale.set(200, 200, 200); 
        sun.position.set(0, 0, 0);
        scene.add(sun);
    });
}

export function animatePlanets() {
    if (sun) sun.rotation.y += 0.002;
}

// --- Criar os planetas ---
export function loadPlanets(scene) {
    const createdPlanets = {};

    const Planets = {
        Mercury: { path: "models/Mercury.glb", scale: 100, position: [300, 0, 0] },
        Venus:   { path: "models/Venus.glb", scale: 0.2, position: [400, 0, 0] },
        Earth:   { path: "models/Earth and Moon.glb", scale: 322, position: [570, 0, 0] },
        Mars:    { path: "models/Mars.glb", scale: 0.3, position: [715, 0, 0] },
        Jupiter: { path: "models/Jupiter.glb", scale: 250, position: [900, 0, 0] },
        Saturn:  { path: "models/Saturn.glb", scale: 250, position: [1270, 0, 0] },
        Uranus:  { path: "models/Uranus.glb", scale: 1.0, position: [1780, 0, 0] },
        Neptune: { path: "models/Neptune.glb", scale: 1.0, position: [2100, 0, 0] },
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

    // Cria todos os planetas em loop
    Object.entries(Planets).forEach(([name, config]) => {
        setupPlanet(name, config);
    });

    return createdPlanets;
}
