<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ShoppingCartFull,
  Goods,
  Document,
  Van,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useCounterStore } from "@/stores/counter";
import AccountBanner from "./components/AccountBanner.vue";
import AccountStats from "./components/AccountStats.vue";
import AccountProfile from "./components/AccountProfile.vue";
import AccountQuickMenus from "./components/AccountQuickMenus.vue";
import AccountAddress from "./components/AccountAddress.vue";
import AccountAddressDialog from "./components/AccountAddressDialog.vue";
import AccountServiceTip from "./components/AccountServiceTip.vue";

const router = useRouter();
const counterStore = useCounterStore();

const accountName = computed(() => counterStore.useinfo?.account || "游客用户");

const getItemCount = (item) => {
  const count =
    item.num && typeof item.num === "object" && "value" in item.num
      ? Number(item.num.value)
      : Number(item.num);
  return count || 0;
};

const totalCartKinds = computed(() => counterStore.cartlis.length);

const totalCartCount = computed(() =>
  counterStore.cartlis.reduce((sum, item) => sum + getItemCount(item), 0)
);

const totalCartPrice = computed(() =>
  counterStore.cartlis
    .reduce(
      (sum, item) => sum + (Number(item.price) || 0) * getItemCount(item),
      0
    )
    .toFixed(2)
);

const addressDialogTitle = ref("修改收货地址");
const addressDialogVisible = ref(false);
const editingAddressId = ref(null);

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

const quickMenus = [
  {
    title: "我的购物车",
    desc: "查看商品、修改数量和结算",
    icon: ShoppingCartFull,
    path: "/cart",
  },
  {
    title: "我的订单",
    desc: "跟踪订单状态和物流信息",
    icon: Document,
    path: "/",
  },
  {
    title: "商品收藏",
    desc: "管理你想再次购买的商品",
    icon: Goods,
    path: "/",
  },
  {
    title: "收货服务",
    desc: "查看配送、售后和帮助信息",
    icon: Van,
    path: "/",
  },
];

const handleMenuClick = (path) => {
  if (!counterStore.login) {
    router.push("/login");
    return;
  }

  router.push(path);
};

const goLogin = () => {
  router.push("/login");
};

const goCart = () => {
  router.push("/cart");
};

const goHome = () => {
  router.push("/");
};

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

const openAddAddressDialog = () => {
  resetAddressForm();
  editingAddressId.value = null;
  addressDialogTitle.value = "添加收货地址";
  addressDialogVisible.value = true;
};

const openEditAddressDialog = (address) => {
  Object.assign(addressForm, address);
  editingAddressId.value = address.id;
  addressDialogTitle.value = "修改收货地址";
  addressDialogVisible.value = true;
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

  if (editingAddressId.value) {
    counterStore.updateAddress({ ...addressForm, id: editingAddressId.value });
  } else {
    counterStore.addAddress({ ...addressForm });
  }

  addressDialogVisible.value = false;
  resetAddressForm();
  editingAddressId.value = null;
  ElMessage.success("收货地址已保存");
};
</script>

<template>
  <div class="account-page">
    <div class="account-wrapper">
      <div class="page-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <span class="nav-link" @click="goHome">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>账号中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <AccountBanner
        :login="counterStore.login"
        :account-name="accountName"
        @login="goLogin"
        @cart="goCart"
      />

      <AccountStats
        :total-cart-kinds="totalCartKinds"
        :total-cart-count="totalCartCount"
        :total-cart-price="totalCartPrice"
      />

      <div class="content-grid">
        <AccountProfile
          :account-name="accountName"
          :login="counterStore.login"
        />
        <AccountQuickMenus
          :quick-menus="quickMenus"
          @menu-click="handleMenuClick"
        />
      </div>

      <AccountAddress
        :address-list="counterStore.addressList"
        @add-address="openAddAddressDialog"
        @edit-address="openEditAddressDialog"
      />

      <AccountServiceTip />

      <AccountAddressDialog
        :visible="addressDialogVisible"
        :title="addressDialogTitle"
        :address-form="addressForm"
        @update:visible="addressDialogVisible = $event"
        @save="saveAddress"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-page {
  background-color: rgb(245, 245, 245);
  padding: 24px 0 40px;
}

.account-wrapper {
  width: 1240px;
  margin: 0 auto;
}

.page-nav {
  margin-bottom: 14px;
}

.nav-link {
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: rgb(39, 186, 155);
}

.content-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
  margin-top: 22px;
}
</style>
