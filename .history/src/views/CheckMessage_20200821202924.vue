<template>
    <div class="box clearfix">
        <TopBar/>
        <SubBar>
            <span slot="fir">留言</span>
            <span slot="sec">审核</span>
        </SubBar>
        <Aside class="aside"/>
        <div class="checkbox">
            <i class="el-icon-finished"></i>
            <span>多选</span>
        </div>
        <ul class="messageList">
            <UnMessage
            v-for="(item,index) in list"
            :key="index"
            :id="ids[index]"
            @pushMsg="pushMsg">
                <span class="name" slot="name">{{item.name}}</span>
                <span class="mail" slot="mail">{{item.mail}}</span>
                <span class="time" slot="time">2020-8-11</span>
                <div class="content" slot="content">{{item.content}}</div>
            </UnMessage>
        </ul>
    </div>
</template>

<script>
import UnMessage from "@/components/UnMessage.vue"
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'
import SubBar from '@/components/SubBar.vue'


export default {
    name:"CheckMessage",
    components:{
        UnMessage,
        Aside,
        TopBar,
        SubBar
    },
    data(){
        return{
            isSeen:false,
            list:[],
            ids:[]
        }
    },
    methods:{
        pushMsg(target){
            const id = target.parentElement.parentElement.id;
            console.log(id);
            this.$axios.post('/api/message/putMessage',{
                messageId : id
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.$axios.post('api/message/getAdminAllMessage',{})
        .then(res=>{
            console.log(res);
            const isOk = res.data.filter(item=>item.messageStatus===0)
            console.log(isOk);
            this.list = isOk.map(item=>{
                return{
                    name:item.messageUsername,
                    mail:item.messageEmail,
                    content:item.messageContent
                }
            })
            this.ids = isOk.map((item)=> item.messageId);
            console.log(this.ids);
        }).catch(err=>{
            console.log(err);
        })
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
    border-radius: 5px;
    background: #fff;
}

.checkbox{
    font-size: 20px;
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