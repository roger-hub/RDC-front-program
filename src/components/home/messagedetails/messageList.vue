<template>
<div class="list-wrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <span class="list-wrapper-line"></span>
    <ul>
        <every-message v-for="(item, index) in passMessage" :everyItem="item" :key="passMessage[index].messageId"></every-message>
    </ul>
    <div class="block">
        <el-pagination :page-size="5" layout="prev, pager, next, jumper" :total="length" @current-change="handleCurrentChange"></el-pagination>
    </div>
</div>
</template>

<script>
import everyMessage from "@/components/home/messagedetails/everyMessage";
export default {
    components: {
        everyMessage,
    },
    data() {
        return {
            pageCount: 5,
            passMessage: [],
            length: 0,
            fullscreenLoading: true,
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.$axios
                .post("/first/message/getMessageByPage", {
                    start: (val - 1) * this.pageCount,
                    limit: this.pageCount,
                })
                .then((res) => {
                    (this.fullscreenLoading = false),
                    (this.passMessage = res.data.filter((obj) =>
                        Boolean(obj.messageStatus)
                    ));
                    this.$emit("isEmpty", this.passMessage.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.$axios.post("/first/message/getAllNumber", {}).then((res) => {
            this.length = res.data;
        });
        this.handleCurrentChange(1);
    },
};
</script>

<style scoped>
ul {
    padding: 0;
}

.list-wrapper {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
}

.list-wrapper>h2 {
    width: 800px;
    display: block;
    font-size: 18px;
    color: #666;
    margin-left: 100px;
    margin-top: 50px;
}

.list-wrapper-line,
.every-wrapper-line {
    width: 1000px;
    display: block;
    border-bottom: 2px solid #777;
    margin: 30px 0;
    margin-left: 100px;
}

.block {
    margin-top: 20px;
    text-align: center;
}

/deep/ .el-pager li.active {
    color: #0d6aa7;
}
</style>
