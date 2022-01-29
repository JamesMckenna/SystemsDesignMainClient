<template>
  <div class="body-container">
    <h2>Contact Info</h2>
    <h3>NOT YET IMPLEMENTED</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineEmits } from 'vue'

const emits = defineEmits(['renderHeader'])

onMounted(() => {
  emits('renderHeader', true)
})
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
p {
  margin: 1rem auto;
  width: 45rem;
}
.body-container {
  margin-top: 1rem;
  width: 100%;
  min-height: 50vh;
}
</style>
