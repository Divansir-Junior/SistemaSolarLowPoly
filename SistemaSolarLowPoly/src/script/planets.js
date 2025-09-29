import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Raycaster, Vector2 } from 'three';
import { showPlanetInfo } from './popup.js';

const loader = new GLTFLoader();
const raycaster = new Raycaster();
const mouse = new Vector2();

let sun = null;
let Mercury = null;
let Venus = null;
let Earth = null;
let Mars = null;
let Jupiter = null;
let Saturn = null;
let Uranus = null;
let Neptune = null;

// ------------------------ Sol ------------------------
export function createSun(scene) {
    if (sun) return;
    loader.load('models/Sun.glb', (gltf) => {
        sun = gltf.scene;
        sun.scale.set(200,200,200);
        sun.position.set(0,0,0);
        scene.add(sun);
    });
}

// -------------------- Animação -----------------------
export function animatePlanets() {
    if(sun) sun.rotation.y += 0.002;
    if(Mercury) Mercury.rotation.y += 0.01;
    if(Venus) Venus.rotation.y += 0.005;
    if(Earth) Earth.rotation.y += 0.02;
    if(Mars) Mars.rotation.y += 0.018;
    if(Jupiter) Jupiter.rotation.y += 0.04;
    if(Saturn) Saturn.rotation.y += 0.038;
    if(Uranus) Uranus.rotation.y += 0.03;
    if(Neptune) Neptune.rotation.y += 0.032;
}

// -------------------- Carregar planetas --------------------
export function loadPlanets(scene, camera) {
    const clickableObjects = [];

    const Planets = {
        Mercury: { path: "models/Mercury.glb", scale: 100, position: [300,0,0] },
        Venus:   { path: "models/Venus.glb", scale: 0.2, position: [400,0,0] },
        Earth:   { path: "models/Earth and Moon.glb", scale: 322, position: [570,0,0] },
        Mars:    { path: "models/Mars.glb", scale: 0.3, position: [715,0,0] },
        Jupiter: { path: "models/Jupiter.glb", scale: 250, position: [1900,0,0] },
        Saturn:  { path: "models/Saturn.glb", scale: 250, position: [1270,0,0] },
        Uranus:  { path: "models/Uranus.glb", scale: 1.0, position: [1780,0,0] },
        Neptune: { path: "models/Neptune.glb", scale: 1.0, position: [2100,0,0] }
    };

    Object.entries(Planets).forEach(([name, cfg]) => {
        const pivot = new THREE.Object3D();
        pivot.position.set(...cfg.position);
        scene.add(pivot);

        loader.load(cfg.path, (gltf) => {
            const planet = gltf.scene;
            planet.scale.set(cfg.scale, cfg.scale, cfg.scale);
            pivot.add(planet);

            // 🔑 marcar mesh do planeta
            planet.traverse(child => {
                if(child.isMesh){
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // 🌐 adicionar esfera invisível gigante para clique
            const clickSphere = new THREE.Mesh(
                new THREE.SphereGeometry(cfg.scale * 1.2, 16, 16),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            clickSphere.userData.planetName = name;
            pivot.add(clickSphere);
            clickableObjects.push(clickSphere);

            // salvar referência global
            if(name==="Mercury") Mercury = planet;
            if(name==="Venus") Venus = planet;
            if(name==="Earth") Earth = planet;
            if(name==="Mars") Mars = planet;
            if(name==="Jupiter") Jupiter = planet;
            if(name==="Saturn") Saturn = planet;
            if(name==="Uranus") Uranus = planet;
            if(name==="Neptune") Neptune = planet;
        });
    });

    // ---------------- Clique ----------------
    window.addEventListener('click', e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(clickableObjects, true);
        if(intersects.length > 0){
            const planetName = intersects[0].object.userData.planetName;
            if(planetName) showPlanetInfo(planetName);
        }
    });
}
