<script setup>
defineProps({
  selectedRows: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="product">
    <div class="header-title">商品信息</div>
    <div class="product-header">
      <div class="product-info-col">商品信息</div>
      <div>单价</div>
      <div>数量</div>
      <div>小计</div>
      <div>实付</div>
    </div>
    <div v-if="selectedRows.length" class="product-list">
      <div v-for="item in selectedRows" :key="item.skuId" class="product-item">
        <div class="product-info">
          <img
            v-img-lazy="item.picture"
            :alt="item.name"
            class="product-image"
          />
          <div class="product-text">
            <div class="product-title">{{ item.name }}</div>
            <div class="product-spec">{{ item.attrsText }}</div>
          </div>
        </div>
        <div class="product-price">￥{{ Number(item.price).toFixed(2) }}</div>
        <div class="product-count">{{ item.count }}</div>
        <div class="product-subtotal">
          ￥{{ (Number(item.count) * Number(item.price)).toFixed(2) }}
        </div>
        <div class="product-pay">
          ￥{{ (Number(item.count) * Number(item.price)).toFixed(2) }}
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无结算商品" />
  </div>
</template>

<style scoped lang="scss">
.product {
  background-color: white;
  margin-top: 28px;
  border-top: 1px solid #f0f0f0;
  padding: 30px 0;
}

.header-title {
  padding-left: 15px;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.product-header,
.product-item {
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.8fr 0.6fr 0.5fr 0.6fr 0.6fr;
  align-items: center;
}

.product-header {
  height: 62px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 16px;
}

.product-header > div,
.product-item > div {
  text-align: center;
}

.product-info-col {
  text-align: left !important;
  padding-left: 32px;
}

.product-item {
  min-height: 120px;
  border-bottom: 1px solid #f0f0f0;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 20px 22px 32px;
  text-align: left;
}

.product-image {
  width: 82px;
  height: 82px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-text {
  min-width: 0;
}

.product-title {
  color: #333;
  font-size: 17px;
  line-height: 1.7;
}

.product-spec {
  margin-top: 8px;
  color: #999;
  font-size: 14px;
}

.product-price,
.product-count {
  color: #333;
  font-size: 16px;
}

.product-subtotal,
.product-pay {
  color: #666;
  font-size: 16px;
}
</style>
