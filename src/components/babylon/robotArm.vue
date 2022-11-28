/* eslint-disable no-unused-vars */
<template>
  <div class="body-container">
    <h2>3D in a Web Browser</h2>
    <h5 v-if="!loaded">
      On slower network speeds, it can take up to 5 minutes to load all assets.
      Once loaded and depending on what browser you use, most the assets should
      be cached in your browser.
    </h5>
    <canvas id="render-canvas"></canvas>
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted, defineEmits } from "vue";
const emits = defineEmits(["renderHeader"]);
const loaded = window.robotarm;
onBeforeMount(() => {
  if (window.robotarm) location.reload();
  emits("renderHeader", false);
  loadBabylonjs();
});

const loadRobArm = () => {
  const robot = document.createElement("script");
  robot.setAttribute("type", "text/javascript");
  robot.setAttribute("src", "robotArm/robotarm.js");
  robot.setAttribute("id", "robotarm");
  const can = document.getElementById("render-canvas");
  can.insertAdjacentElement("afterend", robot);
};

const loadBabylonjs = () => {
  const headtag = document.getElementsByTagName("head")[0];
  const babylonLibrary = document.createElement("script");
  babylonLibrary.setAttribute("id", "custom");
  babylonLibrary.setAttribute("src", "./js/babylon.custom.js");
  headtag.append(babylonLibrary);
  babylonLibrary.addEventListener("load", () => {
    loadRobArm();
  });
};

onUnmounted(() => {
  if (document.getElementById("robotarm")) {
    document.getElementById("robotarm").remove();
  }
  if (document.getElementById("custom")) {
    document.getElementById("custom").remove();
  }
});
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
.body-container {
  margin-top: 10rem;
  width: 100%;
}
</style>
