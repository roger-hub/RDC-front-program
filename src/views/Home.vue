<template>
<div class="home">
    <TextAnimation class="textAnimation" @done="done" v-show="text_Canbe_Seen" />
    <!-- <Plane class="plane" @flew="flew" v-if="plane_Canbe_Seen"/> -->
    <div class="main" v-if="home_Canbe_Seen">
        <TopBar />
        <div class="bgContainer" ref="bgImg"></div>
        <div class="conclucionAboutBg"></div>
        <div class="homeContainer">
            <Rotation @changeBg="changeBg" />
            <Conclucion @showShadow="showShadow" />
            <AboutUs @showShadow="showShadow" />
            <Activities @showShadow="showShadow" />
            <ExcellentMembers @showShadow="showShadow" />
            <messageBoard @showShadow="showShadow" />
        </div>
        <!-- 点击图片出大图 -->
        <div id="myModal" class="modal">
            <span class="close">×</span>
            <img class="modal-content" id="img01" />
            <div id="caption"></div>
        </div>
        <footer>
            ©copyright 2020 RDC Studio All Rights Reserved
            <a @click="toPage('/member')">管理员入口</a>
        </footer>
        <el-backtop> </el-backtop>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/common/TopBar";
/**
 * 上面标签的内容--实现可视区加载
v-show="showAboutUs" @showAboutUs="sau"
v-show="showActivities" @showActivities="sa"
v-show="showExcellentMembers" @showExcellentMembers="sem"
v-show="showmessageBoard" @showmessageBoard="smb"
 */

export default {
    name: "Home",
    data() {
        return {
            text_Canbe_Seen: !Boolean(window.sessionStorage.getItem('text_Canbe_Seen')), //一开始是T，播完是F
            // plane_Canbe_Seen : Boolean(window.sessionStorage.getItem('plane_Canbe_Seen')), // 一开始是F，然后上一个播完之后变成T，自己播完变成F
            // text_Canbe_Seen : true,
            // plane_Canbe_Seen : false,
            home_Canbe_Seen: window.sessionStorage.getItem('home_Canbe_Seen'),
            showAboutUs: false,
            showActivities: false,
            showExcellentMembers: false,
            showmessageBoard: false,
        }
    },
    components: {
        TopBar,
        Rotation: (resolve) => {
            require(["@/components/home/Rotation.vue"], resolve);
        },
        Conclucion: (resolve) => {
            require(["@/components/home/Conclucion.vue"], resolve);
        },
        AboutUs: (resolve) => {
            require(["@/components/home/AboutUs.vue"], resolve);
        },
        Activities: (resolve) => {
            require(["@/components/home/Activities.vue"], resolve);
        },
        ExcellentMembers: (resolve) => {
            require(["@/components/home/ExcellentMembers.vue"], resolve);
        },
        messageBoard: (resolve) => {
            require(["@/components/home/messageBoard.vue"], resolve);
        },
        TextAnimation: (resolve) => {
            require(["@/components/home/TextAnimation.vue"], resolve);
        },
        Plane: (resolve) => {
            require(["@/components/home/Plane.vue"], resolve);
        },
    },
    methods: {
        toPage(location) {
            this.$router.push(location);
        },
        getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        getRandomColor() {
            var color = ["#0D6AA7", "#D65658"];
            return color[this.getRandom(0, color.length)];
        },
        showShadow(each) {
            let color = this.getRandomColor();
            const div = document.createElement("div");
            div.className = "titleShadow";
            div.innerHTML = each.firstChild.innerHTML;
            each.appendChild(div);
            div.style.color = color;
            div.style.transition = "1s ease-in-out";
            getComputedStyle(div).top;
            div.style.transform =
                "translate(" +
                this.getRandom(-300, 300) +
                "px," +
                this.getRandom(-300, 300) +
                "px)";
            div.style.opacity = 0;
            div.addEventListener(
                "transitionend",
                function () {
                    div.remove();
                }, {
                    once: true,
                }
            );
        },
        changeBg(url) {
            const bgImg = this.$refs.bgImg;
            bgImg.style.background = "url(" + url + ") no-repeat";
            bgImg.style.backgroundSize = "100%";
            bgImg.style.transition = ".5s ease-in";
        },
        done() {
            window.sessionStorage.setItem('text_Canbe_Seen', true);
            console.log('已消失');
            // this.plane_Canbe_Seen = true;
            this.home_Canbe_Seen = true;
            window.sessionStorage.setItem('home_Canbe_Seen', true);
        },
        // flew(){
        //   this.plane_Canbe_Seen = false;
        //   window.sessionStorage.setItem('plane_Canbe_Seen',false);
        //   console.log('飞走了');
        //   this.home_Canbe_Seen = true;
        // },
        sau() {
            this.showAboutUs = true;
        },
        sa() {
            this.showActivities = true;
        },
        sem() {
            this.showExcellentMembers = true;
        },
        smb() {
            this.showmessageBoard = true;
        },
    },
};
</script>

<style scoped>
.home .homeContainer {
    position: relative;
    width: 1200px;
    margin: 60px auto 0;
    box-shadow: 6px 8px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid #efefef;
    background: #fff;
    height: 100%;
}

.main {
    height: 100%;
    background: #efefef;
}

.bgContainer {
    position: absolute;
    width: 100%;
    height: 600px;
    background: url("../assets/images/home-images/lbt1.jpg") no-repeat;
    background-size: 100%;
    opacity: 0.3;
}

.conclucionAboutBg {
    position: absolute;
    background: #0d6aa7;
    opacity: 0.3;
    width: 100%;
    height: 200px;
    top: 1700px;
}

.home .eachPartTitle {
    font-size: 36px;
    color: #333333;
    font-weight: bolder;
    text-align: center;
}

footer {
    margin-top: 50px;
    text-align: center;
    background: #606266;
    color: #fff;
    padding: 20px 0;
}
</style>

<style>
ul {
    list-style: none;
}

.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

.wrapper {
    margin-top: 60px;
}

.eachPartTitle,
.titleShadow {
    font-size: 36px;
    color: #333333;
    font-weight: bolder;
    text-align: center;
    cursor: pointer;
}

.each {
    position: relative;
}

.titleShadow {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

#myImg,
.myImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

#myImg:hover {
    opacity: 0.7;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
}

#caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
}

.modal-content,
#caption {
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
    from {
        -webkit-transform: scale(0);
    }

    to {
        -webkit-transform: scale(1);
    }
}

@keyframes zoom {
    from {
        transform: scale(0.1);
    }

    to {
        transform: scale(1);
    }
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
}

.close:hover,
.close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}

p,
div {
    cursor: default;
}

@media only screen and (max-width: 700px) {
    .modal-content {
        width: 100%;
    }
}
</style>
