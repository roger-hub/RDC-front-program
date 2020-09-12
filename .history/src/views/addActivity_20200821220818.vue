<template>
  <div class="add-wrapper">
    <TopBar/>
      <SubBar>
          <span slot="fir">研发介绍</span>
          <span slot="sec">新增活动</span>
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
      <el-form-item label="活动的名称" prop="name">
        <el-input type="text" v-model="ruleForm.name" class="name-text" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="您的照片地址" prop="picture">
        <el-input
          type="text"
          v-model="ruleForm.picture"
          class="avatar-text"
          placeholder="推荐使用https://imgurl.org上传图片获取url再复制至此"
        ></el-input>
      </el-form-item>
      <div class="preview-wrapper">
        <div class="preview-picture">图片预览：</div>
        <div class="preview-container">
          <img :src="ruleForm.picture" alt />
        </div>
      </div>
      <el-form-item class="radio-summit-group">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-loading.fullscreen.lock="fullscreenLoading"
        >创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button plain class="invisbleBtn" @click="successMessage">右上角</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'
import SubBar from '@/components/SubBar.vue'
export default {
  components:{
        Aside,
        TopBar,
        SubBar
    },
  data() {
    return {
      ruleForm: {
        name: "",
        picture: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        picture: [
          {
            required: true,
            message: "请输入活动图片的照片地址",
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
          this.handleInfo(this.ruleForm.name, this.ruleForm.picture);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleInfo(content, picture) {
      this.fullscreenLoading = true;
      this.$axios
        .post("/api/active/post", {
          content,
          picture,
        })
        .then((res) => {
          console.log(res);
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
        message: "新活动创建成功",
        duration: 2500,
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.add-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #fff;
}
img {
  width: 200px;
  height: 200px;
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
.name-text {
  width: 200px;
}
.avatar-text {
  width: 400px;
}
.preview-picture {
  float: left;
  margin: 100px 0 0 50px;
  font-size: 14px;
}
.preview-wrapper {
  width: 100%;
  height: 200px;
}
.preview-container {
  float: left;
  width: 200px;
  height: 200px;
  border: 1px solid #999;
  margin-left: 10px;
}

.inner{
  margin-top: 50px;
  margin-left: 50px;
  height: 545px;
  width: 80%;
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