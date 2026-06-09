<script setup>
import qrCode from "@/assets/images/qrcode.jpg";

const serviceItems = [
  { title: "在线客服", icon: "●" },
  { title: "问题反馈", icon: "?" },
];

const followItems = [
  { title: "公众号", icon: "微" },
  { title: "微博", icon: "博" },
];

const badges = ["价格亲民", "物流快捷", "品质新鲜"];
const links = [
  "关于我们",
  "帮助中心",
  "售后服务",
  "配送与验收",
  "商务合作",
  "搜索推荐",
  "友情链接",
];
</script>

<template>
  <footer class="footer">
    <div class="top">
      <div class="container top-grid">
        <section class="col">
          <h4>客户服务</h4>
          <div class="mini-list">
            <div
              v-for="item in serviceItems"
              :key="item.title"
              class="mini-card"
            >
              <span class="icon">{{ item.icon }}</span>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </section>

        <section class="col">
          <h4>关注我们</h4>
          <div class="mini-list">
            <div
              v-for="item in followItems"
              :key="item.title"
              class="mini-card"
            >
              <span class="icon">{{ item.icon }}</span>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </section>

        <section class="col app">
          <h4>下载APP</h4>
          <div class="app-area">
            <img v-img-lazy="qrCode" alt="下载二维码" />
            <div class="app-right">
              <p>扫描二维码<br />立马下载APP</p>
              <button type="button">下载页面</button>
            </div>
          </div>
        </section>

        <section class="col hotline">
          <h4>服务热线</h4>
          <p class="phone">400-0000-000</p>
          <p class="time">周一至周日 8:00-18:00</p>
        </section>
      </div>
    </div>

    <div class="mid">
      <div class="container badge-row">
        <div v-for="item in badges" :key="item" class="badge">
          <span class="badge-icon"></span>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="container">
        <div class="link-row">
          <a v-for="item in links" :key="item" href="javascript:void(0)">{{
            item
          }}</a>
        </div>
        <p class="copyright">CopyRight © 小兔鲜儿</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.container {
  width: 1240px;
  margin: 0 auto;
}

.top {
  background: #fff;
  border-top: 1px solid #f2f2f2;
}

.top-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.col {
  padding: 34px 20px;
  border-right: 1px solid #f0f0f0;

  &:last-child {
    border-right: 0;
  }

  h4 {
    margin: 0 0 20px;
    color: #999;
    font-size: 18px;
    font-weight: 400;
  }
}

.mini-list {
  display: flex;
  gap: 12px;
}

.mini-card {
  width: 92px;
  height: 92px;
  border: 1px solid #ededed;
  color: #999;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #cfcfcf;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
}

.app-area {
  display: flex;
  gap: 12px;

  img {
    width: 92px;
    height: 92px;
    border: 1px solid #ededed;
    object-fit: cover;
    padding: 4px;
  }
}

.app-right {
  p {
    margin: 0 0 12px;
    color: #999;
    line-height: 1.5;
    font-size: 13px;
  }

  button {
    border: 0;
    color: #fff;
    background: #27ba9b;
    height: 60px;
    width: 86px;
    cursor: pointer;
  }
}

.hotline {
  .phone {
    margin: 8px 0;
    color: #666;
    font-size: 30px;
  }

  .time {
    margin: 0;
    color: #999;
    font-size: 14px;
  }
}

.mid {
  background: #333;
  border-top: 1px solid #434343;
}

.badge-row {
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.badge {
  color: #fff;
  font-size: 30px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.badge-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: relative;

  &::after {
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.bottom {
  background: #333;
  border-top: 1px solid #434343;
  padding: 24px 0 30px;
  text-align: center;
}

.link-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;

  a {
    color: #999;
    font-size: 14px;
    text-decoration: none;
    padding: 0 10px;
    border-right: 1px solid #999;
    line-height: 1;

    &:last-child {
      border-right: 0;
    }
  }
}

.copyright {
  margin: 14px 0 0;
  color: #999;
  font-size: 14px;
}
</style>
