<script setup>
defineProps({
  totalGoodsCount: {
    type: Number,
    default: 0,
  },
  totalPayPrice: {
    type: [String, Number],
    default: 0,
  },
  freightPrice: {
    type: Number,
    default: 0,
  },
  finalPayPrice: {
    type: [String, Number],
    default: 0,
  },
});
</script>

<template>
  <div class="amount-section">
    <div class="header-title">金额明细</div>
    <div class="amount-content">
      <div class="amount-list">
        <div class="amount-row">
          <span>商品件数：</span>
          <span>{{ totalGoodsCount }}件</span>
        </div>
        <div class="amount-row">
          <span>商品总价：</span>
          <span>￥{{ totalPayPrice }}</span>
        </div>
        <div class="amount-row">
          <span>运费：</span>
          <span>￥{{ freightPrice.toFixed(2) }}</span>
        </div>
        <div class="amount-row total-row">
          <span>应付总额：</span>
          <span class="amount-total-price">{{ finalPayPrice }}</span>
        </div>
      </div>
    </div>
    <div class="submit-bar">
      <el-button type="success" class="submit-order-btn">提交订单</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.amount-section {
  margin-top: 24px;
  background-color: #fff;
  padding-bottom: 16px;
}

.header-title {
  padding-left: 15px;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.amount-content {
  display: flex;
  justify-content: flex-end;
  padding: 10px 36px 24px;
}

.amount-list {
  width: 260px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  color: #666;
  font-size: 16px;
}

.total-row {
  margin-top: 8px;
}

.amount-total-price {
  color: #cf4444;
  font-size: 34px;
  line-height: 1;
}

.submit-bar {
  display: flex;
  justify-content: flex-end;
  padding: 16px 36px 0;
  border-top: 1px solid #f0f0f0;
}

.submit-order-btn {
  min-width: 120px;
  height: 42px;
  font-size: 16px;
}
</style>
