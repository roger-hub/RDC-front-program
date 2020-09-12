<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :label-position="labelPosition"
    label-width="150px"
    class="demo-ruleForm"
  >
    <el-form-item label="您的照片地址" prop="avatar">
      <el-input
        type="text"
        v-model="ruleForm.avatar"
        class="avatar-text"
        placeholder="推荐使用https://imgurl.org 上传图片获取url再复制至此"
      ></el-input>
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
        avatar: "",
      },
      rules: {
        avatar: [
          {
            required: true,
            message: "请输入你的图片地址",
            trigger: "blur",
          },
        ],
      },
      labelPosition: "right",
      fullscreenLoading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleInfo(this.ruleForm.avatar);
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
          name: name,
          picture: newInfo,
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
.avatar-text {
  width: 400px;
}
</style>