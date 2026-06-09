<script setup>
import { useRouter, useRoute } from "vue-router";
import logo from "@/assets/images/logo.png";
import { headAPI } from "@/api/home/head";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
const router = useRouter();
const route = useRoute();

const headtext = ref([]);
const isFixed = ref(false);

onBeforeMount(async () => {
  headtext.value = (await headAPI()).data.result;
});

const getcategory = (id) => {
  router.push(`/category/${id}`);
};
const backhome = () => {
  router.push("/");
};

const handleScroll = () => {
  const nextFixed = window.scrollY >= 220;
  if (nextFixed !== isFixed.value) {
    isFixed.value = nextFixed;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div class="table" :class="{ 'table-fixed': isFixed }" v-show="isFixed">
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
    <div class="apart"></div>
    <div class="ordertext">品牌</div>
    <div class="ordertext">专题</div>
  </div>
</template>
<style scoped lang="scss">
.table {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
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
.table-fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
.table .classbox .classtext.action {
  color: rgb(67, 190, 161);
  border-bottom: 2px solid rgb(67, 190, 161);
}
.responsive-input {
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
}
.apart {
  width: 2px;
  height: 20px;
  background-color: rgb(67, 190, 161);
}
.ordertext {
  margin-left: 36px;
  cursor: pointer;
  line-height: 36px;
  width: 36px;
  height: 36px;
  font-size: 18px;
  border-bottom: 2px solid transparent;
}
.ordertext:hover {
  color: rgb(67, 190, 161);
  border-bottom-color: rgb(67, 190, 161);
}
</style>
