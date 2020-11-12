<template>
<div class="wrapper">
    <div class="clearfix container">
        <div class="left">
            <img src="@/assets/images/home-images/logo.png" alt />
            <span>RDC欢迎你</span>
        </div>
        <ul class="right clearfix">
            <li v-show="isShowHome">
                <a @click="toPage('/home')">首页</a>
            </li>
            <li>
                <a v-show="isShowRest" @click="toPage('/member')">关于我们</a>
            </li>
            <li v-show="isShowRest" @click="handleScroll('activity')">近期活动</li>
            <li>
                <a @click="toPage('/share')">技术分享</a>
            </li>
            <li v-show="isShowRest" @click="handleScroll('job')">招聘岗位信息</li>
            <li v-show="isShowRest" @click="handleScroll('messageBoard')">留言</li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        isShowHome: {
            type: Boolean,
            default: false,
        },
        isShowRest: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        toPage(location) {
            this.$router.push(location);
        },
        handleScroll(option) {
            let str = "." + option + "Title";

            //由于元素的父级具有定位，offsetTop只能获取到达父级的距离
            let oTop = document.documentElement.scrollTop || document.body.scrollTop;
            let targetEle = document.querySelector(str);
            let target = targetEle.offsetTop;
            let current = targetEle.offsetParent;
            while (current != null) {
                //逐级向上加父级的距离，直至body，即为当前元素距顶部的距离
                target += current.offsetTop;
                current = current.offsetParent;
            }

            let timer = setInterval(() => {
                oTop += 10;
                window.scrollTo(0, oTop);
                if (oTop >= target - 10) {
                    clearInterval(timer);
                }
            }, 2);
        },
    },
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.wrapper {
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
    background: #222;
}

.clearfix::before {
    content: "";
    clear: both;
    display: block;
}

.container,
.container a {
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    padding: 0px;
    background: #222;
    color: #e5e5e5;
    font-family: "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro",
        "SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial",
        sans-serif;
}

.left,
.right li {
    float: left;
    height: 50px;
    margin: 0;
    padding: 0;
}

.left span {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    color: #aaa;
    font-weight: bolder;
}

.right li {
    margin: 0 10px;
    cursor: pointer;
}

.right li:hover,
.right li a:hover {
    color: #fff;
}

.left img {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    vertical-align: middle;
}

.right {
    margin: 0;
    padding: 0;
    float: right;
    line-height: 50px;
}

ul li {
    list-style: none;
}

span {
    cursor: default;
}
</style>
