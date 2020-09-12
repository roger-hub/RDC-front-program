<template>
    <li class="message" v-if="bool" ref="message">
        <div class="postman">
            <span>来自</span>
            <span class="name">
                <slot name="name"></slot>
            </span>
            <span class="mail">
                <slot name="mail"></slot>
            </span>
            <span class="time">
                <slot name="time"></slot>
            </span>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <slot name="func">
            <div class="func">
                <i class="el-icon-chat-dot-round" @click="clickComment"></i>
                <i class="el-icon-delete" @click="deleteMessage($event)"></i>
            </div>
        </slot>
        <ReplyArea v-if="isSeen" v-show="isShow" :id="id"/>
        <PushComment v-show="isShow" @submitReply="submitReply(arguments)"/>
    </li>
</template>

<script>
import PushComment from "@/components/PushComment.vue"
import ReplyArea from "@/components/ReplyArea.vue"

export default {
    name:"EachMessage",
    components:{
        PushComment,
        ReplyArea
    },
    data(){
        return{
            isSeen : false,
            isShow : false,
            bool : true,
            id : null
        }
    },
    props:['ids'],
    methods:{
        clickComment(){
            if(this.isShow === false || this.isSeen === false){
                this.isShow = true;
                this.isSeen = true;
            }else{
                this.isShow = false;
                this.isSeen === false;
            }
        },
        deleteMessage(e){
            const target = e.target;
            const bool = confirm('是否删除此条留言？');
            if(bool){
                this.bool = !bool;
                this.$emit('delete',target);
            }else{
                return;
            }
        },
        submitReply(params){
            const msg = params[0];
            const target = params[1];
            this.$emit('submit',msg,target)
        },
        getId(){
            this.id = this.$refs.message.id;
        }
    },
    mounted(){
        this.getId();
    }
}
</script>

<style scoped>
.message{
    border-top: 1px solid #ccc;
}

.postman{
    padding: 20px 0;
}

.content{
    margin: 20px 0;
    margin-left: 20px;
}

.name,
.mail{
    margin-left: 20px;
    font-weight: bold;
    color: #333;
}

.time{
    float: right;
}

.func{
    text-align: right;
    margin-bottom: 10px;
}

.func i{
    font-size: 20px;
    color: #333;
    margin-right: 10px;
    cursor: pointer;
}
</style>