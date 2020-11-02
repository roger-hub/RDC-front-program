<template>
<div>
    <div id="blog-header">
        <div class="container">
            <div class="blog-tit fl">
                <span>博客详情</span>
            </div>
            <div class="blog-home fr">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>博客详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </div>
    <div class="center">
        <div class="center_left">
            <blogMain :blogId="id"></blogMain>
        </div>
        <div class="center_right">
            <blogSearch></blogSearch>
            <blogOther></blogOther>
            <blogBook></blogBook>
        </div>
    </div>
    <BackTop></BackTop>
</div>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import blogMain from "@/components/blog_details/main";
import blogSearch from "@/components/blog_details/blogSearch";
import blogOther from "@/components/blog_details/blogOther";
import blogBook from "@/components/blog_details/blogBook";
import BackTop from "@/components/common/BackTop"

export default {
    name: "blogDetail",

    components: {
        TopBar,
        blogMain,
        blogSearch,
        blogOther,
        blogBook,
        BackTop,
    },

    props: {},

    data() {
        return {
            id: "",
        };
    },

    methods: {

    },

};
</script>

<style scoped>
@import url("../assets/css/blog_details/base.css");
@import url("../assets/css/blog_details/sspai.css");

.container {
    display: flex;
    justify-content: space-between;
    padding: 0 90px;
}

.center {
    width: 1350px;
    margin: 10px auto 20px;
    display: flex;
    justify-content: space-between;
}

#blog-header {
    height: 60px;
    min-width: 1200px;
    margin-bottom: 30px;
    background-color: #fafafa;
}

.blog-tit {
    width: 180px;
    background-color: #fff;
    font-weight: 600;
    font-size: 28px;
    line-height: 60px;
    text-align: center;
}

.blog-home {
    font-size: 12px;
    padding: 30px 0 0 0;
}

.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
    color: #0d6aa7;
}

.center_left {
    position: relative;
    animation: slideUp 0.8s linear forwards;
}

.center_right {
    position: relative;
    animation: slideUp 0.8s linear forwards;
}

@keyframes slideUp {
    0% {
        top: 100px;
        opacity: 0;
    }

    75% {
        opacity: 0.2;
    }

    100% {
        top: 0px;
        opacity: 1;
    }
}
</style>
