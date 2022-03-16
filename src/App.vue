<template>
  <site-nav />
  <site-header v-if="header.render" />
  <router-view v-slot="{ Component }" id="content-area" v-on:renderHeader="renderHeader">
    <transition name="routetrans" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
  <site-footer />
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue'
import SiteHeader from '@/components/main-components/SiteHeader.vue'
import SiteNav from '@/components/main-components/SiteNav.vue'
import SiteFooter from '@/components/main-components/SiteFooter.vue'

const title = 'Systems Design DOT rocks'
const header = reactive({ render: false })
const renderHeader = (val: boolean): void => {
  header.render = val
}

onBeforeMount(() => {
  (document.getElementsByTagName('title')[0] as HTMLElement).innerHTML = title
})
</script>

<style>
#app {
  position: relative;
  margin: auto auto;
  top:0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.renderd-content {
  position: relative;
  margin-top: 9rem;
}

.routetrans-enter-from {
  opacity: 0;
  transform: translateX(10rem);
}
.routetrans-enter-active {
  transition: all 0.5s ease-out;
}
.routetrans-leave-to {
  opacity: 0;
  transform: translateX(-10rem);
}
.routetrans-leave-active {
  transition: all 0.5s ease-in;
}

p {
  margin: auto auto !important;
  max-width: 45rem;
  text-indent: 3rem;
  padding: 1rem 1rem !important;
}

.images {
  display: block;
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: 2rem auto;
}

footer {
  position: relative;
  margin-top: 3rem !important;
  height: 10rem;
  padding: 2rem;
  background-color: var(--bgcolor3);
}
footer p {
  margin: auto auto;
  max-width: 45rem;
  text-align: center;
  padding: 1rem 1rem;
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
