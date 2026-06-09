<script setup lang="ts">
interface Props {
  bigtitle?: string;
  smalltitle?: string[];
}

const message = withDefaults(defineProps<Props>(), {
  bigtitle: "默认标题",
});
</script>
<template>
  <section class="title">
    <span>{{ message.bigtitle }}</span>
    <template v-if="message.smalltitle?.length">
      <span
        v-for="(item, index) in message.smalltitle"
        :key="`${item}-${index}`"
      >
        {{ item }}
      </span>
    </template>
  </section>
</template>
<style lang="scss" scoped>
.title {
  height: 120px;
  line-height: 120px;
  span:nth-child(1) {
    font-size: 32px;
  }
  span:nth-child(2),
  span:nth-child(3) {
    font-size: 16px;
    color: rgb(153, 153, 153);
    margin-left: 20px;
  }
}
</style>
