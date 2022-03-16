<template>
  <div>
    <template v-if="path === '/'">
      <Home class="home" msg="You have found my playground" />
    </template>

    <template v-if="path === '/About'">
      <About msg="About this App!!" />
    </template>

    <template v-if="path === '/Contact'">
      <Contact />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { RouteLocationNormalized, useRoute } from 'vue-router'
import { computed, ComputedRef, onMounted, defineProps, defineEmits } from 'vue'

import Home from '@/components/main-components/Home.vue'
import About from '@/components/main-components/About.vue'
import Contact from '@/components/main-components/Contact.vue'

const route: RouteLocationNormalized = useRoute()
const path: ComputedRef<string> = computed(() => route.path)
defineProps({ msg: String })

const emits = defineEmits(['renderHeader'])

onMounted(() => {
  if (route.path === '/') {
    emits('renderHeader', true)
  } else if (route.path === '/About') {
    emits('renderHeader', false)
    document.getElementById('content-area')!.classList.add('renderd-content')
  } else {
    emits('renderHeader', true)
  }
})
</script>
