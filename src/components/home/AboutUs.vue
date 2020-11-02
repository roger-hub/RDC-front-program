<template>
  <div class="wrapper" ref="aboutUs">
    <div class="each" ref="each">
      <div class="eachPartTitle" @click="clickTitle">-关于我们-</div>
    </div>
    <div class="block">
      <el-carousel
        :interval="4000000"
        type="card"
        trigger="click"
        height="200px"
        @change="
          (now, pre) => {
            change(now, pre);
          }
        "
      >
        <el-carousel-item v-for="item in list" :key="item.index">
          <h3 class="small">{{ item.name }}</h3>
          <img :src="item.src" alt="" id="stars" :class="item.index" :ref="`thumb${item.index}`">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="descrip">
      <div class="placeCenter">
        <span class="line"></span>
        <span class="title" ref="title">Web前端</span>
        <span class="line"></span>
      </div>
      <div class="content" ref="content">
        <p>
          Web前端开发组，基于HTML、CSS和Javascript前端语言进行开发，专注于呈现良好的网站界面和网页交互，提供更好的用户体验。前端在发展，技术更新快，能做的也越来越多。
        </p>
        <p>
          我们需要：基本的C语言理解，0或0以上的前端基础，学习前端的热情，当然，如果你有良好的审美或是一定的PS基础，那面试时可能会获得一定印象分哦~
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutUs",
  data() {
    return {
      // list: ["Web前端", "Java后台", "Andriod安卓", "大数据"],
      list:[
        {name:"Web前端",src:require("@/assets/images/home-images/star_one.png"),index:"0"},
        {name:"Java后台",src:require("@/assets/images/home-images/star_two.png"),index:"1"},
        {name:"Andriod安卓",src:require("@/assets/images/home-images/star_three.png"),index:"2"},
        {name:"大数据",src:require("@/assets/images/home-images/star_four.png"),index:"3"},
      ],
      contentList: [
        `<p data-v-77adf44b>Web前端开发组，基于HTML、CSS和Javascript前端语言进行开发，专注于呈现良好的网站界面和网页交互，提供更好的用户体验。前端在发展，技术更新快，能做的也越来越多。</p>
                <p data-v-77adf44b>我们需要：基本的C语言理解，0或0以上的前端基础，学习前端的热情，当然，如果你有良好的审美或是一定的PS基础，那面试时可能会获得一定印象分哦~</p>`,
        `<p data-v-77adf44b>研发后台小组一直致力于JavaWeb开发，专注于各种前沿的Java技术学习和实践能力的结合。后台开发与各小组相辅相成，无论是安卓端还是网页端，都需要后台技术的支持，只有和服务器进行沟通，才能成为一个完整的产品。</p>
                <p data-v-77adf44b>如果你具备基本的C语言基础、对Java编程感兴趣，出色的学习能力以及良好的团队协作精神，想学习数据库和服务器，那么研发后台组是你的不二选择。</p>`,
        `<p data-v-77adf44b>Android开发组，是RDC工作室安卓App项目的核心研发团队，专注基于Java语言的主流app开发与Android技术的钻研。除了项目之外，倘若你还有其他新颖可行的想法，还能开发出各种炫酷的App或是小游戏给大家使用。</p>
                <p data-v-77adf44b>假如你热爱技术、热爱Android，拥有扎实的C语言基础（有Java或Android基础更佳），善于自主钻研，有责任感，那么，你正是我们苦苦寻找的小伙伴！</p>`,
        `<p data-v-77adf44b>信息爆炸，身处于互联网时代的我们怎能视庞大的数据而不见。研发中心大数据组致力于挖掘数据、分析数据。既专注于基础，又落实于项目；既沉浸于原理，又回归到兴趣。大数据组是研发中心最年轻的小组，但我们拥有更多的可能去开拓、去创造无限的可能。</p>
                <p data-v-77adf44b>研发大数据组采取自由学习，定期交流的模式。鼓励向自己感兴趣的方向大胆的探索，同时通过小组交流，一方面督促组员不断学习，另一方面组员之间互相汲取经验，在各自的空间中充分发挥。</p>`,
      ],
      stars : [],
    };
  },
  methods: {
    changeGroup() {
      setTimeout(() => {
        const isActive = document.getElementsByClassName(
          "el-carousel__item is-active el-carousel__item--card is-in-stage"
        )[0];
        const title = this.$refs.title;
        console.log(isActive,isActive.lastChild);
        title.innerHTML = isActive.lastChild.innerHTML;
      }, 1000);
    },
    runChangeGroup() {
      const leftBtn = document.getElementsByClassName("el-icon-arrow-left")[0];
      const rightBtn = document.getElementsByClassName(
        "el-icon-arrow-right"
      )[0];
      console.log(leftBtn, rightBtn);
      leftBtn.onclick = function() {
        this.changeGroup();
      };
      rightBtn.onclick = function() {
        this.changeGroup();
      };
    },
    clickTitle() {
      const each = this.$refs.each;
      this.$emit("showShadow", each);
    },
    change(now, pre) {
      const title = this.list[now];
      console.log(title);
      this.$refs.title.innerHTML = title.name;
      this.$refs.content.innerHTML = this.contentList[now];
    },
    getRandom(min,max){
        return Math.floor(Math.random() * (max - min) + min)
    },
    getStar(){
      for(let i = 0;i < 4;i ++){
        this.stars.push(this.$refs[`thumb${i}`][0]);
        // console.log(this.$refs[`thumb${i}`][0]);
      }
      for(let i = 0;i < 4;i ++){
        const star = this.stars[i];
        star.style.top = this.getRandom(10,50) + 'px';
        if(Math.round(Math.random())){
          star.style.right = this.getRandom(10,50) + 'px';
        }else{
          star.style.left = this.getRandom(10,50) + 'px';
        }
      }
    },
  },
  mounted(){
    this.getStar();
    let self = this;
    let target = this.$refs.aboutUs;
    let foo = function () {
      let oTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (Boolean(
        oTop >= (target.offsetTop-200) &&
        oTop <= target.offsetTop + target.offsetHeight
      )) {
        self.$emit('showAboutUs');
        //只进行一次动画，避免每次滑动都重复动画
        window.removeEventListener("scroll", foo);
      }
    };
    window.addEventListener("scroll", foo);
  }
};
</script>

