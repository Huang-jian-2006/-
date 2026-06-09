<script setup>
import AccountAddressDialog from "../../account/components/AccountAddressDialog.vue";

defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  fullAddress: {
    type: String,
    default: "",
  },
  addressList: {
    type: Array,
    default: () => [],
  },
  currentAddressId: {
    type: [String, Number, null],
    default: null,
  },
  switchAddressVisible: {
    type: Boolean,
    default: false,
  },
  addAddressVisible: {
    type: Boolean,
    default: false,
  },
  addressForm: {
    type: Object,
    required: true,
  },
});

defineEmits([
  "open-switch-address",
  "open-add-address",
  "select-address",
  "update:switchAddressVisible",
  "update:addAddressVisible",
  "save-address",
]);
</script>

<template>
  <div class="header">
    <dl>
      <dt class="header-title">收货地址</dt>
      <dd>
        <div class="addressmessage">
          <div class="a-left">
            <dl>
              <dt>收货人</dt>
              <dd>{{ address.receiver }}</dd>
            </dl>
            <dl>
              <dt>联系方式</dt>
              <dd>{{ address.phone }}</dd>
            </dl>
            <dl>
              <dt>收货地址</dt>
              <dd>{{ fullAddress }}</dd>
            </dl>
          </div>
          <div class="a-right">
            <el-button @click="$emit('open-switch-address')">切换地址</el-button>
            <el-button @click="$emit('open-add-address')">添加地址</el-button>
          </div>
        </div>
      </dd>
    </dl>
  </div>

  <el-dialog
    :model-value="switchAddressVisible"
    title="切换收货地址"
    width="620px"
    @update:model-value="$emit('update:switchAddressVisible', $event)"
  >
    <div v-if="addressList.length" class="address-list">
      <div
        v-for="item in addressList"
        :key="item.id"
        class="address-card"
        :class="{ active: item.id === currentAddressId }"
        @click="$emit('select-address', item.id)"
      >
        <div class="address-card-top">
          <span>{{ item.receiver }}</span>
          <span>{{ item.phone }}</span>
          <el-tag v-if="item.tag" size="small" type="success">{{ item.tag }}</el-tag>
        </div>
        <div class="address-card-detail">
          {{ item.province }} {{ item.city }} {{ item.area }} {{ item.detail }}
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无收货地址" />
  </el-dialog>

  <AccountAddressDialog
    :visible="addAddressVisible"
    title="添加收货地址"
    :address-form="addressForm"
    @update:visible="$emit('update:addAddressVisible', $event)"
    @save="$emit('save-address')"
  />
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  padding-left: 10px;
}

.header-title {
  padding-left: 15px;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.addressmessage {
  display: flex;
  gap: 20px;

  .a-left {
    padding-left: 20px;
    width: 60%;

    dl {
      display: flex;
      align-items: center;
      margin: 0 0 16px;
    }

    dt {
      width: 96px;
      height: auto;
      padding-left: 0;
      font-size: 16px;
      color: #666;
      flex-shrink: 0;
    }

    dd {
      margin: 0;
      color: #333;
      line-height: 1.8;
    }
  }

  .a-right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 40%;

    :deep(.el-button) {
      width: 94px;
      height: 39px;
    }
  }
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.address-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.address-card:hover,
.address-card.active {
  border-color: #27ba9b;
  background-color: #f3fbf9;
}

.address-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;
  font-size: 15px;
  font-weight: 600;
}

.address-card-detail {
  margin-top: 10px;
  color: #666;
  line-height: 1.7;
}
</style>
