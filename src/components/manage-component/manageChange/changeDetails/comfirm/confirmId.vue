<template>
  <div class="block">
    <span class="select-span">请选择你的信息:</span>
    <el-cascader
      placeholder="选择你的信息"
      :options="options"
      :props="props"
      v-model="selectedValue"
      @change="handleChange"
      :show-all-levels="false"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      props: {
        value: "name",
        label: "name",
        children: "children",
      },
      options: [],
      selectedValue: "",
    };
  },
  methods: {
    handleChange() {
      this.$emit("settleInfo", this.selectedValue);
    },
  },
  mounted() {
    this.$axios
      .post("/first/member/get", {
        stat: 2,
      })
      .then((res) => {
        this.options = res.data;
      });
  },
};
</script>
<style scoped>
.select-span {
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  color: #606266;
  display: inline-block;
  margin-right: 10px;
}
.block {
  margin-left: 40px;
}
</style>