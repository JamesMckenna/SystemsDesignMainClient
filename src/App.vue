<template>
  <site-nav />
  <site-header v-bind:is="'site-header'" v-if="header.render" />
  <router-view v-on:renderHeader="renderHeader" />
  <site-footer />
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import SiteHeader from '@/components/main-components/SiteHeader.vue'
import SiteNav from '@/components/main-components/SiteNav.vue'
import SiteFooter from '@/components/main-components/SiteFooter.vue'

const header = reactive({ render: true })
const title = "Systems Design DOT rocks"
function renderHeader (val: boolean): void {
  header.render = val
}

onMounted(() => {
  (document.getElementsByTagName("title")[0] as HTMLElement).innerHTML = title;
});
</script>

<style>
#app {
  margin: auto auto;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  #app {
    min-width: 20rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  #app {
    min-width: 40rem;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  #app {
    min-width: 45.5rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
  #app {
    width: 83rem;
  }
}
</style>
