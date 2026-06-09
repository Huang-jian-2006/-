<script setup>
import { Location } from "@element-plus/icons-vue";

defineProps({
  addressList: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit-address", "add-address"]);
</script>

<template>
  <div class="panel address-panel">
    <div class="address-header">
      <div class="panel-header">收货地址</div>
      <el-button type="success" @click="$emit('add-address')">
        添加收货地址
      </el-button>
    </div>

    <div v-if="addressList.length" class="address-list">
      <div v-for="item in addressList" :key="item.id" class="address-card">
        <div class="address-icon">
          <el-icon><Location /></el-icon>
        </div>
        <div class="address-content">
          <div class="address-top">
            <span class="address-name">{{ item.receiver }}</span>
            <span class="address-phone">{{ item.phone }}</span>
            <span class="address-tag">{{ item.tag }}</span>
          </div>
          <div class="address-detail">
            {{ item.province }}{{ item.city }}{{ item.area }}{{ item.detail }}
          </div>
        </div>
        <el-button type="success" plain @click="$emit('edit-address', item)">
          修改收货地址
        </el-button>
      </div>
    </div>

    <div v-else class="address-empty">暂时还没有收货地址，快去添加一个吧</div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  padding: 28px 32px 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.address-panel {
  margin-top: 22px;
}

.address-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.panel-header {
  padding-left: 12px;
  border-left: 4px solid rgb(39, 186, 155);
  color: #333;
  font-size: 22px;
  font-weight: 600;
}

.address-list {
  display: grid;
  gap: 16px;
  margin-top: 26px;
}

.address-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
}

.address-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(39, 186, 155, 0.12);
  color: rgb(39, 186, 155);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.address-content {
  flex: 1;
  min-width: 0;
}

.address-top {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.address-name {
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.address-phone {
  color: #666;
  font-size: 15px;
}

.address-tag {
  padding: 4px 10px;
  border-radius: 12px;
  background-color: rgba(39, 186, 155, 0.1);
  color: rgb(39, 186, 155);
  font-size: 13px;
}

.address-detail {
  margin-top: 12px;
  color: #666;
  font-size: 15px;
  line-height: 1.8;
}

.address-empty {
  margin-top: 26px;
  padding: 40px 0;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  text-align: center;
  color: #999;
  font-size: 15px;
}
</style>
