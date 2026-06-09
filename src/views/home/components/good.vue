<script setup>
import Title from "@/components/title.vue";
import Goodcard from "@/components/goodcard.vue";
const message = defineProps({
  name: String,
  children: Array,
  goods: Array,
  id: [String, Number],
  picture: String,
  saleInfo: String,
});
</script>
<template>
  <div class="goodbody">
    <Title :bigtitle="message.name" />
    <div class="body">
      <div class="img">
        <img v-img-lazy="message.picture" alt="" />
      </div>
      <div class="goods">
        <Goodcard
          v-for="item in message.goods"
          :key="item.id"
          :desc="item.desc"
          :id="item.id"
          :name="item.name"
          :picture="item.picture"
          :price="item.price"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.goodbody {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 0 12px;
  box-sizing: border-box;
  .img {
    flex: 0 0 240px;
    height: 610px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .body {
    display: flex;
    gap: 10px;
  }
}
.goods {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
}
</style>
