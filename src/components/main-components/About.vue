<template>
  <h2 class="move--down">{{ $props.msg }}</h2>
  <h3 class="move--down">
    <router-link to="/About/TheApp">The App!</router-link> |
    <router-link to="/About/ElevatorPitch">Elevator Pitch!</router-link>
  </h3>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({ msg: String });
</script>

<style>
.move--down {
  margin-bottom: 1rem;
}

.router-link-active,
.router-link-exact-active {
  color: black;
}
</style>
