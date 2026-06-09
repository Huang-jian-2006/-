<script setup>
const links = [
  "关于我们",
  "帮助中心",
  "售后服务",
  "配送与验收",
  "商务合作",
  "搜索推荐",
];
</script>

<template>
  <footer class="foot">
    <div class="container">
      <div class="link-row">
        <a v-for="item in links" :key="item" href="javascript:void(0)">
          {{ item }}
        </a>
      </div>
      <p class="copyright">CopyRight © 小兔鲜儿</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.foot {
  width: 100%;
  background: #f5f5f5;
  padding: 60px 0 50px;
}

.container {
  width: 1240px;
  margin: 0 auto;
  text-align: center;
}

.link-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  a {
    color: #999;
    font-size: 14px;
    line-height: 1;
    text-decoration: none;
    padding: 0 18px;
    border-right: 1px solid #d9d9d9;

    &:last-child {
      border-right: 0;
    }

    &:hover {
      color: #27ba9b;
    }
  }
}

.copyright {
  margin: 18px 0 0;
  color: #999;
  font-size: 14px;
  line-height: 1;
}
</style>
