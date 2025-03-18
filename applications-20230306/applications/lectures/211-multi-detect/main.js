import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import {loadGLTF} from "../../libs/loader.js";
// const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: '../../../../musicband.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const raccoon = await loadGLTF('../../../../Dinosaurs-3d-models/Ankylosaurus/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    const bear = await loadGLTF('../../assets/models/musicband-bear/scene.gltf');
    bear.scene.scale.set(0.1, 0.1, 0.1);
    bear.scene.position.set(0, -0.4, 0);

    const raccoonAnchor = mindarThree.addAnchor(0);
    raccoonAnchor.group.add(raccoon.scene);

    const bearAnchor = mindarThree.addAnchor(1);
    bearAnchor.group.add(bear.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
