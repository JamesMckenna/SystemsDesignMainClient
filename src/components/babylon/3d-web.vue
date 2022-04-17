<template>
  <div class="body-container">
    <h2>A WebGL, 3D Game Engine Running In A Browser</h2>
    <h3>PLEASE NOTE:</h3>
    <h4>
      The web 3d pages may load on smaller mobile devices, but they are built
      for larger screen sizes in mind.
    </h4>
    <hr class="hr-tag-2" />
    <div class="highlight-p-tag">
      <p>
        The 3D models, textures and animations in this portfolio were built
        using the
        <a
          href="https://www.blender.org/"
          class="a-tag-style-two"
          target="_blank"
          rel="noopener noreferrer"
          >Blender3D Software Suite</a
        >, and the WebGL engine used is the
        <a
          href="https://www.babylonjs.com/"
          class="a-tag-style-two"
          target="_blank"
          rel="noopener noreferrer"
          >BabylonJs WebGL Library</a
        >.
      </p>
      <h4>VR/AR/MR/XR support is being worked on.</h4>
      <h6>
        If the 3D examples do not start loading when navigating to their respect
        pages, try refreshing the page - depending on network traffic, the
        BabylonJs Engine could take a few seconds to download and render the 3D
        assets to the browser.
      </h6>
    </div>
    <hr class="hr-tag-2" />
    <div class="highlight-p-tag">
      <p>
        <router-link to="/rose" class="a-tag-style-two">Rose</router-link> A
        simple 3D model used to experiment with the BabylonJs 3D Game Engine.
        Baisc upload and rendering. Left-Click and Drag to move and rotate
        around the model, scroll wheel to zoom.
      </p>
    </div>
    <hr class="hr-tag-2" />
    <div class="highlight-p-tag">
      <p>
        <router-link to="/gears" class="a-tag-style-two">Gears</router-link> A
        simple 3D model used to experiment with the BabylonJs 3D Game Engine.
        How to run a baisc keyframe animtaion. Left-Click and Drag to move and
        rotate around the model, scroll wheel to zoom.
      </p>
    </div>
    <hr class="hr-tag-2" />
    <div class="highlight-p-tag">
      <p>
        <router-link to="/robot-arm" class="a-tag-style-two"
          >Robot Arm</router-link
        >
        A more complex 3D model, rig and textures used to experiment with the
        BabylonJs 3D Game Engine.
      </p>
      <ol>
        <li>Rigging</li>
        <li>UI layout and controls</li>
        <li>BabylonJs' physically based rendering system</li>
        <li>Starting and stopping keyframe animations</li>
        <li>Experimenting with load times for different texture sizes</li>
        <li>
          Gage the difference in baked textures with image based lighting from
          Blender 3D to the game engine render system
        </li>
      </ol>
      <p>
        Mouse dragging has been disabled for this example. The controls now have
        basic UI buttons and keyboard hotkeys. The buttons will flash green when
        executing an animation. If the buttons do not flash green, the animation
        has ended.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from "vue";
import {
  showBackgroundObserverOptions,
  buildShowBackgroundObserverOptions,
  showBackgroundIntersectionObserver,
} from "@/assets/js/helper-functions";

let pTagBackgroundObserver: IntersectionObserver;
let windowWidth: number;
let windowHeight: number;
let options: showBackgroundObserverOptions;

const emits = defineEmits(["renderHeader"]);
onBeforeMount(() => {
  emits("renderHeader", true);
});

onMounted(() => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  options = buildShowBackgroundObserverOptions(windowWidth, windowHeight);
  pTagBackgroundObserver = showBackgroundIntersectionObserver(
    "highlight-p-tag",
    "highlight-p-tag__observer",
    options
  );
});
onUnmounted(() => {
  pTagBackgroundObserver.disconnect();
});

onUpdated(() => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  options = buildShowBackgroundObserverOptions(windowWidth, windowHeight);
  pTagBackgroundObserver = showBackgroundIntersectionObserver(
    "highlight-p-tag",
    "highlight-p-tag__observer",
    options
  );
});
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

ol {
  list-style-type: initial;
  position: relative;
  display: block;
  left: 2rem;
  margin: auto auto;
  max-width: 45em;
}

li {
  display: list-item;
}

h6 {
  margin: 2rem auto;
  max-width: 45rem;
  line-height: 1.5rem;
  text-decoration: none;
}
.body-container {
  margin-top: 1rem;
  width: 100%;
  min-height: 100vh;
}
</style>
