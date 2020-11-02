<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label">外部博客</span>
        <blog-card-all></blog-card-all>
      </el-tab-pane>
      <el-tab-pane label="内部分享" name="second" disabled></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BlogCardAll from "@/components/share/childComps/BlogCardAll";
export default {
  components: {
    BlogCardAll,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
.el-tabs {
  padding: 0 0 0 10px;
}
.el-tabs__nav-wrap::after {
  background-color: inherit;
}
.el-tabs__item:hover {
  color: #0d6aa7;
}
.el-tabs__item.is-active {
  color: #0d6aa7;
}
.el-tabs__active-bar {
  background-color: #0d6aa7;
}
</style>
