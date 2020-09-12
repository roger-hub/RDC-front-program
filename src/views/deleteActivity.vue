<template>
  <div class="delete-wrapper">
    <confirm-activity @settleActivity="renderInfo" v-loading.fullscreen.lock="fullscreenLoading"></confirm-activity>
    <span class="divided-line"></span>
    <div class="delete-container">
      <div class="diasbled-cover-activity"></div>
      <span class="delete-span">删除全部活动信息：</span>
      <el-button type="primary" @click="deleteAll">确认删除</el-button>
    </div>
  </div>
</template>

<script>
import confirmActivity from "@/components/manageActivity/confirm/confirm-activity";

export default {
  components: {
    confirmActivity,
  },
  props: {},
  data() {
    return {
      fullscreenLoading: false,
      currentId: "",
    };
  },
  methods: {
    renderInfo(id) {
      this.fullscreenLoading = true;
      this.currentId = id;
      this.fullscreenLoading = false;
      document.querySelector(".diasbled-cover-activity").style.display = "none";
    },
    deleteAll() {
      this.$confirm("此操作将永久删除该活动信息, 是否继续?", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.fullscreenLoading = true;
          this.$axios
            .post("/api/active/delete", {
              id: this.currentId,
            })
            .then(() => {
              this.fullscreenLoading = false;
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              window.location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.delete-wrapper {
  width: 1000px;
}
.divided-line {
  display: block;
  width: 100%;
  border-bottom: 1px solid #999;
  margin: 20px 0 20px 0;
}
.delete-container {
  position: relative;
}
.diasbled-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: not-allowed;
  z-index: 1;
}
.delete-span {
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  color: #606266;
  display: inline-block;
  margin: 0 10px 0 40px;
}
</style>