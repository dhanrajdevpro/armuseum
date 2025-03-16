import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { mockWithVideo } from "./libs/camera-mock.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    mockWithVideo("./mock-camera-video.mp4");

    // initialize MindAR
    const mindarThree = new MindARThree({
      container: document.querySelector("#my-ar-container"),
      imageTargetSrc: "./trex-draw.mind",
    });
    const { renderer, scene, camera } = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // create anchor
    const anchor = mindarThree.addAnchor(0);

    const gltf = await loadGLTF("./velociraptor/scene.gltf");
    gltf.scene.scale.set(1, 1, 1);
    // gltf.scene.position.set(0, -0.4, 0);
    anchor.group.add(gltf.scene);

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    const clock = new THREE.Clock();

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  };
  start();
});
