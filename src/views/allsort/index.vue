<script setup>
import { getGoodData } from "@/api/allsort";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Backtop from "@/components/backtop.vue";
import Goodcard from "@/components/goodcard.vue";
const route = useRoute();
const router = useRouter();
const goodData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const message = ref("");
const name = ref("");
const isLoadingMore = ref(false);
const preloadDistance = 300;

const loadGoods = async () => {
  const response = await getGoodData(goodData.value);
  const items = response.data.result.items;
  message.value = [...message.value, ...items];
};
const handleScrollToBottom = async () => {
  if (isLoadingMore.value) return;
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight < scrollHeight - preloadDistance) return;
  isLoadingMore.value = true;
  goodData.value.page++;
  try {
    await loadGoods();
  } finally {
    isLoadingMore.value = false;
  }
};

onMounted(async () => {
  name.value = history.state;
  await loadGoods();
  window.addEventListener("scroll", handleScrollToBottom, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScrollToBottom);
});
const back = () => {
  router.push("/");
};
const BackRouter = () => {
  router.back();
};
const sortTitle = ref([
  { name: "最新商品", state: true, id: 1 },
  { name: "最高人气", state: false, id: 2 },
  { name: "评论最多", state: false, id: 3 },
]);
const change = (id) => {
  sortTitle.value.forEach((item) => {
    item.state = id === item.id;
  });
};
</script>
<template>
  <div class="allsort">
    <div class="table">
      <span class="tablename" @click="back">{{ name.name1 }}</span>
      <span>></span>
      <span class="tablename" @click="BackRouter">{{ name.name2 }}</span>
      <span>></span>
      <span>{{ name.name3 }}</span>
    </div>
    <div class="dispaly">
      <div class="title">
        <span
          v-for="item in sortTitle"
          :key="item.id"
          @click="change(item.id)"
          :class="{ action: item.state }"
          >{{ item.name }}</span
        >
      </div>
      <div class="main">
        <Goodcard
          v-for="item in message"
          :key="item.id"
          :id="item.id"
          :picture="item.picture"
          :name="item.name"
          :desc="item.desc"
          :price="item.price"
        />
      </div>
    </div>
    <Backtop />
  </div>
</template>
<style scoped lang="scss">
.allsort {
  width: 100%;
  background: rgb(245, 245, 245);
  background-color: rgb(245, 245, 245);
  padding: 0 0 20px 0;
}
.table {
  height: 14px;
  width: 1240px;
  padding: 25px 0 30px 0;
  margin: 0 auto;
  span {
    font-weight: 400;
    font-size: 14px;
    margin: 0 8px;
    color: rgb(48, 49, 51);
  }
}
.tablename {
  cursor: pointer;
}
.tablename:hover {
  color: rgb(39, 187, 154);
}
.dispaly {
  margin: 0 auto;
  width: 1200px;
  background-color: white;
  padding: 20px 20px 20px 20px;
  .title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 10px;
    border-bottom: 1px solid #e7e7e7;
    cursor: pointer;
  }
  .main {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
  }
}
.action {
  color: rgb(39, 187, 154);
  border-bottom: 2px solid rgb(39, 187, 154);
}
</style>
