// ---------------- Sistema Solar com órbitas ----------------
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

let sun = null;
let Mercury = null, Venus = null, Earth = null, Mars = null, Jupiter = null, Saturn = null, Uranus = null, Neptune = null;
let MercuryPivot, VenusPivot, EarthPivot, MarsPivot, JupiterPivot, SaturnPivot, UranusPivot, NeptunePivot;

let cameraRef = null; // 🔑 Referência da câmera
let planetBeingFollowed = null; // 🔑 planeta que está sendo seguido pela câmera

// ---------------- Criar Sol ----------------
export function createSun(scene) {
  if (sun) return;
  loader.load('models/Sun.glb', (gltf) => {
    sun = gltf.scene;
    sun.scale.set(200, 200, 200);
    sun.position.set(0, 0, 0);
    scene.add(sun);
  });
}

// ---------------- Carregar Planetas ----------------
export function loadPlanets(scene, camera) {
  cameraRef = camera;

  const Planets = {
    Mercury: { path: "models/Mercury.glb", scale: 100, distance: 300, orbitSpeed: 0.02, rotSpeed: 0 },
    Venus:   { path: "models/Venus.glb", scale: 0.2, distance: 400, orbitSpeed: 0.015, rotSpeed: 0.005 },
    Earth:   { path: "models/Earth and Moon.glb", scale: 322, distance: 570, orbitSpeed: 0.0050, rotSpeed: 0 },
    Mars:    { path: "models/Mars.glb", scale: 0.3, distance: 715, orbitSpeed: 0.0020, rotSpeed: 0 },
    Jupiter: { path: "models/Jupiter.glb", scale: 250, distance: 1100, orbitSpeed: 0.0005, rotSpeed: 0 },
    Saturn:  { path: "models/Saturn.glb", scale: 250, distance: 1300, orbitSpeed: 0.0002, rotSpeed: 0 },
    Uranus:  { path: "models/Uranus.glb", scale: 300, distance: 1600, orbitSpeed: 0.0001, rotSpeed: 0 },
    Neptune: { path: "models/Neptune.glb", scale: 2.0, distance: 2100, orbitSpeed: 0.00010, rotSpeed: 0 }
  };

  Object.entries(Planets).forEach(([name, cfg]) => {
    const pivot = new THREE.Object3D();
    pivot.position.set(0, 0, 0);
    scene.add(pivot);

    loader.load(cfg.path, (gltf) => {
      const planet = gltf.scene;
      planet.scale.set(cfg.scale, cfg.scale, cfg.scale);
      planet.position.set(cfg.distance, 0, 0); // posição relativa ao pivot
      pivot.add(planet);

      // salvar referências
      if (name === "Mercury") { Mercury = planet; MercuryPivot = pivot; Mercury.orbitSpeed = cfg.orbitSpeed; Mercury.rotSpeed = cfg.rotSpeed; }
      if (name === "Venus")   { Venus = planet;   VenusPivot = pivot;   Venus.orbitSpeed = cfg.orbitSpeed;   Venus.rotSpeed = cfg.rotSpeed; }
      if (name === "Earth")   { Earth = planet;   EarthPivot = pivot;   Earth.orbitSpeed = cfg.orbitSpeed;   Earth.rotSpeed = cfg.rotSpeed; }
      if (name === "Mars")    { Mars = planet;    MarsPivot = pivot;    Mars.orbitSpeed = cfg.orbitSpeed;    Mars.rotSpeed = cfg.rotSpeed; }
      if (name === "Jupiter") { Jupiter = planet; JupiterPivot = pivot; Jupiter.orbitSpeed = cfg.orbitSpeed; Jupiter.rotSpeed = cfg.rotSpeed; }
      if (name === "Saturn")  { Saturn = planet;  SaturnPivot = pivot;  Saturn.orbitSpeed = cfg.orbitSpeed;  Saturn.rotSpeed = cfg.rotSpeed; }
      if (name === "Uranus")  { Uranus = planet;  UranusPivot = pivot;  Uranus.orbitSpeed = cfg.orbitSpeed;  Uranus.rotSpeed = cfg.rotSpeed; }
      if (name === "Neptune") { Neptune = planet; NeptunePivot = pivot; Neptune.orbitSpeed = cfg.orbitSpeed; Neptune.rotSpeed = cfg.rotSpeed; }
    });
  });
}

// ---------------- Animação ----------------
export function animatePlanets() {
  if (sun) sun.rotation.y += 0.002;

  // ÓRBITAS (pivot gira em torno do Sol)
  if (MercuryPivot) MercuryPivot.rotation.y += Mercury.orbitSpeed;
  if (VenusPivot)   VenusPivot.rotation.y   += Venus.orbitSpeed;
  if (EarthPivot)   EarthPivot.rotation.y   += Earth.orbitSpeed;
  if (MarsPivot)    MarsPivot.rotation.y    += Mars.orbitSpeed;
  if (JupiterPivot) JupiterPivot.rotation.y += Jupiter.orbitSpeed;
  if (SaturnPivot)  SaturnPivot.rotation.y  += Saturn.orbitSpeed;
  if (UranusPivot)  UranusPivot.rotation.y  += Uranus.orbitSpeed;
  if (NeptunePivot) NeptunePivot.rotation.y += Neptune.orbitSpeed;

  // ROTAÇÃO PRÓPRIA (planeta girando no eixo)
  if (Mercury) Mercury.rotation.y += Mercury.rotSpeed;
  if (Venus)   Venus.rotation.y   += Venus.rotSpeed;
  if (Earth)   Earth.rotation.y   += Earth.rotSpeed;
  if (Mars)    Mars.rotation.y    += Mars.rotSpeed;
  if (Jupiter) Jupiter.rotation.y += Jupiter.rotSpeed;
  if (Saturn)  Saturn.rotation.y  += Saturn.rotSpeed;
  if (Uranus)  Uranus.rotation.y  += Uranus.rotSpeed;
  if (Neptune) Neptune.rotation.y += Neptune.rotSpeed;

  // 📌 Se a câmera está seguindo um planeta, atualiza posição
  if (planetBeingFollowed && cameraRef) {
    const targetPos = new THREE.Vector3();
    planetBeingFollowed.getWorldPosition(targetPos);

    let offset = 200;
    if (planetBeingFollowed === Jupiter || planetBeingFollowed === Saturn) offset = 600;
    if (planetBeingFollowed === Uranus  || planetBeingFollowed === Neptune) offset = 400;

    cameraRef.position.lerp(
      targetPos.clone().add(new THREE.Vector3(offset, offset * 0.5, offset)),
      0.05 // suavidade
    );

    cameraRef.lookAt(targetPos);
  }
}

// ---------------- Focar câmera em planeta ----------------
export function focusOnPlanet(name) {
  if (!cameraRef) return;

  const map = { Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune };
  const planet = map[name];
  if (!planet) return;

  // agora a câmera vai seguir o planeta continuamente
  planetBeingFollowed = planet;
}

// ---------------- Resetar câmera ----------------
export function resetCamera() {
  planetBeingFollowed = null;
  if (!cameraRef) return;

  // volta para uma visão geral (vista de cima)
  cameraRef.position.set(950, 500, 950);
  cameraRef.lookAt(0, 0, 0);
}
