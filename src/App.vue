<script setup>
import { RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
import { onMounted } from "vue";
const { getbannerData } = useCounterStore();
onMounted(() => {
  getbannerData();
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
