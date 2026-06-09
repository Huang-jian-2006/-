<script setup>
defineProps({
  totalCartKinds: {
    type: Number,
    default: 0,
  },
  totalCartCount: {
    type: Number,
    default: 0,
  },
  totalCartPrice: {
    type: String,
    default: "0.00",
  },
});
</script>

<template>
  <div class="stats-grid">
    <div class="stats-card">
      <div class="stats-label">购物车商品种类</div>
      <div class="stats-value">{{ totalCartKinds }}</div>
    </div>
    <div class="stats-card">
      <div class="stats-label">购物车总件数</div>
      <div class="stats-value">{{ totalCartCount }}</div>
    </div>
    <div class="stats-card">
      <div class="stats-label">购物车总金额</div>
      <div class="stats-value accent">￥{{ totalCartPrice }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 22px;
}

.stats-card {
  padding: 28px 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.stats-label {
  color: #999;
  font-size: 15px;
}

.stats-value {
  margin-top: 16px;
  color: #333;
  font-size: 34px;
  font-weight: 600;
}

.stats-value.accent {
  color: rgb(245, 108, 108);
}
</style>
