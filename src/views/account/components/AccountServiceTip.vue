<script setup>
import { Service } from "@element-plus/icons-vue";

defineProps({
  message: {
    type: String,
    default:
      "用户中心当前已接入账号状态和购物车数据，后续可以继续扩展订单、地址、收藏和优惠券模块。",
  },
});
</script>

<template>
  <div class="service-panel">
    <div class="service-header">
      <el-icon><Service /></el-icon>
      <span>温馨提示</span>
    </div>
    <div class="service-text">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-panel {
  margin-top: 22px;
  padding: 24px 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgb(39, 186, 155);
  font-size: 20px;
  font-weight: 600;
}

.service-text {
  margin-top: 12px;
  color: #666;
  font-size: 15px;
  line-height: 1.8;
}
</style>
