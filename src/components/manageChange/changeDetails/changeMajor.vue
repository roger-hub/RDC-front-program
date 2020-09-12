<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :label-position="labelPosition"
    label-width="150px"
    class="demo-ruleForm"
  >
    <el-form-item label="您的学院及专业" prop="academy">
      <div class="block">
        <el-cascader
          placeholder="试试搜索：软件工程"
          :options="options"
          v-model="ruleForm.academy"
          filterable
          clearable
        ></el-cascader>
      </div>
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
        academy: "",
        major: "",
      },
      rules: {
        academy: [
          {
            required: true,
            message: "请选择专业信息",
            trigger: "change",
          },
        ],
      },
      options: [
        {
          value: "计算机学院",
          label: "计算机学院",
          children: [
            {
              value: "软件工程",
              label: "软件工程",
            },
            {
              value: "计算机科学与技术",
              label: "计算机科学与技术",
            },
            {
              value: "网络工程",
              label: "网络工程",
            },
            {
              value: "信息安全",
              label: "信息安全",
            },
          ],
        },
        {
          value: "自动化学院",
          label: "自动化学院",
          children: [
            {
              value: "自动化",
              label: "自动化",
            },
            {
              value: "电气工程及其自动化",
              label: "电气工程及其自动化",
            },
            {
              value: "物联网工程",
              label: "物联网工程",
            },
            {
              value: "数据科学与大数据技术",
              label: "数据科学与大数据技术",
            },
          ],
        },
        {
          value: "机电工程学院",
          label: "机电工程学院",
          children: [
            {
              value: "机械类",
              label: "机械类",
            },
            {
              value: "测控技术与仪器",
              label: "测控技术与仪器",
            },
            {
              value: "工业工程",
              label: "工业工程",
            },
          ],
        },
        {
          value: "材料与能源学院",
          label: "材料与能源学院",
          children: [
            {
              value: "材料类",
              label: "材料类",
            },
            {
              value: "材料成型与控制工程",
              label: "材料成型与控制工程",
            },
            {
              value: "能源与动力工程",
              label: "能源与动力工程",
            },
            {
              value: "微电子科学与工程",
              label: "微电子科学与工程",
            },
          ],
        },
        {
          value: "信息工程学院",
          label: "信息工程学院",
          children: [
            {
              value: "电子信息类",
              label: "电子信息类",
            },
          ],
        },
        {
          value: "轻工化工学院",
          label: "轻工化工学院",
          children: [
            {
              value: "化学工程与工艺",
              label: "化学工程与工艺",
            },
            {
              value: "应用化学",
              label: "应用化学",
            },
            {
              value: "食品科学与工程",
              label: "食品科学与工程",
            },
          ],
        },
        {
          value: "土木与交通工程学院",
          label: "土木与交通工程学院",
          children: [
            {
              value: "土木类",
              label: "土木类",
            },
            {
              value: "测绘工程",
              label: "测绘工程",
            },
            {
              value: "交通运输",
              label: "交通运输",
            },
            {
              value: "工程管理",
              label: "工程管理",
            },
          ],
        },
      ],
      labelPosition: "right",
      fullscreenLoading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.seperateMajor();
          this.handleInfo(this.ruleForm.academy, this.ruleForm.major);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleInfo(academy, major) {
      this.fullscreenLoading = true;
      this.$axios
        .post("api/member/put", {
          id: this.userid,
          name: this.username,
          college: academy,
          major: major,
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
    seperateMajor() {
      this.ruleForm.major = this.ruleForm.academy[1];
      this.ruleForm.academy = this.ruleForm.academy[0];
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