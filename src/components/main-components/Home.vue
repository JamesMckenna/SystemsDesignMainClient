<template>
  <div class="home">
    <h2>{{ $props.msg }}</h2>
    <p>
      I have spent time researching, designing and coding a ‘base’ for
      enterprise software, and now the hard part comes: writing (and I use the
      term loosely), engaging content for visitors to this site. As I haven't
      taken the necessary steps for search engine optimization, I am guessing
      that you have come arrived via a LinkedIn link, or clicked the link on my
      resume.
    </p>
    <p>Please come on in, take alook around.</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({ msg: String });
</script>
