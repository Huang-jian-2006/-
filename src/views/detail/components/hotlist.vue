<script setup>
import { getHotListApi } from "@/api/detail";
import { ref, watch } from "vue";
import Goodcard from "@/components/goodcard.vue";
const props = defineProps({
  goodsId: {
    type: [String, Number],
    default: 4026116,
  },
});
const messageOne = ref([]);
const messageTwo = ref([]);
const loading = ref(true);
const getHotListData = async (id) => {
  loading.value = true;
  const currentId = id || 4026116;
  const responseOne = await getHotListApi({
    id: currentId,
    type: 1,
    limit: 3,
  });
  const responseTwo = await getHotListApi({
    id: currentId,
    type: 2,
    limit: 3,
  });
  messageOne.value = responseOne.data.result || [];
  messageTwo.value = responseTwo.data.result || [];
  loading.value = false;
};

watch(
  () => props.goodsId,
  (newId) => {
    getHotListData(newId);
  },
  { immediate: true }
);
</script>
<template>
  <div class="list" v-if="!loading" v-loading="loading">
    <dl>
      <dt>24小时热榜</dt>
      <dd v-for="item in messageOne" :key="item.id">
        <Goodcard
          class="card"
          :picture="item.picture"
          :name="item.name"
          :price="item.price"
          :id="item.id"
          :desc="item.desc"
          :change="1.15"
        />
      </dd>
    </dl>
    <dl>
      <dt>周热榜</dt>
      <dd v-for="item in messageTwo" :key="item.id">
        <Goodcard
          class="card"
          :picture="item.picture"
          :name="item.name"
          :price="item.price"
          :id="item.id"
          :desc="item.desc"
          :change="1.15"
        />
      </dd>
    </dl>
  </div>
</template>
<style lang="scss" scoped>
.list {
  dl {
    dt {
      width: 255px;
      height: 70px;
      padding-left: 25px;
      background-color: rgb(226, 98, 55);
      margin-top: 20px;
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
    }
    dd {
      width: 280px;
      background-color: white;
      .card {
        margin: 0 auto;
      }
    }
  }
}
</style>
