<template>
  <div class="col-24">
    <router-view class="full-height" style="height: 100vh" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
