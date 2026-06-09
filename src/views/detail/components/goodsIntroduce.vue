<script setup>
import Backtop from "@/components/backtop.vue";
const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <Backtop />
  <div class="mainbox" v-loading="props.loading">
    <div v-if="props.message.details">
      <div class="title">商品详情</div>
      <div class="note" v-loading="props.loading">
        <dl
          v-for="(item, index) in props.message.details.properties?.slice(
            0,
            2
          ) || []"
          :key="index"
        >
          <dt v-if="item.name">
            {{ item.name }}
          </dt>
          <dd v-if="item.value">
            {{ item.value }}
          </dd>
        </dl>
      </div>
      <img
        v-img-lazy="item"
        alt=""
        v-for="(item, index) in props.message.details.pictures"
        :key="index"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.mainbox {
  width: 940px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: rgb(255, 255, 255);
  .title {
    display: flex;
    align-items: center;
    width: 72px;
    padding: 0 40px;
    height: 70px;
    font-size: 18px;
    color: rgb(51, 51, 51);
    text-align: center;
    font-weight: 500;
  }
  .note {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 40px;
    dl {
      display: flex;
      dt {
        width: 80px;
        color: rgb(102, 102, 102);
        font-size: 14px;
      }
      dd {
        width: 300px;
        color: rgb(102, 102, 102);
        font-size: 14px;
      }
    }
  }
  img {
    display: block;
    width: 860px;
    margin: 0 auto;
  }
}
</style>
