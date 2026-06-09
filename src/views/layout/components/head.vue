<script setup>
import { useRouter, useRoute } from "vue-router";
import logo from "@/assets/images/logo.png";
import { headAPI } from "@/api/home/head";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { Search, ShoppingCartFull, User } from "@element-plus/icons-vue";
import { useCounterStore } from "@/stores/counter";
import { ElMessageBox } from "element-plus";
import { getCart, deleteCart } from "@/api/cart";
const router = useRouter();
const route = useRoute();
const counterStore = useCounterStore();
const Cartlist = computed(() => counterStore.cartlis);
const token = ref();
onMounted(async () => {
  token.value = localStorage.getItem("token");
  if (token.value) {
    counterStore.setCartList((await getCart()).data.result);
  }
});
const login = () => {
  router.push("/login");
};

const headtext = ref([]);

onBeforeMount(async () => {
  headtext.value = (await headAPI()).data.result;
  console.log(headtext);
});

const getcategory = (id) => {
  router.push(`/category/${id}`);
};
const backhome = () => {
  router.push("/");
};
const searchvalue = ref();

const totalCount = computed(() =>
  Cartlist.value.reduce((sum, item) => {
    return sum + Number(item.count || 0);
  }, 0)
);
const totalPrice = computed(() =>
  Cartlist.value.reduce((sum, item) => {
    return sum + Number((item.count || 0) * (item.price || 0));
  }, 0)
);

const removeCartItem = async (item) => {
  if (token.value && item.skuId) {
    await deleteCart({ ids: [item.skuId] });
    counterStore.setCartList((await getCart()).data.result);
    return;
  }

  counterStore.localdelcart(item);
};

