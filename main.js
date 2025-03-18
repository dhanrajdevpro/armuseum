import { loadGLTF } from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async (dinosaurType) => {
    document.querySelector(".container").style.display = "none"; // Hide all other contents

    // Create buttons for AR view
    const arButtonsContainer = document.createElement("div");
    arButtonsContainer.style.position = "absolute";
    arButtonsContainer.style.top = "10px";
    arButtonsContainer.style.right = "10px";
    arButtonsContainer.style.display = "flex";
    arButtonsContainer.style.flexDirection = "column";
    arButtonsContainer.style.gap = "10px";

    const audioButton = document.createElement("button");
    audioButton.textContent = "Audio";
    audioButton.className = "ar-view-btn";
    arButtonsContainer.appendChild(audioButton);

    const infoButton = document.createElement("button");
    infoButton.textContent = "Info";
    infoButton.className = "ar-view-btn";
    arButtonsContainer.appendChild(infoButton);

    const playAnimationButton = document.createElement("button");
    playAnimationButton.textContent = "Play Animation";
    playAnimationButton.className = "ar-view-btn";
    arButtonsContainer.appendChild(playAnimationButton);

    document.body.appendChild(arButtonsContainer);

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: `./mind-files/${dinosaurType}.mind`,
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const model = await loadGLTF(
      `./Dinosaurs-3d-models/${dinosaurType}/scene.gltf`
    );
    model.scene.scale.set(0.1, 0.1, 0.1);
    model.scene.position.set(0, -0.4, 0);
    scene.add(model.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  document.getElementById("launch-ankylosaurus-btn").onclick = () =>
    start("Ankylosaurus");
  document.getElementById("launch-brachiosaurus-btn").onclick = () =>
    start("Brachiosaurus");
  document.getElementById("launch-tyrannosaurus-btn").onclick = () =>
    start("Tyrannosaurus");
  document.getElementById("launch-triceratops-btn").onclick = () =>
    start("Triceratops");
  document.getElementById("launch-stegosaurus-btn").onclick = () =>
    start("Stegosaurus");
  document.getElementById("launch-spinosaurus-btn").onclick = () =>
    start("Spinosaurus");
  document.getElementById("launch-parasaurolophus-btn").onclick = () =>
    start("Parasaurolophus");
  document.getElementById("launch-gallimimus-btn").onclick = () =>
    start("Gallimimus");
  document.getElementById("launch-pachycephalosaurus-btn").onclick = () =>
    start("pachycephalosaurus");
  document.getElementById("launch-Pteranodon-btn").onclick = () =>
    start("Pteranodon");
});
