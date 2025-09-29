import { createScene, createStars } from './scene.js';
import { createLights } from './lights.js';
import { animatePlanets, createSun, loadPlanets } from './planets.js';

function init() {
  const { scene, camera, renderer } = createScene();
  createLights(scene);
  createStars(scene);
  createSun(scene);
  loadPlanets(scene, camera);
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    animatePlanets();
  }
}

init();
