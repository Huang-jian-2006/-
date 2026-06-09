<script setup>
import Banner from "@/views/layout/components/banner.vue";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps({
  name: {
    type: String,
    default: "",
  },
  sortmessage: {
    type: Array,
    default: () => [],
  },
});

const back = () => {
  router.push("/");
};
const goAllsort = (id, name2, name3) => {
  router.push({
    path: `/category/allsort/${id}`,
    state: {
      name1: "首页",
      name2: name2,
      name3: name3,
    },
  });
};
</script>
<template>
  <div class="table">
    <span class="tablename" @click="back">首页</span>
    <span>></span>
    <span>{{ name }}</span>
  </div>
  <Banner />
  <div class="allclass">
    <div class="title">全部分类</div>
    <div class="classbox">
      <div
        class="onebox"
        v-for="item in sortmessage"
        :key="item.id"
        @click="goAllsort(item.id, name, item.name)"
      >
        <div class="img">
          <img v-img-lazy="item.picture" alt="" />
        </div>
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.allclass {
  width: 1240px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  .title {
    height: 100px;
    width: 100%;
    font-size: 28px;
    text-align: center;
    line-height: 100px;
    color: rgb(102, 102, 102);
  }
  .classbox {
    gap: 70px;
    width: 100%;
    height: 160px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .text {
      margin-top: 10px;
      width: 100%;
      text-align: center;
    }
  }
}
.onebox:hover {
  cursor: pointer;
  .text {
    color: rgb(39, 187, 154);
  }
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
</style>
