<template>
  <el-menu-item :index="indexCount()" @click="spread(currentItem,detailgrade)">20{{detailgrade}}级</el-menu-item>
</template>

<script>
export default {
  components: {},
  props: {
    detailgrade: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    specificIndex: {
      type: Number,
      required: true,
    },
    currentItem: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    indexCount() {
      return this.currentIndex + "-" + this.specificIndex;
    },
    spread(direction, grade) {
      this.$emit("spreadClick", {
        direction,
        grade,
      });
    },
  },
};
</script>
<style scoped>
</style>