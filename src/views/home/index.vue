<script setup>
import Backtop from "@/components/backtop.vue";
import { onBeforeMount, ref } from "vue";
import NewGood from "./components/newgood.vue";
import Hot from "./components/hot.vue";
import { good } from "@/api/home";
import Good from "./components/good.vue";
import Banner from "../layout/components/banner.vue";
const goodlist = ref();
onBeforeMount(async () => {
  goodlist.value = (await good()).data.result;
});
</script>
<template>
  <div>
    <Backtop />
    <Banner />
    <div class="content">
      <NewGood />
      <Hot />
      <div class="part"></div>
      <Good
        v-for="item in goodlist"
        :key="item.id"
        :goods="item.goods"
        :id="item.id"
        :picture="item.picture"
        :name="item.name"
      />
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
.part {
  height: 20px;
  width: 100%;
  background-color: rgb(245, 245, 245);
}
</style>