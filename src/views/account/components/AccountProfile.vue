<script setup>
defineProps({
  accountName: {
    type: String,
    default: "游客用户",
  },
  login: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="panel">
    <div class="panel-header">账号资料</div>
    <div class="info-list">
      <div class="info-item">
        <span class="info-label">账号名称</span>
        <span class="info-value">{{ accountName }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">登录状态</span>
        <span class="info-value">{{ login ? "已登录" : "未登录" }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">会员等级</span>
        <span class="info-value">普通会员</span>
      </div>
      <div class="info-item">
        <span class="info-label">账号安全</span>
        <span class="info-value">建议定期修改密码</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  padding: 28px 32px 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.panel-header {
  padding-left: 12px;
  border-left: 4px solid rgb(39, 186, 155);
  color: #333;
  font-size: 22px;
  font-weight: 600;
}

.info-list {
  margin-top: 26px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 1px solid #f3f3f3;
}

.info-label {
  color: #999;
  font-size: 15px;
}

.info-value {
  color: #333;
  font-size: 16px;
}
</style>
