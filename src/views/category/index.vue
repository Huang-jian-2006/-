<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getsort } from "@/api/sort";
import Dispaly from "./components/dispaly.vue";
import Backtop from "@/components/backtop.vue";
import Everycategory from "./components/everycategory.vue";

const route = useRoute();
const categoryName = ref("");
const categoryChildren = ref([]);

const loadCategoryData = async (id) => {
  if (!id) {
    categoryName.value = "";
    categoryChildren.value = [];
    return;
  }

  const response = await getsort(id);
  const result = response.data?.result ?? {};
  categoryName.value = result.name ?? "";
  categoryChildren.value = result.children ?? [];
};

watch(
  () => route.params.id,
  (newId) => {
    loadCategoryData(newId);
  },
  { immediate: true }
);
</script>
<template>
  <Backtop />
  <div class="category">
    <Everycategory :name="categoryName" :sortmessage="categoryChildren" />
    <Dispaly :sortmessage="categoryChildren" />
  </div>
</template>
<style>
.category {
  width: 100%;
  background: rgb(245, 245, 245);
  background-color: rgb(245, 245, 245);
  padding: 0 0 20px 0;
}
</style>
