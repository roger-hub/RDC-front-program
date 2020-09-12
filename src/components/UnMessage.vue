<template>
    <li class="message" v-if="bool">
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
        <div class="func">
            <i class="el-icon-upload2" @click="pushMessage($event)"></i>
        </div>
    </li>
</template>

<script>
export default {
    name:"UnMessage",
    data(){
        return{
            bool : true
        }
    },
    props:['ids'],
    methods:{
        pushMessage(e){
            const bool = confirm('是否确定通过此条留言？');
            console.log(bool);
            const target = e.target;
            if(bool){
                this.bool = !bool;
                this.$emit('pushMsg',target);
            }
        }
    },
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