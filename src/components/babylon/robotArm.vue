/* eslint-disable no-unused-vars */
<template>
  <div class="body-container">
    <h2>3D in a Web Browser</h2>
    <canvas id="render-canvas"></canvas>

  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, onUnmounted, defineEmits } from "vue";
const emits = defineEmits(['renderHeader'])
onBeforeMount(() => {
  emits('renderHeader', true)
  //older project, use older BABYLON version
  if(!document.getElementById("custom")){
    const headtag = document.getElementsByTagName("head")[0];
    const babylonLibrary = document.createElement("script");
    babylonLibrary.setAttribute("id", "custom");
    babylonLibrary.setAttribute("src", "./babylon.custom.js");
    headtag.append(babylonLibrary);
  }
});
onMounted(() => {
  if (typeof RobotArm === "undefined") {
    //older project, use older BABYLON version - bone parenting isn't the same
    if(!window.BABYLON){
      setTimeout(() => {
        const robot = document.createElement("script");
        robot.setAttribute("type", "text/javascript");
        robot.setAttribute("src", "./robotarm.js");
        robot.setAttribute("id", "robotarm");
        const can = document.getElementById("render-canvas");
        can.insertAdjacentElement("afterend", robot);
      }, 1000);
    }
  } else {
    //Uncaught SyntaxError: redeclaration of let RobotArm, so hack-it and hard reload page
    window.location.reload();
  }
});

onUnmounted(() => {
  document.getElementById("robotarm").remove();
  document.getElementById("custom").remove();
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
.body-container {
  margin-top: 6rem;
  width: 100%;
}
</style>
