import { createScene, createStars } from './scene.js';
import { createLights } from './lights.js';

function init() {
  const { scene, camera, renderer } = createScene();
  createLights(scene);
  createStars(scene);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

init();
