<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="150px" class="demo-ruleForm">
    <el-form-item label="需要修改的图片" prop="picture">
        <el-input type="text" v-model="ruleForm.picture" class="avatar-text" placeholder="推荐使用https://imgurl.org 上传图片获取url再复制至此"></el-input>
    </el-form-item>
    <div class="preview-wrapper">
        <div class="preview-picture">图片预览：</div>
        <div class="preview-container">
            <img :src="ruleForm.picture" alt />
        </div>
    </div>
    <el-form-item class="radio-summit-group">
        <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">更改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button plain class="invisbleBtn" @click="successMessage">右上角</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    components: {},
    props: {
        activityId: {
            type: String | Number,
            required: true,
        },
    },
    data() {
        return {
            ruleForm: {
                picture: "",
            },
            rules: {
                picture: [{
                    required: true,
                    message: "请输入活动的内容",
                    trigger: "blur",
                }, ],
            },
            labelPosition: "right",
            fullscreenLoading: false,
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleInfo(this.ruleForm.picture);
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
                .post("/first/active/put", {
                    id: this.activityId,
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

.preview-picture {
    float: left;
    margin: 100px 0 0 70px;
    font-size: 14px;
}

.preview-wrapper {
    width: 100%;
    height: 200px;
    margin-top: 20px;
}

.preview-container {
    float: left;
    width: 200px;
    height: 200px;
    border: 1px solid #999;
    margin-left: 10px;
}

img {
    width: 200px;
    height: 200px;
}
</style>
