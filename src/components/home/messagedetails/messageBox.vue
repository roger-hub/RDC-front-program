<template>
<div class="message-box">
    <div class="message-box-left">
        <!-- <img src="./demo.svg" alt class="svg-demo" /> -->
        <svg-icon iconClass="demo"></svg-icon>
    </div>
    <div class="message-box-right">
        <h3>我要发表看法</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="name">
                <el-input prefix-icon="el-icon-user" type="text" v-model="ruleForm.name" class="name-text" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="mail">
                <el-input type="mail" v-model="ruleForm.mail" class="mail-text" prefix-icon="el-icon-message">
                    <!-- <i slot="prefix" class="element-icons el-icon-mail"></i> -->
                </el-input>
            </el-form-item>
            <el-form-item prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入你的留言"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submit-btn">发表</el-button>
                <el-button @click="resetForm('ruleForm')" class="reset-btn">重置</el-button>
                <el-button plain class="invisbleBtn">右上角</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        var checkName = (rule, value, callback) => {
            const mailReg = /^[\u4E00-\u9FA5A-Za-z]+$/;
            if (!value) {
                return callback(new Error("大名不能为空"));
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入正确的大名"));
                }
            }, 100);
        };
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!value) {
                return callback(new Error("邮箱不能为空"));
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入正确的邮箱格式"));
                }
            }, 100);
        };
        return {
            ruleForm: {
                mail: "",
                desc: "",
                name: "",
            },
            rules: {
                desc: [{
                    required: true,
                    message: "请输入要给我们的留言",
                    trigger: "blur",
                }, ],
                name: [{
                    validator: checkName,
                    required: true,
                    trigger: "blur",
                }, ],
                mail: [{
                    validator: checkEmail,
                    required: true,
                    trigger: "blur",
                }, ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleMessage(
                        this.ruleForm.name,
                        this.ruleForm.mail,
                        this.ruleForm.desc
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
        handleMessage(name, mail, content) {
            this.$axios
                .post("/first/message/postMessage", {
                    username: name,
                    email: mail,
                    content: content,
                })
                .then((res) => {
                    this.successMessage();
                    this.resetForm("ruleForm");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        successMessage() {
            this.$notify({
                title: "发表成功",
                message: "请等待管理员审核",
                duration: 2500,
            });
        },
    },
};
</script>

<style scoped>
.el-form /deep/.el-form-item__content {
    margin-top: 20px;
}

.el-input /deep/ .el-input__inner {
    text-indent: 3em;
    background-color: #eaeeef;
    border-radius: 25px;
    border: none !important;
    height: 50px;
}

.message-box {
    width: 1000px;
    height: 600px;
    margin: 80px auto 30px;
    border-radius: 50px;
    padding: 12px 10px;
    box-sizing: border-box;
    border: 1px solid #666;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.message-box-right {
    width: 400px;
    float: right;
}

.message-box-left {
    width: 500px;
    float: left;
}

.svg-demo {
    margin-top: 90px;
    width: 500px;
    height: 400px;
    margin-left: 10px;
}

.message-box-right>h3 {
    margin: 50px 0 10px 0;
    margin-bottom: 10px;
    color: #666;
}

.message-box /deep/ textarea {
    padding-left: 3px;
    height: 130px;
    border: 1px solid #666;
    font-size: 14px;
}

.message-box /deep/ textarea::placeholder {
    font-size: 14px;
}

.el-input /deep/.el-input__inner {
    padding-left: 3px;
    border: 1px solid #666;
}

.name-text /deep/ .el-input__inner,
.mail-text /deep/ .el-input__inner {
    width: 300px;
}

.invisbleBtn {
    width: 0;
    height: 0;
    display: none;
}

.el-iconyoujian {
    margin: 7px 0 0 7px;
    font-size: 14px;
}

.mail-text /deep/ .el-input__prefix {
    line-height: 50px;
    margin-left: 10px;
}

.name-text /deep/ .el-input__prefix {
    margin-left: 10px;
}

.message-box /deep/ i {
    font-size: 16px;
}

.message-box /deep/ textarea {
    background-color: #eaeeef;
    resize: none;
    border-radius: 25px;
    width: 300px;
    border: none;
    text-indent: 1em;
}

.reset-btn,
.submit-btn {
    width: 145px;
    margin-bottom: 10px;
    border-radius: 30px;
}
</style>
