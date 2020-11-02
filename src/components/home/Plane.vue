<template>
    <div class="bg">
        <div id="wind" ref="wind">
            <div id="plane" class="in front" ref="plane">
                <div class="message">
                    <p class="text">"如果我有多一张机票，你愿不愿意跟我一起走"</p>
                    <p class="subscription">RDC工作室</p>
                </div>
                <button class="send" @click="flying">启程</button>
            </div>

            <div id="wind_container" class="beginning" ref="wing">
                <div id="left-wing">
                    <div class="top_left curvable"> </div>
                    <div class="bottom_left curvable"> </div>
                    <div class="wing wing1"></div>
                    <div class="wing wing2"></div>
                </div>

                <div id="right-wing">
                    <div class="top_right curvable"> </div>
                    <div class="bottom_right curvable"> </div>
                    <div class="wing wing3"></div>
                    <div class="wing wing4"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Plane',
    props:{
        plane : {
            type : Boolean
        }
    },
    methods:{
        flying(){
            const curvable = document.getElementsByClassName('curvable');
            const plane = this.$refs.plane;
            const wing = this.$refs.wing;
            const body = this.$refs.wind;
            plane.classList.remove('in');
            const self = this;
            setTimeout(function(){
                plane.classList.remove('front');
                wing.classList.remove('beginning');
                for (let i = 0; i < curvable.length; i++) {
                    curvable[i].classList.add('curved'); // 折叠飞机
                }
                body.style.background = '#54575A';

                setTimeout(function() {
                    wing.classList.add('hover'); //平放飞机
                    body.style.background = '#AD8BD8';

                    setTimeout(function() {
                        wing.classList.add('fly_away_first'); // 助跑
                        body.style.background = '#6E99C4';

                        setTimeout(function() {
                            wing.classList.add('fly_away'); //飞机飞走
                            body.style.background = '#3F9BFF';

                            setTimeout(function() {
                                body.style.background = "#efefef";
                                setTimeout(function(){
                                    self.$emit('flew');
                                    // window.sessionStorage.setItem('plane_Canbe_Seen',false);
                                    window.localStorage.setItem('plane_Canbe_Seen',false);
                                }, 2000)
                            }, 1000)
                        }, 100)
                    }, 1500)
                }, 2800)
            },200)
        },
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#000');
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style');
    }
}
</script>

<style scoped>
.bg{
    height: 100vh;
    overflow: hidden;
}

#wind {
    width: 100%;
    height: 100vh;
    perspective: 800;
    perspective-origin: 50% 50%;
    -webkit-perspective: 800;
    -webkit-perspective-origin: 50% 50%;
    transition: all 2s linear;
    overflow: hidden;
    background: #000;
}

/*未翻转*/
#plane.front {
    transform: rotateY(0deg);
}

#plane.in{
    animation: getin 1s ease 1 forwards;
}


/*点击之后翻转*/
#plane {
    /* z-index:3; */
    background: #333;
    transform: rotateY(-180deg);
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    backface-visibility: hidden;
    width: 400px;
    height: 260px;
    top: 240px;
    transition: all 0.8s ease-in-out;
    margin: auto;
}

@keyframes getin{
    from{
        top : 0;
        transform: rotateY(360deg);
    }
    to{
        top : 240px;
        transform: rotateY(0deg);
    }
}

.message {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: 140px;
    font-size: 14px;
    background-color: #fff;
}

.message .text {
    line-height: 100px;
    text-align: center;
}

.message .subscription {
    position: absolute;
    right: 30px;
    bottom: 110px;
}

/* 点击事件触发动画 */
.send {
    transition: all 0.3s ease-in-out;
    margin: 30px auto;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    font-family: "Microsoft YaHei";
    background-color: #0d6aa7;
    border-radius: 10px;
    border: none;
    color: #fff;
}

.send:active {
    transform: scale(0.85);
    transition: all 10ms ease-in-out;
    background-color: hsl(0, 0%, 85%);
    border: 2px solid hsl(194, 30%, 55%);
}


/*飞机纸*/
#wind_container {
    perspective: 600;
    perspective-origin: 200px 131px;
    transform-style: preserve-3d;
    transition: all 0.8s ease-in-out;
    backface-visibility: hidden;
    position: relative;
    width: 400px;
    height: 260px;
    margin: auto;
}


/* 翻转至正面 */
#wind_container.beginning {
    transform: rotateY(180deg);
}

#left-wing,
#right-wing {
    transform-style: preserve-3d;
    width: 200px;
    height: 260px;
    display: block;
    position: absolute;
    top: 0px;
    transition: all 1s ease-in-out;
}

#left-wing {
    transform: rotateZ(0deg);
    transform-origin: 100% 50% 0;
    left: 0;
}

#right-wing {
    transform: rotateZ(0deg);
    transform-origin: 0% 50%;
    left: 199px;
}


/*飞机机翼左右公共样式*/
.wing {
    position: absolute;
    transform-origin: 0 0 0;
    perspective: 1;
    perspective-origin: 50% 50%;
    backface-visibility: hidden;
    transition: all 1.3s linear;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    border-top: 240px solid hsla(0, 0%, 0%, 0);
    border-bottom: 0px solid hsla(0, 0%, 0%, 0);
    border-right: 100px solid hsl(0, 0%, 88%);
    width: 0;
    height: 0;
    bottom: 0;
}


/*绘制2d飞机*/
.wing1 {
    transform-origin: 100% 100%;
    transform: translateY(-38px) translateX(8px) rotateZ(22.62deg) skewY(-22.62deg);
    /*2D图像的偏移 旋转*/
}

