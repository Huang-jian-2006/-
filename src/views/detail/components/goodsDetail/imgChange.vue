<script setup>
import { computed, ref } from "vue";

const imageList = ref([
  {
    img: "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
    id: 1,
    action: true,
  },
  {
    img: "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
    id: 2,
    action: false,
  },
  {
    img: "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
    id: 3,
    action: false,
  },
  {
    img: "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
    id: 4,
    action: false,
  },
  {
    img: "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg",
    id: 5,
    action: false,
  },
]);

const activeImg = computed(() => {
  return (
    imageList.value.find((item) => item.action)?.img ||
    imageList.value[0]?.img ||
    ""
  );
});

const showZoom = ref(false);
const maskLeft = ref(0);
const maskTop = ref(0);
const smallSize = 400;
const maskSize = 180;
const previewSize = 400;
const zoomScale = 2;
const maxMaskMove = smallSize - maskSize;
const maxPreviewMove = smallSize * zoomScale - previewSize;

const previewStyle = computed(() => ({
  backgroundImage: `url(${activeImg.value})`,
  backgroundSize: `${smallSize * zoomScale}px ${smallSize * zoomScale}px`,
  backgroundPosition: `-${
    maxMaskMove > 0 ? (maskLeft.value / maxMaskMove) * maxPreviewMove : 0
  }px -${
    maxMaskMove > 0 ? (maskTop.value / maxMaskMove) * maxPreviewMove : 0
  }px`,
}));

const changeImg = (id) => {
  imageList.value.forEach((item) => {
    item.action = item.id === id;
  });
};

const handleMouseEnter = () => {
  showZoom.value = true;
};

const handleMouseLeave = () => {
  showZoom.value = false;
};

const handleMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();

  let left = event.clientX - rect.left - maskSize / 2;
  let top = event.clientY - rect.top - maskSize / 2;

  left = Math.max(0, Math.min(left, smallSize - maskSize));
  top = Math.max(0, Math.min(top, smallSize - maskSize));

  maskLeft.value = left;
  maskTop.value = top;
};
</script>
<template>
  <div class="goods-imge">
    <div class="left-panel">
      <div
        class="showimg"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove"
      >
        <img v-img-lazy="activeImg" alt="" />
        <div
          v-if="showZoom"
          class="mask"
          :style="{
            left: `${maskLeft}px`,
            top: `${maskTop}px`,
          }"
        ></div>
      </div>
      <div class="changimg">
        <div
          class="imgbox"
          v-for="item in imageList"
          :key="item.id"
          :class="{ activebox: item.action }"
        >
          <img
            v-img-lazy="item.img"
            :class="{ activeimg: item.action }"
            @mouseenter="changeImg(item.id)"
          />
        </div>
      </div>
    </div>
    <div v-if="showZoom" class="zoom-preview" :style="previewStyle"></div>
  </div>
</template>
<style lang="scss" scoped>
.goods-imge {
  position: relative;
  display: flex;
  width: 480px;
  overflow: visible;
}

.left-panel {
  width: 480px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  overflow: visible;
}

.showimg {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .mask {
    position: absolute;
    width: 180px;
    height: 180px;
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }
}

.changimg {
  display: flex;
  flex-direction: column;
  width: 64px;
  .imgbox {
    margin: 0 0 15px 12px;
    width: 64px;
    height: 64px;
    border: 2px solid transparent;
    overflow: hidden;
    img {
      width: 64px;
      height: 64px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
  }
  .activebox {
    border-color: rgb(39, 187, 154);
  }
}

.zoom-preview {
  position: absolute;
  top: 0;
  left: 413px;
  width: 400px;
  height: 400px;
  border: 1px solid #f0f0f0;
  background-repeat: no-repeat;
  background-color: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  z-index: 999;
}
</style>
