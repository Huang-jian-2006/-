<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const messge = defineProps({
  picture: String,
  id: [String, Number],
  title: String,
  alt: String,
});
</script>
<template>
  <div class="card">
    <div>
      <img class="cover-img" v-img-lazy="messge.picture" alt="" />
    </div>
    <div class="title-wrap">
      <span class="title">{{ messge.title }}</span>
    </div>
    <div class="alt">
      <span class="alt-value">{{ messge.alt }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  cursor: pointer;
  width: 306px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
  }

  .cover-img {
    width: 100%;
    display: block;
  }

  .title-wrap {
    width: 100%;
    line-height: 60px;
    height: 60px;
  }

  .title {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .alt {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(153, 153, 153);
    font-weight: 600;
    height: 40px;
    line-height: 40px;
  }

  .alt-value {
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
  }
}
</style>
