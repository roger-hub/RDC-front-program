<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :label-position="labelPosition"
    label-width="150px"
    class="demo-ruleForm"
  >
    <el-form-item label="需要更改的年级" prop="grade">
      <el-select v-model="ruleForm.grade" placeholder="请选择你的年级" clearable>
        <el-option
          v-infinite-scroll="load"
          style="overflow:auto"
          v-for="index in gradeCount"
          :key="index"
          :value="index + 17"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="radio-summit-group">
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        v-loading.fullscreen.lock="fullscreenLoading"
      >更改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button plain class="invisbleBtn" @click="successMessage">右上角</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    userid: {
      type: String | Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ruleForm: {
        grade: "",
      },
      rules: {
        grade: [
          {
            required: true,
            message: "请选择你的年级",
            trigger: "change",
          },
        ],
      },
      labelPosition: "right",
      gradeCount: 2018,
      fullscreenLoading: false,
    };
  },
  methods: {
    load() {
      this.gradeCount += 2;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleInfo(this.ruleForm.grade);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleInfo(newInfo) {
      this.fullscreenLoading = true;
      this.$axios
        .post("api/member/put", {
          id: this.userid,
          name: this.username,
          grade: newInfo,
        })
        .then((res) => {
          this.fullscreenLoading = false;
          this.successMessage();
          this.resetForm("ruleForm");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    successMessage() {
      this.$notify({
        title: "恭喜你",
        message: "修改成功",
        duration: 2500,
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.name-text {
  width: 200px;
}
.el-radio-group {
  margin-left: 30px;
}
.radio-summit-group /deep/ .el-form-item__content {
  margin-top: 12px;
}
.invisbleBtn {
  width: 0;
  height: 0;
  display: none;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>