<template>
<div class="blog_other_container" id>
    <div class="other_top">
        <i class="blog_icon"></i>
        <span>其 他 博 客</span>
        <div class="direction" @click="changeDirListShow">
            {{directionNow}}
            <i class="tri_icon"></i>
            <ul class="direction_list" v-show="isShowDirList">
                <li v-for="(item,index) in direction" :key="item" @click="changeDirection(index)">{{item}}</li>
            </ul>
        </div>
    </div>

    <!-- 其他博客一览 -->
    <ul class="blog_list">
        <li v-for="(item,index) in blogTitle" class="list_child" ::key="item.id">
            <div @click="showBlog(index)" class="title_container">
                <span class="title_text">{{item.title}}</span>
                <i class="go"></i>
            </div>
        </li>
    </ul>

    <div class="view_more">
        <a href="#">
            <span>查看更多</span>
            <i class="go"></i>
        </a>
    </div>
</div>
</template>

<script>
import eventBus from "@/common/Bus";

export default {
    name: "blogOther",
    components: {},
    props: {},
    data() {
        return {
            isShowDirList: false,
            directionNow: "前端",
            direction: ["前端", "后台", "安卓", "大数据"],
            blogTitle: [],
        };
    },
    methods: {
        // 修改其他博客的方向
        changeDirection: function (index, e) {
            this.directionNow = this.direction[index];

            // 点击修改方向后，调用后台接口获取对应方向的博客数据
            this.$axios
                .post("/first/blog/get", {
                    class_: this.directionNow,
                    page: "1",
                    mini: "1",
                })
                .then((res) => {
                    let blogArr = res.data;

                    for (let i = 0; i < blogArr.length; i++) {
                        this.blogTitle[i].id = blogArr[i].id;
                        this.blogTitle[i].title = blogArr[i].title;
                        this.blogTitle[i].url = blogArr[i].url;
                    }
                });
        },

        // 控制修改方向列表是否出现
        changeDirListShow: function (e) {
            this.isShowDirList = !this.isShowDirList;
        },

        // 点击查看其他博客的详情
        showBlog: function (index, e) {
            let blogId = this.blogTitle[index].id;

            // 传递自定义事件到中央事件车，点击后把该博客的id传过去
            eventBus.$emit("changeBlogDetail", blogId);
        },
    },
    mounted() {
        // 获取博客列表，并渲染到页面上
        this.$axios
            .post("/first/blog/get", {
                class_: this.directionNow,
                page: "1",
                mini: "1",
            })
            .then((res) => {
                let blogArr = res.data;
                console.log(blogArr);

                for (let i = 0; i < blogArr.length; i++) {
                    this.blogTitle.push({
                        id: blogArr[i].id,
                        title: blogArr[i].title,
                        url: blogArr[i].url,
                    });
                }
            });
    },
};
</script>

<style scoped>
.blog_other_container {
    width: 280px;
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10px;
    padding: 25px 20px;
    color: #666666;
    font-size: 14px;
    position: relative;
}

.other_top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

i.blog_icon {
    display: block;
    width: 24px;
    height: 24px;
    background: url(../../assets/icon/blog.png) 0 / contain no-repeat;
    margin-right: 10px;
}

.other_top span {
    font-size: 18px;
    color: #0d6aad;
}

.direction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: flex;
    align-items: center;
    z-index: 100;
}

.direction:hover {
    color: #1693C0;
}

.direction:hover li {
    color: #666;
}

.direction:hover {
    color: #1693C0;
}

.direction_list {
    position: absolute;
    top: 20px;
    right: -20px;
    background-color: #fff;
    animation: fadeInDirectionList 0.25s linear forwards;
}

@keyframes fadeInDirectionList {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.direction_list li {
    border: 1px solid #cacaca;
    border-bottom: none;
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
}

.direction_list li:hover {
    background-color: #1693C0;
    color: #fff;
}

.direction_list li:first-child {
    border-radius: 5px 5px 0 0;
}

.direction_list li:last-child {
    border-bottom: 1px solid #cacaca;
    border-radius: 0 0 5px 5px;
}

.blog_list {
    margin: 30px 0;
}

.list_child {
    margin-bottom: 30px;
}

.list_child .title_container {
    display: block;
    padding-left: 30px;
    position: relative;
    cursor: pointer;
}

.list_child .title_container::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 1px solid #666666;
    left: 10px;
}

.title_text {
    display: block;
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.title_text:hover {
    color: #0d6aad;
}

i.go {
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    background: url(../../assets/icon/go.png) 0 / contain no-repeat;
}

.view_more {
    position: absolute;
    bottom: 20px;
    right: 42px;
    color: #1693C0;
}

.view_more:active {
    color: #0d6aad;
}

.view_more i.go {
    right: -22px;
}

i.tri_icon {
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 5px;
    background: url(../../assets/icon/down_tri.png) 0 / contain no-repeat;
}
</style>
