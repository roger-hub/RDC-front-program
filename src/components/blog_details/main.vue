<template>
<div class="main" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- 博客标题 -->
    <h1 class="title">{{ blog.title }}</h1>

    <!-- 博客信息 -->
    <div class="blog_info">
        <div class="info_left">
            <div class="author">博客作者：{{ blog.author }}</div>
            <div class="from" v-html="blog.from"></div>
        </div>

        <div class="info_right">
            <div class="time">发布时间：{{ blog.time }}</div>
        </div>
    </div>

    <!-- 博客内容 -->
    <div class="blog_content" v-html="blog.content">
    </div>
</div>
</template>

<script>
import eventBus from "@/common/Bus";
import "../../assets/css/blog_details/sspai.css";

export default {
    name: "blogMain",
    components: {},
    // props: ["blogId"],

    data() {
        return {
            blog: {
                id: "",
                author: "",
                class: "",
                around: "",
                content: "",
                time: "",
                title: "",
                url: "",
                from: "",
            },
            fullscreenLoading: true,
        };
    },
    methods: {
        // 点进详情页面，向服务器发送请求博客详情内容
        getBlogDetail: function (){
            this.$axios
            .post("/first/blog/get", {
                id: this.blogId,
            },{timeout: 10000})
            .then((res) => {
                this.fullscreenLoading = false;

                let info = res.data[0];

                this.blog.id = info.id;
                this.blog.class = info.class_[0];
                this.blog.author = info.author;
                this.blog.content = info.content;
                this.blog.time = info.time;
                this.blog.title = info.title;
                this.blog.url = info.url;

                this.changeFrom(info.around, info.class_, info.url);
            })
            .then((res) => {
                let prettyprint = document.getElementsByClassName("prettyprint");
                let codeArr = document.getElementsByTagName("code");
                this.prettyprintBGC(prettyprint, codeArr);
            })
            .catch(err=> {
                console.log(err);
            });
        },
        // 改变博客来源，参数：内/外部博客，方向，博客原文地址
        changeFrom: function (around, class_, blogUrl) {
            if (around == "内") {
                this.blog.from = "博客来源：研发中心" + class_ + "组";
            } else {
                this.blog.from =
                    '博客来源：外部博客 <a data-v-7648b804 style="color:#1693C0;" target="_blank" href="' +
                    blogUrl +
                    '">原文地址</a>';
            }
        },

        // 改变代码块颜色
        prettyprintBGC: function (prettyprint, codeArr) {
            for (let i = 0; i < prettyprint.length; i++) {
                prettyprint[i].style.background = "#f6f8fa";
                codeArr[i].style.background = "#f6f8fa";
            }
        },

        // 改变博客详情页内容,通过点击其他博客，自定义事件的方式来传递博客id参数，并调用后台接口
        changeBlog: function () {
            eventBus.$on("changeBlogDetail", (blogId) => {
                this.$router.push({
                    query: {
                        id: blogId,
                    },
                });

                this.$axios
                    .post("/first/blog/get", {
                        id: blogId,
                    })
                    .then((res) => {
                        let info = res.data[0];

                        this.blog.id = info.id;
                        this.blog.class = info.class_[0];
                        this.blog.author = info.author;
                        this.blog.content = info.content;
                        this.blog.time = info.time;
                        this.blog.title = info.title;
                        this.blog.url = info.url;

                        this.changeFrom(info.around, info.class_[0], info.url);
                    })
                    .then((res) => {
                        let prettyprint = document.getElementsByClassName("prettyprint");
                        let codeArr = document.getElementsByTagName("code");
                        this.prettyprintBGC(prettyprint, codeArr);
                    });
            });
        },
    },

    mounted() {
        this.blogId = this.$route.query.id;
        this.getBlogDetail();
    },

    created() {
        this.changeBlog();
    },
};
</script>

<style scoped>
@import url("../../assets/css/blog_details/base.css");
/* @import url("../../assets/css/blog_details/sspai.css"); */

.main {
    width: 950px;
    background-color: #fff;
    box-shadow: 0px 1px 1px rgba(29, 29, 29, 0.2);
    padding: 30px;
    border-radius: 5px;
    color: #333;
    overflow: hidden;
}


h1.title {
    color: #0d6aad;
    font-size: 32px;
    margin-bottom: 15px;
}

.blog_info {
    background-color: #eef0f0;
    display: flex;
    justify-content: flex-start;
    padding: 12px 20px 10px 30px;
    position: relative;
    font-size: 14px;
}

.blog_info::after {
    content: "";
    width: 8px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1693c0;
}

.info_left {
    margin-right: 30px;
}

.author {
    margin-bottom: 15px;
}

.from {
    height: 24px;
    line-height: 24px;
}

.time {
    margin-bottom: 15px;
}

.tag_container {
    display: flex;
    justify-content: flex-start;
}

.tag_tip {
    height: 24px;
    line-height: 24px;
}

.tag_list {
    width: 600px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.list_child {
    border: 1px solid #000;
    padding: 3px 5px;
    margin-right: 10px;
    margin-bottom: 10px;
}

/* 内容样式 */
.blog_content {
    margin-top: 30px;
    padding: 0 12px;
    font-size: 16px;
}

.con_child {
    margin-bottom: 20px;
    position: relative;
}

/* 内容标题样式 */
.con_title {
    margin-left: -10px;
    padding: 0 10px;
}

.h1_title {
    font-size: 28px;
    font-weight: 600;
    padding-left: 0;
}

.h2_title {
    font-size: 24px;
}

.h3_title {
    font-size: 20px;
}

.h4_title {
    font-size: 18px;
}

.h5_title {
    font-size: 16px;
    color: #666666;
}

.h6_title {
    font-size: 16px;
    color: #999999;
}

.h2_title::after {
    content: "";
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1693c0;
}

.h3_title::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: #1693c0;
}

.h4_title::after {
    content: "";
    width: 6px;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: #1693c0;
}

/* 正文 */
div {
    line-height: 1.5;
}

.content {
    text-indent: 28px;
    line-height: 2;
}

.hyperlink {
    color: #0d6aad;
}

.reference {
    padding: 14px 28px;
    background-color: #eef0f0;
    font-size: 14px;
    line-height: 2;
}

.reference::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: #cccccc;
}

.pic img {
    display: block;
    min-height: 300px;
    max-height: 500px;
    background-color: #1693c0;
    margin: 0 auto;
}

.code {
    line-height: 2;
    background-color: #f6f8f8;
    padding: 10px 20px;
}

.same_point {
    line-height: 2;
}

.same_point p {
    position: relative;
    padding: 0 10px;
}

.same_point p::after {
    content: "";
    width: 5px;
    height: 5px;
    background-color: #333333;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
}

.sequence_point {
    line-height: 2;
}

.prominent {
    background-color: #1693c0;
    padding: 3px 5px 4px 5px;
    color: #fff;
    border-radius: 2px;
    font-size: 14px;
}

.italic {
    font-style: italic;
}
</style>
