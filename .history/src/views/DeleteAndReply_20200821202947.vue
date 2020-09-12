<template>
    <div class="box clearfix">
        <TopBar/>
        <SubBar>
            <span slot="fir">留言</span>
            <span slot="sec">回复 & 删除</span>
        </SubBar>
        <Aside class="aside"/>
        <div class="checkbox">
            <i class="el-icon-finished"></i>
            <span>多选</span>
        </div>
        <ul class="messageList">
            <EachMessage 
            @delete="deleteMessage"
            @submit="submit(arguments)"
            v-for="(item,index) in list"
            :key="index"
            :id="ids[index]"
            >
                <span class="name" slot="name">{{item.name}}</span>
                <span class="mail" slot="mail">{{item.mail}}</span>
                <span class="time" slot="time">{{item.time}}</span>
                <div class="content" slot="content">{{item.content}}</div>
            </EachMessage>
        </ul>
    </div>
</template>

<script>
import EachMessage from "@/components/EachMessage.vue"
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'
import SubBar from '@/components/SubBar.vue'


export default {
    name:"DeleteAndReply",
    components:{
        EachMessage,
        Aside,
        TopBar,
        SubBar
    },
    data(){
        return{
            isSeen:false,
            list:[],
            ids:[],
        }
    },
    methods:{
        deleteMessage(target){
            const id = target.parentElement.parentElement.id;
            console.log(id);
            this.$axios.post('/api/message/deleteMessage',{
                messageId : id
            })
        },
        submit(params){
            const msg = params[0];
            const target = params[1];
            const id = target.parentElement.parentElement.id;
            console.log(msg,id);
            this.$axios.post('/api/comment/post',{
                messageId : id,
                content : msg
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getMessage(){
            this.$axios.post('api/message/getAllMessage',{})
            .then(res => {
                const arr = res.data;
                this.list = arr.map((item)=>{
                    return {
                        name : item.messageUsername,
                        mail : item.messageEmail,
                        content : item.messageContent,
                        time : new Date(item.messageTime).getFullYear() + '-' + (new Date(item.messageTime).getMonth() + 1) + '-' + new Date(item.messageTime).getDate()
                    }
                })
                this.ids = arr.map((item)=> item.messageId);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.getMessage()
    }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

.box{
    width: 100%;
    height: 100%;
    /* margin:10px auto; */
    border-radius: 5px;
    background: #fff;
}

.checkbox{
    font-size: 16px;
    text-align: right;
    padding: 10px 50px;
    margin-top: 80px;
    cursor: pointer;
}

.time{
    float: right;
    margin-right: 50px;
    color: #ccc;
}

.messageList{
    padding: 10px 50px;
    height: 545px;
    overflow-y: auto;
}

.messageList::-webkit-scrollbar{
    width: 30px;
}

.messageList::-webkit-scrollbar {
/*滚动条整体样式*/
width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
height: 1px;
}
.messageList::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
border-radius: 10px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
background: #535353;
}
</style>