import { focusOnPlanet } from './planets.js';

export function setupPlanetButtons() {
  const buttons = document.querySelectorAll("[data-planet]");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const planet = btn.dataset.planet; // pega o nome
      focusOnPlanet(planet);             // manda a câmera ir até lá
    });
  });
}
