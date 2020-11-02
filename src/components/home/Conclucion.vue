<template>
  <div class="wrapper">
    <div class="each" ref="each">
      <div class="eachPartTitle" @click="clickTitle">-纵观RDC-</div>
    </div>
    <div class="card">
      <div class="imgContainer">
        <img src="@/assets/images/home-images/logo.png" alt="" />
      </div>
      <div class="letter">
        <img class="rocket rocket_left" src="@/assets/images/home-images/rocket.png" alt="">
        <img class="rocket rocket_right" src="@/assets/images/home-images/rocket.png" alt="">
        <p>致追梦人：</p>
        <p class="textAlignLeft">"</p>
        <p class="textAlignCenter">You build it,</p>
        <p class="textAlignCenter">You run it!</p>
        <p class="textAlignRight">"</p>
      </div>
    </div>
    <div class="teacher">
      <div class="imgContainer">
        <img src="@/assets/images/home-images/teacher.jpg" alt="" id="myImg" />
        <div class="decoration">
          <p>Liang</p>
          <p>Zuhong</p>
        </div>
      </div>
      <div class="intro">
        <div class="subName">指导老师</div>
        <div class="name">梁祖红</div>
        <div class="descrip">
          <p>广东工业大学教授级高级工程师</p>
          <p>工学博士</p>
          <p>主持国家自然基金1项</p>
          <p>
            作为主要骨干参与多项国家自然基金、省基金、省产学研合作和省科技计划多项
          </p>
          <p>负责或承担企业横向项目累计100多万元</p>
          <p>先后获得广东省科学技术二等奖1项</p>
          <p>河源市科学技术一等奖1项</p>
          <p>发布论文多篇，其中SCI,EI,ISTP收录多篇</p>
          <img class="medal" src="@/assets/images/home-images/medal.png" alt="">
        </div>
      </div>
    </div>
    <div class="about">
      <div class="title">>>>工作室简介</div>
      <p>
        研发中心创设于学院成立之初，积淀丰富、历史悠久，是计算机学院最为老牌的一个团队。
      </p>
      <p>
        2001年，研发中心成立，至今已经18年历史，是计算机学院的一个老牌团队。这么多年来，团队成员一直致力于互联网、安卓手机应用、数据库以及图形图像等技术的学习和开发。我们在基本专业课程和技能训练的基础上，通过项目过程的进一步学习，提高自身解决问题的能力、学习能力以及团队协作能力。
      </p>
      <p>
        团队已有大批师兄师姐进入了百度、腾讯、华为、网易、阿里巴巴、金山等公司进行工作。这里有优秀的学习榜样、丰富的学习资源、良好的学习氛围、珍贵的项目经验，还有活跃愉快的相处气氛。如果你有出色的学习能力、对知识有近乎渴望的追求，以及良好的抗压力和团队协作力，那就加入我们吧！在这里和你的队友们一起打造属于你们的BAT之路！
      </p>
      <img class="studio" src="@/assets/images/home-images/studio.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "conclucion",
  methods: {
    clickTitle() {
      const each = this.$refs.each;
      this.$emit("showShadow", each);
    },
    showImg() {
      // 获取模态窗口
      var modal = document.getElementById("myModal");

      // 获取图片模态框，alt 属性作为图片弹出中文本描述
      var img =
        document.getElementById("myImg") ||
        document.getElementsByClassName("myImg")[0];
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        captionText.innerHTML = this.alt;
        modalImg.style.width = "500px";
      };

      // 获取 <span> 元素，设置关闭模态框按钮
      var span = document.getElementsByClassName("close")[0];

      // 点击 <span> 元素上的 (x), 关闭模态框
      span.onclick = function() {
        modal.style.display = "none";
      };
    },
  },
  mounted() {
    this.showImg();
  },
};
</script>

<style scoped>
.card {
  width: 1000px;
  margin: 80px auto 0;
  background: #d65658;
  opacity: 0.55;
}

.card .imgContainer {
  width: 120px;
  margin: 0 auto;
}

.card img {
  position: relative;
  top: -60px;
  display: block;
  width: 100%;
}

.letter {
  position: relative;
  width: 600px;
  padding: 0 200px 50px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.letter .textAlignLeft {
  font-size: 72px;
  position: absolute;
}

.letter .textAlignCenter {
  text-align: center;
  font-size: 48px;
  font-weight: bolder;
}

.letter .textAlignRight {
  font-size: 72px;
  position: absolute;
  right: 100px;
  bottom: 0;
}

.letter .rocket{
  position: absolute;
  width: 80px;
}

.letter .rocket.rocket_left{
  left: 20px;
  top: 50px;
}

.letter .rocket.rocket_right{
  transform: rotateZ(90deg);
  right: 40px;
}

.teacher {
  position: relative;
  width: 1000px;
  margin: 150px auto 100px;
  border: 2px solid #efefef;
}

.teacher .imgContainer {
  top: -180px;
  position: relative;
  display: inline-block;
  width: 240px;
  margin-left: 100px;
  border: 2px solid #efefef;
  background: #fff;
}

.teacher .imgContainer img {
  display: block;
  width: 200px;
  margin: 20px auto;
}

.teacher .decoration {
  position: absolute;
  font-weight: bolder;
  color: #ccc;
  font-size: 50px;
  margin-top: -30px;
  margin-left: -40px;
}

.teacher .intro {
  display: inline-block;
  width: 500px;
  margin-left: 80px;
}

.teacher .intro .subName {
  margin-top: 20px;
  color: #666;
  font-size: 18px;
  font-weight: bold;
}

.teacher .intro .name {
  color: #444;
  font-weight: bolder;
  font-size: 28px;
}

.teacher .intro .descrip {
  margin-top: 20px;
  color: rgb(160, 160, 160);
}

.teacher .intro .descrip p {
  line-height: 32px;
}

.about {
  position: relative;
  background: #0d6aa7;
  opacity: 0.5;
  padding: 50px 100px;
  color: #fff;
}

.about .title {
  font-size: 24px;
  font-weight: bolder;
}

.about p {
  margin-top: 30px;
}

.about .studio{
  position: absolute;
  width: 400px;
  top: -80px;
  right: 20px;
}

.intro .medal{
  position: absolute;
  width: 180px;
  right: 0px;
  top: 0px;
}
</style>
