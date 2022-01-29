<template>
  <div>
    <template v-if="path === '/'">
      <div class="home">
        <Home msg="Welcome to my test / staging server" />
      </div>
    </template>

    <template v-if="path === '/About'">
      <About />
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
const props = defineProps({ renderHeader: String })
const emits = defineEmits(['renderHeader'])

onMounted(() => {
  emits('renderHeader', true)
})
</script>
