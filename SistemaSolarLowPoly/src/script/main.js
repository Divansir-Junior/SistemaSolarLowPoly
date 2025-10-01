import { createScene, createStars } from './scene.js';
import { createLights } from './lights.js';
import { animatePlanets, createSun, loadPlanets } from './planets.js';
import { setupPlanetButtons } from './popup.js';
import { setupMenuToggle } from './popup.js';

setupMenuToggle(); // 🔑 habilita o menu toggle
function init() {
  const { scene, camera, renderer } = createScene();
  createLights(scene);
  createStars(scene);
  createSun(scene);
  loadPlanets(scene, camera);

  setupPlanetButtons(); // 🔑 habilita os cliques nos H1

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