const checkout = () => {
  router.push("/cart");
};
const changeLogin = () => {
  ElMessageBox.confirm("确定退出登入吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    counterStore.changeLogin(false);
    localStorage.clear("token");
  });
};
</script>
<template>
  <div>
    <div class="title">
      <div>
        <el-icon
          style="color: white; transform: translateY(2px)"
          v-show="counterStore.login"
          ><User
        /></el-icon>
        <div v-show="counterStore.login" @click="router.push('/account')">
          {{ counterStore.useinfo?.account || "用户中心" }}
        </div>
        <span v-show="counterStore.login"></span>
        <div @click="login" v-if="!counterStore.login">请先登入</div>
        <div v-else @click="changeLogin">退出登入</div>
        <span></span>
        <div>{{ counterStore.login ? "我的订单" : "帮助中心" }}</div>
        <span></span>
        <div>{{ counterStore.login ? "会员中心" : "关于我们" }}</div>
      </div>
    </div>
    <div class="table">
      <img :src="logo" alt="" />
      <div class="classbox">
        <div class="classtext" @click="backhome()">首页</div>
        <div
          @click="getcategory(item.id)"
          v-for="item in headtext"
          :key="item.id"
          class="classtext"
          :class="{
            action: String(route.params?.id ?? '') === String(item.id),
          }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="table-right">
        <el-input
          v-model="searchvalue"
          class="responsive-input"
          placeholder="搜一搜"
          :prefix-icon="Search"
          size="default"
          maxlength="200px"
        >
        </el-input>
        <el-dropdown popper-class="cart-popper">
          <el-badge :value="Cartlist.length" class="cart-badge">
            <el-icon class="cart-icon"><ShoppingCartFull /></el-icon>
          </el-badge>
          <template #dropdown>
            <el-dropdown-menu class="cart-dropdown">
              <div v-if="Cartlist.length" class="cart-list">
                <div v-for="item in Cartlist" :key="item.id" class="cart-item">
                  <img
                    v-img-lazy="item.picture"
                    :alt="item.title"
                    class="cart-item-image"
                  />
                  <div class="cart-item-info">
                    <div class="cart-item-title">{{ item.name }}</div>
                    <div class="cart-item-spec">
                      {{ item.attrsText }}
                    </div>
                  </div>
                  <div class="cart-item-meta">
                    <button
                      class="cart-item-delete"
                      @click.stop="removeCartItem(item)"
                    >
                      ×
                    </button>
                    <div class="cart-item-price">￥{{ item.price }}</div>
                    <div class="cart-item-count">x{{ item.count }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="cart-empty">
                购物车还是空的，快去挑选商品吧
              </div>
              <div v-if="Cartlist.length" class="cart-footer">
                <div class="cart-footer-summary">
                  <div class="cart-footer-count">
                    共 {{ totalCount }} 件商品
                  </div>
                  <div class="cart-footer-price">￥{{ totalPrice }}</div>
                </div>
                <el-button
                  class="cart-footer-button"
                  type="success"
                  @click="checkout"
                >
                  去购物车结算
                </el-button>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  width: 100%;
  height: 56px;
  background-color: rgb(51, 51, 51);
  > div {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    transform: translateX(-150px);
    > div {
      cursor: pointer;
      margin: 0 10px;
      width: 90px;
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
    > div:hover {
      color: rgb(39, 173, 111);
    }
    > span {
      display: block;
      width: 1px;
      height: 20px;
      background-color: #fff;
    }
  }
}
.table {
  width: 100%;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 200px;
    object-fit: cover;
  }
  .classbox {
    height: 100%;
    width: 780px;
    padding-left: 40px;
    display: flex;
    align-items: center;
    gap: 40px;
    .classtext {
      cursor: pointer;
      line-height: 36px;
      width: 36px;
      height: 36px;
      font-size: 18px;
      border-bottom: 2px solid transparent;
    }
    .classtext:hover {
      color: rgb(67, 190, 161);
      border-bottom-color: rgb(67, 190, 161);
    }
  }
}
.table-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.table .classbox .classtext.action {
  color: rgb(67, 190, 161);
  border-bottom: 2px solid rgb(67, 190, 161);
}
.responsive-input {
  width: 220px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
}
.cart-badge {
  border: none;
  :deep(.el-badge__content) {
    background-color: #f56c6c;
  }
}
:deep(.el-tooltip__trigger) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
}
:deep(.el-tooltip__trigger:focus-visible) {
  outline: none !important;
}
.cart-icon {
  font-size: 30px;
  color: #2c3e50;
  cursor: pointer;
}
.cart-dropdown {
  width: 420px;
  padding: 0;
}
:deep(.cart-popper) {
  margin-left: -40px;
}
.cart-list {
  max-height: 360px;
  overflow-y: auto;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}
.cart-item-image {
  width: 88px;
  height: 88px;
  object-fit: cover;
  flex-shrink: 0;
}
.cart-item-info {
  flex: 1;
  min-width: 0;
}
.cart-item-title {
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cart-item-spec {
  margin-top: 10px;
  font-size: 14px;
  color: #b3b3b3;
}
.cart-item-meta {
  min-width: 88px;
  text-align: right;
}
.cart-item-delete {
  border: none;
  background: transparent;
  padding: 0;
  margin-bottom: 14px;
  font-size: 18px;
  line-height: 1;
  color: #b3b3b3;
  cursor: pointer;
}
.cart-item-delete:hover {
  color: #f56c6c;
}
.cart-item-price {
  font-size: 16px;
  color: #f56c6c;
}
.cart-item-count {
  margin-top: 12px;
  font-size: 16px;
  color: #b3b3b3;
}
.cart-empty {
  width: 420px;
  padding: 36px 24px;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
}
.cart-footer-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cart-footer-count {
  font-size: 14px;
  color: #999;
}
.cart-footer-price {
  font-size: 30px;
  line-height: 1;
  color: #f56c6c;
}
.cart-footer-button {
  background-color: rgb(39, 187, 154);
  min-width: 140px;
  height: 44px;
  font-size: 16px;
}
</style>
