<script setup>
import Card from "@/components/newcard.vue";
import { newgood } from "@/api/home";
import { onBeforeMount, ref } from "vue";
import Title from "@/components/title.vue";
const cardmessage = ref([]);
onBeforeMount(async () => {
  cardmessage.value = (await newgood()).data.result;
});
</script>
<template>
  <div class="newgood">
    <Title :bigtitle="`新鲜好物`" :smalltitle="[`新鲜出品`, `品质靠谱`]" />
    <body class="body">
      <Card
        v-for="item in cardmessage"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :picture="item.picture"
        :price="item.price"
      />
    </body>
  </div>
</template>
<style scoped lang="scss">
.newgood {
  width: 1240px;
  margin: 0 auto;
  .body {
    gap: 6px;
    display: flex;
    justify-content: left;
    margin: 0 auto;
  }
}
</style>
