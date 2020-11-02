<template>
<div id="time">
    <div class="each" ref="each">
        <div class="eachPartTitle activityTitle" @click="clickTitle">-近期活动-</div>
    </div>
    <div class="itemBox">
        <div class="item" @click="showImg($event)" v-for="(item,index) in content" :key="index">
            <h3>{{item}}</h3>
            <img :src="list[index]" alt @click="addClass($event)" />
        </div>
        <div class="timeLine">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <img class="camera" src="@/assets/images/home-images/camera.png" alt="">
        <img class="vedio" src="@/assets/images/home-images/vedio.png" alt="">
    </div>
</div>
</template>

<script>
export default {
    name: "Activities",
    data() {
        return {
            url: [],
            content: [],
        };
    },
    methods: {
        clickTitle() {
            const each = this.$refs.each;
            this.$emit("showShadow", each);
        },
        run() {
            const items = document.querySelectorAll(".item");
            const timeLine = document.querySelector(".timeLine");
            const circles = document.querySelectorAll(".timeLine div");

            var sn = 0; //起点。通过这个值加或减得出来对称数字
            var ln = 0; //上一个选中的圆点对应的索引值

            //排列圆点
            for (let i = 0; i < circles.length; i++) {
                const n = parseInt(i / 4) % 2 ? sn-- : sn++;

                const t = (timeLine.offsetHeight / 5) * n;
                circles[i].style.transform = "translateY(" + t + "px)";

                if (i % 4 == 0) {
                    circles[i].classList.add("big");
                }

                (function (i) {
                    setTimeout(function () {
                        circles[ln].classList.remove("active");
                        circles[i].classList.add("active");

                        items[parseInt(i / 4)].style.opacity = 1;
                        items[parseInt(i / 4)].style.transform = "scaleX(1)";

                        ln = i;

                        if (i == circles.length - 1) {
                            setTimeout(function () {
                                circles[i].classList.remove("active");
                            }, 100);
                        }
                    }, i * 150);
                })(i);
            }

            items.forEach(function (item, index) {
                item.onmouseover = function () {
                    this.style.transform =
                        index % 2 ? "translateY(10px)" : "translateY(-10px)";
                };
                item.onmouseout = function () {
                    this.style.transform = "translateY(0)";
                };
            });
        },
        addClass(e) {
            if (e.target.classList) {
                console.log(e.target);
                e.target.id = "my_Img";
            }
        },
        showImg(e) {
            if (e.target.tagName === "IMG") {
                const modal = document.getElementById("myModal");
                // 获取图片模态框，alt 属性作为图片弹出中文本描述
                const img = document.getElementById("my_Img");
                console.log(img);
                const modalImg = document.getElementById("img01");
                const captionText = document.getElementById("caption");
                modal.style.display = "block";
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                captionText.innerHTML = img.alt;
                modalImg.style.width = "500px";
                // 获取 <span> 元素，设置关闭模态框按钮
                const span = document.getElementsByClassName("close")[0];
                // 点击 <span> 元素上的 (x), 关闭模态框
                span.onclick = function () {
                    modal.style.display = "none";
                    if (img.id) {
                        img.id = "";
                    }
                };
            }
        },
    },
    mounted() {
        this.$axios.post("/first/active/get", {}).then((res) => {
            console.log(res.data);
            //由于只取所有活动的最后后四个活动
            //1.先取数组后四项
            let arr = [];
            arr = res.data.filter((item, index) => {
                return index >= res.data.length - 4;
            });
            //2.取出数组的每一项的内容放到content数组里面
            this.content = arr.map((item) => item.content);
            //2.取出数组的每一项的照片url放到list数组里面
            this.list = arr.map((item) => item.picture);
        });

        //处理滑动页面至目标位置才进行动画
        var self = this;
        let target = document.querySelector("#time");
        let foo = function () {
            let oTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (
                oTop >= (target.offsetTop - 200) &&
                oTop <= target.offsetTop + target.offsetHeight
            ) {
                self.$emit("showActivities");
                self.run();
                //只进行一次动画，避免每次滑动都重复动画
                window.removeEventListener("scroll", foo);
            }
        };
        window.addEventListener("scroll", foo);
    },
};
</script>

<style scoped>
.eachPartTitle {
    margin-top: 80px;
}

h2,
h3,
p {
    margin: 0;
}

body {
    background: #f6f6f6;
    color: #333;
}

#time {
    width: 800px;
    margin: 0 auto;
}

#time h2 {
    font-size: 30px;
    text-align: center;
    font-weight: normal;
}

.itemBox {
    position: relative;
    height: 600px;
}

.itemBox .camera {
    position: absolute;
    width: 200px;
    left: -100px;
    bottom: -100px;
    cursor: cell;
}

.itemBox .vedio {
    position: absolute;
    width: 200px;
    right: -100px;
    cursor: cell;
}

.itemBox img {
    width: 200px;
    transition: 0.5s;
    cursor: pointer;
}

.item {
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 0 5px 2px rgba(135, 135, 135, 0.15);
    border-radius: 5px;
    position: absolute;
    z-index: 1;
    /* 默认所有盒子都不显示，圆点走的时候才显示 */
    opacity: 0;
    transform: scaleX(0);
    /* 左右缩放为0，只有用它才能出来左右同时变大的效果 */
    transition: 0.5s;
}

.item:nth-child(1) {
    left: -110px;
    top: 80px;
}

.item:nth-child(2) {
    left: 152px;
    top: 460px;
}

.item:nth-child(3) {
    left: 410px;
    top: 30px;
}

.item:nth-child(4) {
    left: 673px;
    top: 460px;
}

.item:before {
    content: "";
    /* 定位+4个方向为0的属性，是为了让元素的尺寸与父级一样 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    border-radius: 5px;
    z-index: -1;
}

.item:nth-child(odd) {
    padding-top: 20px;
}

.item h3 {
    font-size: 18px;
    font-weight: normal;
    margin: 15px 0 10px 0;
}

.item p {
    color: #999;
    font-size: 14px;
    margin-bottom: 5px;
}

.item:after {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 50%;
    background: #fff;
    /* border: 2px solid #000; */
    box-shadow: 0 0 5px 2px rgba(135, 135, 135, 0.15);
    transform: translateX(-50%) rotate(45deg);
    z-index: -3;
}

.item:nth-child(odd):after {
    bottom: -7px;
}

.item:nth-child(even):after {
    top: -7px;
}

.width {
    width: 300px;
}

.width p {
    width: 260px;
    margin: 0 auto 5px auto;
    overflow: hidden;
}

.width p span {
    float: left;
    width: 130px;
    text-align: left;
}

.timeLine {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 180px;
    margin: auto;
    height: 90px;
    display: flex;
    justify-content: space-between;
    /* 两端对齐，元素之间的间隔自动平分 */
}

.timeLine div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0d6aa7;
    border: 5px solid #f6f6ff;
}

.timeLine div.big {
    border: 5px solid #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.timeLine div.active {
    border: 5px solid #fff;
    box-shadow: 0 0 10px 3px #0d6aa7;
}
</style>
