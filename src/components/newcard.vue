<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const messge = defineProps({
  picture: String,
  name: String,
  price: [String, Number],
  id: [String, Number],
});
const getdetail = (id) => {
  router.push(`/detail/${id}`);
};
</script>
<template>
  <div class="card" @click="getdetail(messge.id)">
    <div>
      <img class="cover-img" v-img-lazy="messge.picture" alt="" />
    </div>
    <div class="name-wrap">
      <span class="name">{{ messge.name }}</span>
    </div>
    <div class="price">
      <img
        src="../assets/icon/qian.svg"
        loading="lazy"
        decoding="async"
        alt=""
        class="price-icon"
      />
      <span class="price-value">{{ messge.price }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  cursor: pointer;
  width: 306px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
  }

  .cover-img {
    width: 100%;
    display: block;
  }

  .name-wrap {
    background-color: rgb(240, 249, 244);
    width: 100%;
    line-height: 60px;
    height: 60px;
  }

  .name {
    display: block;
    width: 100%;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    background-color: rgb(240, 249, 244);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cf4444;
    font-weight: 600;
    height: 60px;
    line-height: 60px;
  }

  .price-icon {
    color: #cf4444;
    width: 30px;
    height: 30px;
    object-fit: contain;
    margin-right: 4px;
  }

  .price-value {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
