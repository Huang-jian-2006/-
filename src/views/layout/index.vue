<script setup>
import { RouterView } from "vue-router";
import Head from "./components/head.vue";
import Foot from "./components/foot.vue";
import Table from "./components/table.vue";
</script>
<template>
  <Table />
  <Head />
  <RouterView />
  <Foot />
</template>
<style scoped lang="scss">
</style>