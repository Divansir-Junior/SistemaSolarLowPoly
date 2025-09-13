import * as THREE from 'three';

export function createLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffffaa, 3, 200);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  return { ambientLight, sunLight };
 
}

