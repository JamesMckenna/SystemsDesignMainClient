<template>
  <div class="body-container">
    <h2>Simple 3D Model in a Web Browser</h2>
    <canvas id="render-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { Engine, Scene, SceneLoader, Color4 } from "babylonjs";
let canvas: HTMLCanvasElement;
let engine: Engine;
let scene: Scene;
onMounted(() => {
  canvas = document.getElementById("render-canvas")! as HTMLCanvasElement;
  engine = new Engine(canvas);
  scene = new Scene(engine);

  SceneLoader.Append("", "rose/rose.babylon", scene);
  scene.executeWhenReady(() => {
    scene.clearColor = new Color4(0, 0, 0, 0.00001);
    scene.activeCamera!.attachControl(canvas);
    engine.runRenderLoop(() => {
      scene.render();
    });
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
});
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
canvas {
  width: 100%;
  height: 90vh;
}
.body-container {
  margin-top: 6rem;
  width: 100%;
  height: 100vh;
}
</style>
