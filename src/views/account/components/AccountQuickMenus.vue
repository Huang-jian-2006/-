<script setup>
defineProps({
  quickMenus: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["menu-click"]);
</script>

<template>
  <div class="panel">
    <div class="panel-header">常用功能</div>
    <div class="menu-grid">
      <div
        v-for="item in quickMenus"
        :key="item.title"
        class="menu-card"
        @click="$emit('menu-click', item.path)"
      >
        <div class="menu-icon">
          <el-icon><component :is="item.icon" /></el-icon>
        </div>
        <div class="menu-title">{{ item.title }}</div>
        <div class="menu-desc">{{ item.desc }}</div>
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

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 26px;
}

.menu-card {
  padding: 24px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-card:hover {
  border-color: rgb(39, 186, 155);
  transform: translateY(-2px);
}

.menu-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: rgba(39, 186, 155, 0.1);
  color: rgb(39, 186, 155);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.menu-title {
  margin-top: 16px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.menu-desc {
  margin-top: 10px;
  color: #999;
  font-size: 14px;
  line-height: 1.7;
}
</style>
