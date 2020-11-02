<template>
    <div class="title_container" v-show="isText">
        <span class="title" ref="title">
            <span
                class="hidden" 
                :key="index" 
                v-for="(item,index) in str"
                :id="'text'+index"
                ref="index">
                    {{item}}
                </span>
            </span>
        <div v-show="play" class="shelter shelter_up" ref="sup"></div>
        <div v-show="play" class="shelter shelter_down" ref="sdo"></div>
        <div class="wrap" ref="wrap"></div>
    </div>
</template>

<script>
export default {
    name:"TextAnimation",
    data(){
        return{
            arr : 'RDC-STUDIO',
            play : false,
            isText : true,
        }
    },
    props:{
        text : {
            type : Boolean
        }
    },
    computed:{
        str(){
            const str = this.arr.split('');
            return str;
        }
    },
    methods:{
        getRandom(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        showText(){
            const random = this.getRandom(0,this.str.length);
            const self = this;
            for(let i = 0;i < this.str.length;i++){
                setTimeout(function(){
                    self.$refs.index[i].classList.add('display');
                },200*i)
            };
            setTimeout(function() {
                self.$refs.title.classList.add('active');
            }, 200)
        },
        getShelter(){
            const shelterArr = [this.$refs.sup,this.$refs.sdo];
            const wrap = this.$refs.wrap;
            const self = this;
            console.log(shelterArr);
            setTimeout(function(){
                self.play = true;
                for(let i = 0;i<shelterArr.length;i++){
                    shelterArr[i].classList.add('moveshelter');
                };
                setTimeout(function(){
                    wrap.classList.add('appear');
                    console.log('appear');
                    setTimeout(function(){
                        console.log('disappear');
                        self.$emit('done');
                        window.sessionStorage.setItem('plane_Canbe_Seen',true);
                        self.isText = false;
                    },100)
                },3000)
            },5000)
        },
    },
    mounted(){
        this.showText();
        this.getShelter();
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
.title_container{
    width: 100%;
    height: 100vh;
    background: #000;
    overflow-y: hidden;
}
.title {
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -100px;
    /* transform: translate(-50%, -50%); */
    font-family: 'Audiowide';
    font-size: 7em;
    color: #0d6aa7;
    animation: all 1s 1;
    cursor: default;
    font-family: "Titan One", cursive;
}
.title span {
    font-weight: bolder;
    font-size: 150px;
}
.title.active {
    color: #fff;
    -webkit-animation: Glow 1s ease infinite alternate;
    animation: Glow 1s ease infinite alternate;
}
@-webkit-keyframes Glow {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0d6aa7, 0 0 70px #0d6aa7, 0 0 80px #0d6aa7, 0 0 100px #0d6aa7, 0 0 150px #0d6aa7;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0d6aa7, 0 0 35px #0d6aa7, 0 0 40px #0d6aa7, 0 0 50px #0d6aa7, 0 0 75px #0d6aa7;
    }
}
@keyframes Glow {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0d6aa7, 0 0 70px #0d6aa7, 0 0 80px #0d6aa7, 0 0 100px #0d6aa7, 0 0 150px #0d6aa7;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0d6aa7, 0 0 35px #0d6aa7, 0 0 40px #0d6aa7, 0 0 50px #0d6aa7, 0 0 75px #0d6aa7;
    }
}
@-webkit-keyframes text {
    0% {
        color: transparent;
    }
    50% {
        color: #0d6aa7;
    }
    100%{
        color : #fff
    }
}
@keyframes text {
    0% {
        color: transparent;
    }
    50% {
        color: #0d6aa7;
    }
    100%{
        color : #fff
    }
}
/* @-webkit-keyframes blank {
    0% {
        color: transparent;
    }
    100% {
        color: #fff;
    }
}
@keyframes blank {
    0% {
        color: transparent;
    }
    100% {
        color: #fff;
    }
} */
.hidden {
    display: none;
    animation: all 1s 1;
}
.display {
    display: inline-block;
    animation: text 2s 1;
}
.shelter{
    width: 100%;
    height: 25%;
    background: #000;
}
.shelter_up{
    position: absolute;
    top: 0;
    transform-origin: 0% 0%;
}
.shelter_up.moveshelter{
    -webkit-animation: shelter 2s ease 1 forwards;
    animation: shelter 2s ease 1 forwards;
}
.shelter_down.moveshelter{
    -webkit-animation: shelter 2s ease 1 forwards;
    animation: shelter 2s ease 1 forwards;
}
.shelter_down{
    position: absolute;
    bottom: 0px;
    transform-origin: 0% 100%;
}
/* @-webkit-keyframes Ushelter{
    0% {
        top: 0;
        transform: translateY(0);
    }
    25% {
        top: 20%;
        transform: translateY(0);
    }
    50%{
        top: 15%;
        transform: translateY(0);
    }
    100%{
        top: 50%;
    }
}
@keyframes Ushelter{
    0% {
        top: 0;
        transform: translateY(0);
    }
    25% {
        top: 20%;
        transform: translateY(0);
    }
    50%{
        top: 15%;
        transform: translateY(0);
    }
    100%{
        top: 50%;
    }
}
@-webkit-keyframes Dshelter{
    0% {
        bottom: 0;
        transform: translateY(0);
    }
    25% {
        bottom: 20%;
        transform: translateY(0);
    }
    50%{
        bottom: 15%;
        transform: translateY(0);
    }
    100%{
        bottom: 50%;
    }
}
@keyframes Dshelter{
    0% {
        bottom: 0;
        transform: translateY(0);
    }
    25% {
        bottom: 20%;
        transform: translateY(0);
    }
    50%{
        bottom: 15%;
        transform: translateY(0);
    }
    100%{
        bottom: 50%;
    }
} */
@-webkit-keyframes shelter{
    0%{
        transform : scaleY(1);
    }
    25%{
        transform : scaleY(1.8);
    }
    50%{
        transform : scaleY(1.4);
    }
    100%{
        transform: scaleY(2);
    }
}
@keyframes shelter{
    0%{
        transform : scaleY(1);
    }
    25%{
        transform : scaleY(1.8);
    }
    50%{
        transform : scaleY(1.4);
    }
    100%{
        transform: scaleY(2);
    }
}
.wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    width: 90%;
    height: 0px;
    background-color: #fff;
    color: #fff;
    cursor: pointer;
}
.wrap:before {
    content: '';
    width: 100%;
    height: 0;
    transition: all .6s;
}
.wrap.appear::before {
    height: 1000px;
    background-color: #fff;
    transition: height .6s;
}
</style>