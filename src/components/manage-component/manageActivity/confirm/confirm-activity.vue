<template>
<div class="block">
    <span class="select-span">请选择活动信息:</span>
    <el-cascader placeholder="选择你的信息" :options="options" :props="props" v-model="selectedValue" @change="handleChange"></el-cascader>
    <div class="preview-wrapper">
        <div class="preview-picture">图片预览：</div>
        <div class="preview-container">
            <img :src="picUrl" alt />
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            props: {
                value: "content",
                label: "content",
            },
            options: [],
            selectedValue: "",
            picUrl: "",
            id: "",
        };
    },
    methods: {
        handleChange() {
            this.$axios
                .post("/first/active/get", {
                    content: this.selectedValue[0],
                })
                .then((res) => {
                    this.picUrl = res.data[0].picture;
                    this.id = res.data[0].id;
                    this.$emit("settleActivity", this.id);
                });
        },
    },
    mounted() {
        this.$axios.post("/first/active/get", {}).then((res) => {
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

.preview-picture {
    float: left;
    margin: 100px 0 0 30px;
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
