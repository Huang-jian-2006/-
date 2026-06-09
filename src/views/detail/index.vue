<script setup>
import { getDetailAPI } from "@/api/detail";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import GoodsDetail from "./components/goodsDetail.vue";
import GoodsIntroduce from "./components/goodsIntroduce.vue";
import Hotlist from "./components/hotlist.vue";
const route = useRoute();
const message = ref({});
const loading = ref(true);
const goodsId = ref(route.params.id || 4026116);
const getDetailData = async (id) => {
  goodsId.value = id || 4026116;
  loading.value = true;
  const response = await getDetailAPI(goodsId.value);
  message.value = response.data.result;
  loading.value = false;
};

watch(
  () => route.params.id,
  (newId) => {
    getDetailData(newId);
  },
  { immediate: true }
);
</script>
<template>
  <div class="main">
    <div class="Detail">
      <GoodsDetail :message="message" :loading="loading" />
    </div>
    <div class="introduce">
      <GoodsIntroduce :message="message" :loading="loading" />
      <Hotlist :goods-id="goodsId" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.main {
  padding: 40px 0 30px 0;
  width: 100%;
  background-color: rgb(245, 245, 245);
  .Detail {
    background-color: white;
    width: 1240px;
    margin: 0 auto;
  }
  .introduce {
    display: flex;
    width: 1240px;
    margin: 0 auto;
  }
}
</style>
