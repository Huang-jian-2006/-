<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { banner } = storeToRefs(store);
</script>
<template>
  <div class="banner">
    <div class="carousel">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <img v-img-lazy="item.imgUrl || item.picture" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<style scoped lang="scss">
.banner {
  height: 500px;
  width: 100%;
  background-color: rgb(245, 245, 245);
}
.carousel {
  margin: 0 auto;
  width: 1240px;
  height: 500px;
}

.carousel img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>
