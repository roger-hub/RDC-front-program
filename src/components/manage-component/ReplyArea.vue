<template>
<div class="message-comment" :id="id">
    <span class="comment-line"></span>
    <div class="reply-container">
        <h4>管理员 回复：</h4>
        <p v-for="(item,index) in commentReply" :key="index" :id="replyId[index]">
            回复{{index + 1}} : {{item}}
            <i class="el-icon-delete" @click="deleteReply($event)"></i>
        </p>
    </div>
    <!-- <div class="block">
          <el-pagination
            :page-size="3"
            layout="prev, pager, next, jumper"
            :total="passMessage.length"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div> -->
</div>
</template>

<script>
export default {
    name: "ReplyArea",
    data() {
        return {
            pageCount: 10,
            passMessage: [],
            commentReply: [],
            replyId: [],
        };
    },
    props: ['id'],
    methods: {
        handleCurrentChange(val) {
            this.$axios
                .post("/first/message/getAdminMessageByPage", {
                    start: (val - 1) * this.pageCount,
                    limit: this.pageCount,
                })
                .then((res) => {
                    console.log(res);
                    this.passMessage = res.data.filter((obj) =>
                        Boolean(obj.messageStatus)
                    );
                    // this.$emit("isEmpty", this.passMessage.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteReply(e) {
            const target = e.target;
            const self = target.parentElement
            const bool = confirm('是否删除此条评论？');
            if (bool) {
                const ids = self.id;
                this.$axios.post('/first/comment/delete', {
                    commentId: ids,
                    messageId: this.id
                })
                this.getComment();
            } else {
                return;
            }
        },
        getComment() {
            this.$axios.post('/first/comment/get', {
                'messageId': this.id
            }).then(res => {
                const arr = res.data
                if (arr !== []) {
                    this.isReplied = true;
                    this.commentReply = arr.map(item => item.commentContent);
                    this.replyId = arr.map(item => item.commentId);
                }
            }).catch(err => {
                console.log(err);
            })
        },
    },
    mounted() {
        this.getComment();
    },
    updated() {
        this.getComment();
    }
}
</script>

<style scoped>
.reply-container {
    width: 750px;
    border: 2px solid #efefef;
    border-radius: 10px;
    padding: 15px 20px 10px;
    margin: 30px auto 0;
}

.message-comment h4 {
    font-weight: 600;
    display: inline-block;
    margin: 0 5px 20px 0px;
    color: #0D6AA7;
}

.message-comment p {
    display: block;
    margin: 0 0 30px 88px;
}

.block {
    margin-top: 20px;
    text-align: center;
    margin-bottom: 30px;
}

.block /deep/ .el-pager li.active {
    color: #0d6aa7;
}

.el-icon-delete {
    float: right;
    cursor: pointer;
}
</style>
