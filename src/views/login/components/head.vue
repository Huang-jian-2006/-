<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const backhome = () => {
  router.push("/");
};
</script>
<template>
  <div class="box">
    <div class="main">
      <img src="@\assets\images\logo.png" alt="" class="log" />
      <div class="backhome" @click="backhome">
        进入网站首页
        <el-icon class="icon"><ArrowRight /></el-icon>
        <el-icon class="icon"><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 132px;
  .main {
    display: flex;
    position: relative;
    width: 1240px;
    height: 100%;
    margin: 0 auto;
    img {
      max-width: 200px;
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .backhome {
      cursor: pointer;
      font-size: 16px;
      color: rgb(51, 51, 51);
      position: absolute;
      right: 0;
      bottom: 30px;
      .icon {
        color: rgb(39, 186, 155);
        transform: translateY(2px);
      }
    }
    .backhome:hover {
      color: rgb(39, 186, 155);
    }
  }
}
</style>
