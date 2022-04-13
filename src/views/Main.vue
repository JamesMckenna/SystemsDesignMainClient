<template>
  <div>
    <template v-if="path === '/'">
      <Home class="home" msg="You have found my playground" />
    </template>

    <template v-if="matchesAbout">
      <About msg="About" />
    </template>

    <template v-if="path === '/Contact'">
      <Contact />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { RouteLocationNormalized, useRoute } from "vue-router";
import {
  computed,
  ComputedRef,
  ref,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import Home from "@/components/main-components/Home.vue";
import About from "@/components/main-components/About.vue";
import Contact from "@/components/main-components/Contact.vue";

const route: RouteLocationNormalized = useRoute();
const path: ComputedRef<string> = computed(() => route.path);
defineProps({ msg: String });

const emits = defineEmits(["renderHeader"]);
let matchesAbout: boolean = ref(false);

const matchAboutRoute = (): boolean => {
  const regex = new RegExp("/About");
  return regex.test(route.path);
};

onMounted(() => {
  matchesAbout.value = matchAboutRoute();

  if (route.path === "/") {
    emits("renderHeader", true);
  } else if (matchesAbout.value) {
    emits("renderHeader", false);
    document.getElementById("content-area")!.classList.add("renderd-content");
  } else {
    emits("renderHeader", true);
  }
});
</script>
