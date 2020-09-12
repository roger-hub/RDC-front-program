<template>
    <div>
        <i class="el-icon-arrow-left" @click="toHome"></i>
        <span class="cate">
            <slot name="fir"></slot>
            <span>/</span>
            <slot name="sec"></slot>
        </span>
    </div>
</template>

<script>
export default {
    name:"SubBar",
    methods:{
        toHome(){
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>
div{
    float: right;
    width: 80%;
    background: #eee;
    height: 60px;
    color: #0D6AA7;
    margin-bottom: 20px;
}

i{
    margin-left: 30px;
    font-size: 20px;
    line-height: 60px;
    vertical-align: middle;
}

span{
    margin-left: 30px;
    line-height: 60px;
    font-weight: bold;
}
</style>