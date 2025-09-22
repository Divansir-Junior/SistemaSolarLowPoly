import * as THREE from 'three';

export function createLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const fillLight = new THREE.DirectionalLight(0x88aaff, 15);
  fillLight.position.set(-500, 300, 500);
  scene.add(fillLight);


  return { ambientLight ,fillLight};
 
}

