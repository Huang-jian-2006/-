<script setup>
import Title from "@/components/title.vue";
import { hot } from "@/api/home";
import { onBeforeMount, ref } from "vue";
import Hotcard from "@/components/hotcard.vue";
const hotmessage = ref();
onBeforeMount(async () => {
  hotmessage.value = (await hot()).data.result;
});
</script>
<template>
  <div class="hot">
    <Title :bigtitle="`人气推荐`" :smalltitle="[`人气爆款`, `不容错过`]" />
    <body class="body">
      <Hotcard
        v-for="item in hotmessage"
        :key="item.id"
        :picture="item.picture"
        :title="item.title"
        :alt="item.alt"
      />
    </body>
  </div>
</template>
<style scoped lang="scss">
.hot {
  width: 1240px;
  margin: 0 auto;
  .body {
    gap: 6px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
}
</style>