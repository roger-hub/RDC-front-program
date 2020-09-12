<template>
    <div class="blogWrite_container">
        <TopBar/>
        <SubBar>
            <span slot="fir">技术博客</span>
            <span slot="sec">新建博客</span>
        </SubBar>
        <Aside class="aside"/>
        <blogInfo></blogInfo>

        <div class="introduce">
            <div>Markdown 编辑器说明：</div>
            <div>该Markdown编辑器支持大部分Markdown语法</div>
            <ul>
                <li>过行：两行之间需要有一个空白行</li>
                <li>标题：# 标题，最多6个#号</li>
                <li>代码片段：两行```</li>
            </ul>
            <ul>
                <li>同级分点：- 空格 内容</li>
                <li>有序分点：数字.空格 内容</li>
                <li>突出显示：`内容`</li>
            </ul>
            <ul>
                <li>引用：> 内容</li>
                <li>超链接：[显示内容](链接地址)</li>
                <li>图片：![](图片地址)</li>
            </ul>
        </div>

        <md></md>
    </div>
</template>

<script>
    import blogInfo from '../components/blogWrite/blogInfo.vue'
    import md from '../components/blogWrite/md.vue'
    import SubBar from '@/components/SubBar.vue'
    import TopBar from '@/components/TopBar.vue'
    import Aside from '@/components/Aside.vue'

    import '../assets/css/blogWrite/base.css'

    export default {
        name:'blogWrite',
        data() {
            return {
                blogTitle : '',
                blogAuthor : '',
                direction : '',
                content : '',
                around : '内'
            };
        },
        components: {
            md,
            blogInfo,
            SubBar,
            TopBar,
            Aside
        },
        methods: {

        },
    }

</script>

<style scoped>
    *::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px;/*定义纵向滚动条宽度*/
        height: 8px;/*定义横向滚动条高度*/
    }

    *::-webkit-scrollbar-thumb {
        /*滚动条内部滑块*/
        border-radius: 8px;
        background-color: hsla(220, 4%, 58%, 0.3);
        transition: background-color 0.3s;
    }

    *::-webkit-scrollbar-thumb:hover {
        /*鼠标悬停滚动条内部滑块*/
        background: #bbb;
    }

    *::-webkit-scrollbar-track {
        /*滚动条内部轨道*/
        background: #ededed;
    }

    .blogWrite_container{
        /* width: 80%;
        margin: 0 auto;
        border-radius: 10px;
        overflow-y:auto;
        height: calc(100vh - 60px); */
        width: 100%;
        height: 100%;
        /* margin:10px auto; */
        border-radius: 5px;
        background: #fff;
        overflow: auto;
    }

    .blogWrite_container div:first-child{
        text-align: left;
    }

    .introduce{
        line-height: 1.8;
        margin: 0 0 0 19px;
        color: #999;
        margin-bottom: 20px;
    }

    .introduce div:first-child{
        font-size: 20px;
    }

    .introduce ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .introduce li{
        width: 400px;
        margin-left: 20px;
        list-style: circle;
    }
</style>