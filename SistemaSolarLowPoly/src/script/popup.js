import { focusOnPlanet } from './planets.js';
import * as THREE from 'three';
export function setupPlanetButtons() {
  const buttons = document.querySelectorAll("[data-planet]");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const planet = btn.dataset.planet; // pega o nome
      focusOnPlanet(planet);             // manda a câmera ir até lá
    });
  });
}

// ---------------- Toggle menu  ----------------
export function setupMenuToggle() {
  const menuIcon = document.getElementById("toggleMenu");
  const menu = document.querySelector(".container");
  let menuVisible = false;

  menuIcon.addEventListener("click", () => {
    menuVisible = !menuVisible;

    if (menuVisible) {
      menu.classList.add("show");
      menu.style.display = menuVisible ? "flex" : "none";
    } else {
      menu.classList.remove("show");
    }
  });
}
