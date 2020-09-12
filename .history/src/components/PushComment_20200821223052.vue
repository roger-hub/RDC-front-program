<template>
    <div class="commentArea" :id="id">
        <textarea 
        type="text" 
        rows="5" 
        id="comment" 
        ref="comment"
        placeholder="写下你的评论…"
        ></textarea>
        <button 
        type="button" 
        id="submit-comment"
        @click="submit($event)"
        >发布</button>
    </div>
</template>

<script>
export default {
    name:"PushComment",
    data(){
        return{
            
        }
    },
    props:['id'],
    methods:{
        submit(e){
            const inner = this.$refs.comment;
            console.log(inner);
            const target = e.target;
            const msg = inner.value;
            if(msg){
                this.$emit('submitReply',msg,target);
                inner.value = '';
            }else{
                alert('请输入评论！')
            }
        }
    }
}
</script>

<style scoped>
div.commentArea{
    width: 800px;
    margin: 30px auto 10px;
}
#comment{
    padding: 10px;
    height: 6em;
    width: 680px;
    resize:none;
    outline: none;
    vertical-align: middle;
    font-size: 16px;
}

button{
    display: inline-block;
    margin-left: 30px;
    width: 50px;
    height: 3em;
    vertical-align: middle;
    border: 1px solid #fff;
    background: #0D6AA7;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
}
</style>