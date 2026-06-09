<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useCounterStore } from "@/stores/counter";
import CheckoutAddressSection from "./components/CheckoutAddressSection.vue";
import CheckoutProductSection from "./components/CheckoutProductSection.vue";
import CheckoutAmountSection from "./components/CheckoutAmountSection.vue";

const store = useCounterStore();
const route = useRoute();

const selectedRows = computed(() => {
  const rawSelectedRows = Array.isArray(route.query.selectedRows)
    ? route.query.selectedRows[0]
    : route.query.selectedRows;
  if (!rawSelectedRows) {
    return [];
  }
  try {
    return JSON.parse(rawSelectedRows);
  } catch {
    return [];
  }
});

const currentAddressId = ref(store.addressList[0]?.id ?? null);
const switchAddressVisible = ref(false);
const addAddressVisible = ref(false);

const addressForm = reactive({
  id: null,
  receiver: "",
  phone: "",
  tag: "",
  province: "",
  city: "",
  area: "",
  detail: "",
});

const address = computed(() => {
  return (
    store.addressList.find((item) => item.id === currentAddressId.value) ||
    store.addressList[0] ||
    {}
  );
});

const fullAddress = computed(() => {
  return [
    address.value.province,
    address.value.city,
    address.value.area,
    address.value.detail,
  ]
    .filter(Boolean)
    .join(" ");
});

const totalPayPrice = computed(() =>
  selectedRows.value
    .reduce(
      (sum, item) =>
        sum + (Number(item.count) || 0) * (Number(item.price) || 0),
      0
    )
    .toFixed(2)
);

const totalGoodsCount = computed(() =>
  selectedRows.value.reduce((sum, item) => sum + (Number(item.count) || 0), 0)
);

const freightPrice = computed(() => (selectedRows.value.length ? 5 : 0));

const finalPayPrice = computed(() =>
  (Number(totalPayPrice.value) + freightPrice.value).toFixed(2)
);

const resetAddressForm = () => {
  Object.assign(addressForm, {
    id: null,
    receiver: "",
    phone: "",
    tag: "",
    province: "",
    city: "",
    area: "",
    detail: "",
  });
};

const openSwitchAddressDialog = () => {
  switchAddressVisible.value = true;
};

const selectAddress = (id) => {
  currentAddressId.value = id;
  switchAddressVisible.value = false;
};

const openAddAddressDialog = () => {
  resetAddressForm();
  addAddressVisible.value = true;
};

const saveAddress = () => {
  if (
    !addressForm.receiver ||
    !addressForm.phone ||
    !addressForm.province ||
    !addressForm.city ||
    !addressForm.area ||
    !addressForm.detail
  ) {
    ElMessage.warning("请先填写完整的收货地址信息");
    return;
  }

  store.addAddress({ ...addressForm });
  currentAddressId.value = store.addressList[0]?.id ?? currentAddressId.value;
  addAddressVisible.value = false;
  resetAddressForm();
  ElMessage.success("收货地址已添加");
};
</script>
<template>
  <div class="back">
    <div class="main">
      <CheckoutAddressSection
        :address="address"
        :full-address="fullAddress"
        :address-list="store.addressList"
        :current-address-id="currentAddressId"
        :switch-address-visible="switchAddressVisible"
        :add-address-visible="addAddressVisible"
        :address-form="addressForm"
        @open-switch-address="openSwitchAddressDialog"
        @open-add-address="openAddAddressDialog"
        @select-address="selectAddress"
        @update:switch-address-visible="switchAddressVisible = $event"
        @update:add-address-visible="addAddressVisible = $event"
        @save-address="saveAddress"
      />

      <CheckoutProductSection :selected-rows="selectedRows" />

      <CheckoutAmountSection
        :total-goods-count="totalGoodsCount"
        :total-pay-price="totalPayPrice"
        :freight-price="freightPrice"
        :final-pay-price="finalPayPrice"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.back {
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
}
.main {
  padding: 20px 0;
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>
