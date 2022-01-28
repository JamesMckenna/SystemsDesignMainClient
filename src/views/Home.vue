<template>
  <div>
    <template v-if="path === '/'">
      <div class="home">
        <home msg="Welcome to my test / staging server" />
      </div>
    </template>

    <template v-if="path === '/About'">
      <about></about>
    </template>

    <template v-if="path === '/Contact'">
      <contact></contact>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component'
import { useRoute } from 'vue-router'
import { computed, ComputedRef, defineComponent } from 'vue'

import Home from '@/components/main-components/Home.vue'
import About from '@/components/main-components/About.vue'
import Contact from '@/components/main-components/Contact.vue'

export default defineComponent({

  props: ['renderHeader'],

  components: {
    home: Home,
    about: About,
    contact: Contact
  },

  setup (props) {
    const route = useRoute()
    const path: ComputedRef<string> = computed(() => route.path)
    return { route, path }
  },

  beforeRouteEnter (to: any, from: any, next: (arg0: (vm: any) => void) => void) {
    next((vm: { $emit: (arg0: string, arg1: boolean) => void; }) => {
      vm.$emit('renderHeader', true)
    })
  },

  beforeRouteLeave (to: any, from: any, next: () => void) {
    this.$emit('renderHeader', false)
    next()
  }
})
</script>
