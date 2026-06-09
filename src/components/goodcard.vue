<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const messge = defineProps({
  picture: String,
  name: String,
  price: [String, Number],
  id: [String, Number],
  desc: String,
  change: {
    type: Number,
    default: 1,
  },
});
const getdetail = (id) => {
  router.push(`/detail/${id}`);
};
</script>
<template>
  <div
    @click="getdetail(messge.id)"
    class="card"
    :style="{ '--change': messge.change }"
  >
    <div>
      <img
        class="cover-img"
        width="160"
        height="160"
        v-img-lazy="messge.picture"
        alt=""
      />
    </div>
    <div class="name-wrap">
      <div class="name">{{ messge.name }}</div>
      <div class="desc">{{ messge.desc }}</div>
    </div>
    <div class="price">
      <img src="../assets/icon/qian.svg" alt="" class="price-icon" />
      <span class="price-value">{{ messge.price }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  padding: calc(20px * var(--change)) calc(30px * var(--change));
  cursor: pointer;
  width: calc(220px * var(--change));
  height: calc(300px * var(--change));
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(calc(-2px * var(--change)));
    box-shadow: 0 calc(6px * var(--change)) calc(12px * var(--change))
      rgba(0, 0, 0, 0.1);
  }

  .cover-img {
    width: 100%;
    display: block;
  }

  .name-wrap {
    width: 100%;
    height: calc(48px * var(--change));
    overflow: hidden;
  }

  .name {
    display: block;
    width: 100%;
    font-size: calc(15px * var(--change));
    line-height: calc(24px * var(--change));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    text-align: center;
    color: rgb(153, 153, 153);
    font-weight: 400;
    display: block;
    width: 100%;
    font-size: calc(15px * var(--change));
    line-height: calc(24px * var(--change));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cf4444;
    font-weight: 600;
    height: calc(30px * var(--change));
    line-height: calc(30px * var(--change));
  }

  .price-icon {
    color: #cf4444;
    width: calc(16px * var(--change));
    height: calc(16px * var(--change));
    object-fit: contain;
    margin-right: calc(4px * var(--change));
  }

  .price-value {
    font-size: calc(13px * var(--change));
    line-height: 1;
  }
}
</style>
