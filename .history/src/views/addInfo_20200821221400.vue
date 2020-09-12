<template>
  <div class="add-wrapper">
      <TopBar/>
      <SubBar>
          <span slot="fir">研发介绍</span>
          <span slot="sec">新增成员</span>
      </SubBar>
      <Aside class="aside"/>
    <div class="inner">
      <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      :label-position="labelPosition"
      label-width="130px"
      class="demo-ruleForm"
    >
      <!-- 姓名 -->
      <el-form-item label="您的姓名" prop="name">
        <el-input type="text" v-model="ruleForm.name" class="name-text" maxlength="10"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 年级 -->
      <el-form-item label="您的年级" prop="grade">
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
      <!-- 学院及专业 -->
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
      <!-- 方向 -->
      <el-form-item label="您的方向" prop="direction">
        <el-select
          v-model="ruleForm.direction"
          placeholder="请选择你的方向"
          clearable
          class="checkbox-direction"
        >
          <el-option
            v-for="item in directions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 介绍 -->
      <el-form-item label="您的介绍" prop="introduction">
        <el-input
          type="textarea"
          v-model="ruleForm.introduction"
          placeholder="请输入你的介绍"
          :autosize="{ minRows: 4, maxRows: 8}"
          class="text-introduction"
          maxlength="100"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- 照片 -->
      <el-form-item label="您的照片地址" prop="avatar">
        <el-input
          type="text"
          v-model="ruleForm.avatar"
          class="avatar-text"
          placeholder="推荐使用https://imgurl.org上传图片获取url再复制至此"
        ></el-input>
      </el-form-item>
      <!-- 发表和重置控件 -->
      <el-form-item class="radio-summit-group">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-loading.fullscreen.lock="fullscreenLoading"
        >发表</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button plain class="invisbleBtn" @click="successMessage">右上角</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import SubBar from '@/components/SubBar.vue'
import TopBar from '@/components/TopBar.vue'
import Aside from '@/components/Aside.vue'
export default {
  components: {
    Aside,
    TopBar,
    SubBar
  },
  props: {},
  data() {
    // 姓名验证（中文且为2-5个字）
    var checkName = (rule, value, callback) => {
      const mailReg = /^[\u4E00-\u9FA5]{2,5}$/;
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的姓名"));
        }
      }, 100);
    };
    return {
      ruleForm: {
        name: "",
        gender: "",
        grade: "",
        academy: "",
        major: "",
        direction: "",
        introduction: "",
        avatar: "",
      },
      rules: {
        introduction: [
          {
            required: true,
            message: "请输入你的介绍信息",
            trigger: "blur",
          },
        ],
        name: [
          {
            validator: checkName,
            required: true,
            trigger: "blur",
          },
        ],
        grade: [
          {
            required: true,
            message: "请选择你的年级",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "请选择你的性别",
            trigger: "change",
          },
        ],
        academy: [
          {
            required: true,
            message: "请选择专业信息",
            trigger: "change",
          },
        ],
        direction: [
          {
            required: true,
            message: "请选择你的方向",
            trigger: "change",
          },
        ],
        introduction: [
          {
            required: true,
            message: "请输入你的介绍信息",
            trigger: "change",
          },
        ],
        avatar: [
          {
            required: true,
            message: "请输入你的图片地址",
            trigger: "blur",
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
      directions: [
        { value: "前端", label: "前端" },
        { value: "后台", label: "后台" },
        { value: "安卓", label: "安卓" },
        { value: "大数据", label: "大数据" },
      ],
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
          this.seperateMajor();
          this.handleInfo(
            this.ruleForm.name,
            this.ruleForm.gender,
            this.ruleForm.grade,
            this.ruleForm.academy,
            this.ruleForm.major,
            this.ruleForm.direction,
            this.ruleForm.introduction,
            this.ruleForm.avatar
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleInfo(
      name,
      gender,
      grade,
      academy,
      major,
      direction,
      introduction,
      avatar
    ) {
      this.fullscreenLoading = true;
      this.$axios
        .post("/api/member/post", {
          name: name,
          sex: gender,
          grade: grade,
          college: academy,
          major: major,
          direction: direction,
          introduce: introduction,
          picture: avatar,
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
        message: "新成员创建成功",
        duration: 2500,
      });
    },
    seperateMajor() {
      this.ruleForm.major = this.ruleForm.academy[1];
      this.ruleForm.academy = this.ruleForm.academy[0];
    },
  },
};
</script>


<style scoped>
.add-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #fff;
}
.name-text {
  width: 200px;
}
.avatar-text {
  width: 400px;
}
.checkbox-direction {
  margin-top: 10px;
}
.text-introduction {
  width: 400px;
}
.el-radio-group {
  margin-left: 2px;
}
.radio-summit-group /deep/ .el-form-item__content {
  margin-top: 12px;
}
.invisbleBtn {
  display: none;
  width: 0;
  height: 0;
}
.inner{
  margin-top: 50px;
  height: 545px;
  width: 50%;
  float: right;
}
.inner::-webkit-scrollbar{
  width: 30px;
}
.inner::-webkit-scrollbar {
/*滚动条整体样式*/
width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
height: 1px;
}
.inner::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
border-radius: 10px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
background: #535353;
}
</style>