<style scoped>
.block {
  position: relative;
  width: 800px;
  margin: 50px auto 0;
}

.block #stars{
  position: absolute;
  width: 100px;
  top: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 20px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ff9e9f;
  border:10px dotted #ecb9ba;
  box-sizing: border-box;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ecb9ba;
  border:10px dashed #ff9e9f;
  box-sizing: border-box;
}

.descrip .placeCenter {
  text-align: center;
  margin: 30px 0;
}

.descrip .line {
  display: inline-block;
  width: 6px;
  height: 18px;
  background: #d65658;
  vertical-align: middle;
}

.descrip .title {
  font-size: 18px;
  vertical-align: middle;
  margin: 0 10px;
  font-weight: bolder;
  color: #d65658;
}

.descrip .content {
  background: #fff;
  background-image: linear-gradient(rgb(214, 214, 214) 1px, transparent 0), 
                    linear-gradient(90deg, rgb(214, 214, 214) 1px, transparent 0);
  background-size: 20px 20px, 20px 20px;
  border: 5px solid  rgba(214, 86, 88,.1);
  padding: 30px;
  width: 800px;
  margin: 0 auto;
}

.descrip .content p {
  margin: 20px 0;
  text-indent: 2em;
  color: #333;
  font-weight: bold;
}
.el-carousel__indicator /deep/ .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
  border: 1.5px solid #d65658;
  background: #fff;
}

.el-carousel__indicator /deep/.el-carousel__button:hover {
  width: 13px;
  height: 13px;
}

.is-active /deep/ .el-carousel__button {
  background: #d65658;
}
</style>
