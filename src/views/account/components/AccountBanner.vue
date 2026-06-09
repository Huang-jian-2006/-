<script setup>
import { User } from "@element-plus/icons-vue";

defineProps({
  login: {
    type: Boolean,
    default: false,
  },
  accountName: {
    type: String,
    default: "游客用户",
  },
});

defineEmits(["login", "cart"]);
</script>

<template>
  <div class="account-banner">
    <div class="account-user">
      <div class="account-avatar">
        <el-icon><User /></el-icon>
      </div>
      <div class="account-user-info">
        <div class="account-title">账号中心</div>
        <div class="account-name">
          {{ login ? accountName : "当前未登录，请先登录账号" }}
        </div>
        <div class="account-text">
          {{
            login
              ? "在这里查看账号信息、购物车和常用服务。"
              : "登录后可查看购物车、订单和个人资料。"
          }}
        </div>
      </div>
    </div>
    <el-button
      v-if="!login"
      type="success"
      size="large"
      @click="$emit('login')"
    >
      立即登录
    </el-button>
    <el-button v-else plain size="large" @click="$emit('cart')">
      查看购物车
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.account-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgb(39, 186, 155), rgb(95, 203, 173));
  color: #fff;
}

.account-user {
  display: flex;
  align-items: center;
  gap: 24px;
}

.account-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.account-title {
  font-size: 30px;
  font-weight: 600;
}

.account-name {
  margin-top: 10px;
  font-size: 22px;
}

.account-text {
  margin-top: 8px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
}
</style>
