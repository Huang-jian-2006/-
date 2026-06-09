<script setup>
import { ArrowUpBold } from "@element-plus/icons-vue";

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <button class="back-top" type="button" @click="backToTop">
    <el-icon><ArrowUpBold /></el-icon>
  </button>
</template>

<style scoped lang="scss">
.back-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 44px;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 50%;
  background-color: #fff;
  color: #666;
  font-size: 22px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.back-top .el-icon {
  font-size: 18px;
}

.back-top:hover {
  color: #333;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
</style>
