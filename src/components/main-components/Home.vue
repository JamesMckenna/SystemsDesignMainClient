<template>
  <div class="home">
    <h2>{{ $props.msg }}</h2>
    <p>
      I have spent time researching, designing and coding a ‘base’ for
      enterprise software, and now the hard part comes: writing, (and I use the
      term loosely) engaging, content for visitors to this site. As I haven't
      taken the necessary steps for search engine optimization, I am under the
      impression that visitors to this site have come here via LinkedIn or have
      followed a link on my resume.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({ msg: String });
</script>