.wing2 {
    transform: rotateZ(22.62deg);
    transform-origin: 100% 100%;
    border-left: 100px solid hsl(0, 0%, 88%);
    border-right: none;
    left: 100px;
}

.wing3 {
    transform: rotateZ(-22.62deg);
    transform-origin: 0% 100%;
    border-right: 100px solid hsl(0, 0%, 88%);
}

.wing4 {
    transform: translateY(-38px) translateX(-8px) rotateZ(-22.62deg) skewY(22.62deg);
    transform-origin: 0% 100%;
    border-right: none;
    border-left: 100px solid hsl(0, 0%, 88%);
    left: 100px;
}


/*绘制被翻折部分机翼 */
.curvable.top_left {
    transform-origin: 100px 112px;
    transition-delay: 1300ms;
    width: 0;
    height: 0;
    top: 0;
    border-right: 202px solid hsla(0, 0%, 0%, 0);
    border-bottom: 202px solid hsla(0, 0%, 0%, 0);
    border-top: 223px solid hsl(0, 0%, 88%);
}

.curvable.top_right {
    right: 0;
    border-left: 202px solid hsla(0, 0%, 0%, 0);
    border-bottom: 202px solid hsla(0, 0%, 0%, 0);
    border-top: 224px solid hsl(0, 0%, 88%);
    transform-origin: 96px 112px;
    transition-delay: 1650ms;
}


/* 补全折叠尾翼区域 */
.bottom_left.curvable {
    transform-origin: 109px 0;
    transition-delay: 2100ms;
    width: 109px;
    height: 38px;
    background: hsl(0, 0%, 88%);
    bottom: 0;
    left: 0;
}

.bottom_right.curvable {
    transform-origin: 0px 0;
    transition-delay: 2450ms;
    width: 109px;
    height: 38px;
    background: hsl(0, 0%, 88%);
    bottom: 0;
    right: 0;
}


/*补全折叠尾翼，剩余三角区域*/
.bottom_left.curvable:after {
    position: absolute;
    content: "";
    border-right: 92px solid hsla(0, 0%, 0%, 0);
    border-bottom: 39px solid hsl(0, 0%, 88%);
    border-top: 37px solid hsla(0, 0%, 0%, 0);
    left: 109px;
    bottom: 0;
}

.bottom_right.curvable:after {
    position: absolute;
    content: "";
    border-left: 92px solid hsla(0, 0%, 0%, 0);
    border-bottom: 39px solid hsl(0, 0%, 88%);
    border-top: 37px solid hsla(0, 0%, 0%, 0);
    left: -92px;
    bottom: 0;
}

/*折叠效果*/
.curvable {
    transition: transform 800ms ease-out;
    backface-visibility: hidden;
    position: absolute;
    background-color: transparent;
    z-index: 0;
    width: 0;
}


/* 折叠效果（左机翼、左尾翼） */
.top_left.curvable.curved {
    transform: rotate3d(1, -1.11, 0, 180deg);
}

.bottom_left.curvable.curved {
    transform: rotate3d(2.4867, 1, 0, -180deg);
}


/* 折叠效果（右机翼、右尾翼）*/
.top_right.curvable.curved {
    transform: rotate3d(1, 1.11, 0, 180deg);
}

.bottom_right.curvable.curved {
    transform: rotate3d(-2.4867, 1, 0, 180deg);
}


/* 平放一整个飞机 */
#wind_container.hover {
    transform: rotateX(54deg) rotateY(-10deg) rotateZ(25deg);
    transition-delay: 0.5s;
}


/*放平之后 左侧整体倾斜 （体现折叠效果）*/
#wind_container.hover #left-wing {
    transform: rotateY(60deg);
}

#wind_container.hover #right-wing {
    transform: rotateY(-60deg);
}


/* 3d视觉中放平 左侧机翼*/
#wind_container.hover .wing1 {
    transform: translateY(-38px) translateX(8px) rotateZ(22.62deg) rotateY(-60deg) skewY(-22.62deg);
    border-right: 100px solid hsl(0, 0%, 95%);
}


/*左侧飞机手持部位透明度降低*/
#wind_container.hover .wing2 {
    border-left: 100px solid hsl(0, 0%, 85%);
}


/* 3d视觉中放平 右侧机翼*/
#wind_container.hover .wing4 {
    transform: translateY(-38px) translateX(-8px) rotateZ(-22.62deg) rotateY(60deg) skewY(20deg);
    border-left: 100px solid hsl(0, 0%, 95%);
}


/*右侧飞机手持部位透明度降低*/
#wind_container.hover .wing3 {
    border-right: 100px solid hsl(0, 0%, 71%);
}


/*机翼 折叠效果（右机翼、右尾翼）之后多余部分隐藏掉*/
#wind_container.hover .curved {
    display: none;
}

/* 飞机后退助跑 */
#wind_container.hover.fly_away_first {
    transform: translatex(-100px) translateZ(300px) rotateX(42deg) rotateY(-11deg) rotateZ(27deg);
    transition-delay: 0;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;
}


/* 飞机向前飞翔至消失 */
#wind_container.hover.fly_away_first.fly_away {
    transform: translateX(600px) translateY(-400px) translateZ(-5000px) rotateX(66deg) rotateY(-12deg) rotateZ(36deg);
    transition: transform 2s ease-out, opacity 1.5s 0.5s linear;
    opacity: 0;
}
</style>