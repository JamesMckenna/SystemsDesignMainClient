<template>
  <div class="body-container">
    <h2>Animated 3D Worm Gear and Worm Wheels</h2>
    <canvas id="render-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { Engine, Scene, SceneLoader, Color4 } from "babylonjs";
let canvas: HTMLCanvasElement;
let engine: Engine;
let scene: Scene;

const emits = defineEmits(["renderHeader"]);
onBeforeMount(() => {
  emits("renderHeader", false);
});

onMounted(() => {
  canvas = document.getElementById("render-canvas")! as HTMLCanvasElement;
  engine = new Engine(canvas, true);
  scene = new Scene(engine);

  SceneLoader.Append("", "gears/gears.babylon", scene);
  scene.executeWhenReady(() => {
    scene.clearColor = new Color4(0, 0, 0, 0.0000001);
    scene.activeCamera!.attachControl(canvas);

    engine.runRenderLoop(() => {
      scene.render();
    });
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
});

onBeforeUnmount(() => {
  canvas.remove();
  scene.dispose();
  engine.stopRenderLoop();
  engine.dispose();
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
  margin-top: 10rem;
  width: 100%;
  height: 100vh;
}
</style>
