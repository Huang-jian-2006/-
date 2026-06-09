<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import Goodcard from "@/components/goodcard.vue";

const props = defineProps({
  sortmessage: {
    type: Array,
    default: () => [],
  },
});

const activeSectionIds = ref([]);
const sectionRefs = ref([]);
let observer = null;

const setSectionRef = (element, index) => {
  if (!element) return;
  sectionRefs.value[index] = element;
};

const isSectionActive = (id) => activeSectionIds.value.includes(id);

const activateSectionByIndex = (index) => {
  const section = props.sortmessage[index];
  if (!section || isSectionActive(section.id)) return;
  activeSectionIds.value = [...activeSectionIds.value, section.id];
};

const observeSections = async () => {
  if (!observer) return;
  observer.disconnect();
  await nextTick();
  sectionRefs.value.forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });
};

const resetVisibleSections = async () => {
  sectionRefs.value = [];
  activeSectionIds.value = props.sortmessage.slice(0, 1).map((item) => item.id);
  await observeSections();
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const index = Number(entry.target.dataset.index);
    if (Number.isNaN(index)) return;
    activateSectionByIndex(index);
    activateSectionByIndex(index + 1);
  });
};

if (typeof window !== "undefined") {
  observer = new IntersectionObserver(handleIntersect, {
    rootMargin: "400px 0px",
    threshold: 0,
  });
}

watch(
  () => props.sortmessage,
  () => {
    resetVisibleSections();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>
<template>
  <div
    class="body"
    v-for="(section, index) in props.sortmessage"
    :key="section.id"
    :ref="(element) => setSectionRef(element, index)"
    :data-index="index"
  >
    <div class="title">-{{ section.name }}-</div>
    <div v-if="isSectionActive(section.id)" class="display">
      <Goodcard
        v-for="item in section.goods"
        :key="item.id"
        :picture="item.picture"
        :name="item.name"
        :price="item.price"
        :id="item.id"
        :desc="item.desc"
      />
    </div>
    <div v-else class="display-placeholder"></div>
  </div>
</template>
<style scoped lang="scss">
.body {
  width: 1200px;
  min-height: 400px;
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  .title {
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: rgb(102, 102, 102);
    margin-bottom: 20px;
  }
  .display {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
  }

  .display-placeholder {
    height: 300px;
  }
}
</style>
