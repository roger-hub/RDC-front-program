<template>
  <div class="change-wrapper">
    <TopBar />
    <SubBar>
      <span slot="fir">研发介绍</span>
      <span slot="sec">修改成员信息</span>
    </SubBar>
    <Aside class="aside" />
    <div class="inner">
      <confirm-id
        @settleInfo="renderInfo"
        v-loading.fullscreen.lock="fullscreenLoading"
      ></confirm-id>
      <span class="divided-line"></span>
      <div class="change-container">
        <div class="diasbled-cover"></div>
        <change-gender
          :userid="currentId"
          :username="currentName"
        ></change-gender>
        <change-grade
          :userid="currentId"
          :username="currentName"
        ></change-grade>
        <change-major
          :userid="currentId"
          :username="currentName"
        ></change-major>
        <change-direction
          :userid="currentId"
          :username="currentName"
        ></change-direction>
        <change-introduction
          :userid="currentId"
          :username="currentName"
        ></change-introduction>
        <change-avatar
          :userid="currentId"
          :username="currentName"
        ></change-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import confirmId from "@/components/manage-component/manageChange/changeDetails/comfirm/confirmId";
import changeGender from "@/components/manage-component/manageChange/changeDetails/changeGender";
import changeGrade from "@/components/manage-component/manageChange/changeDetails/changeGrade";
import changeDirection from "@/components/manage-component/manageChange/changeDetails/changeDirection";
import changeMajor from "@/components/manage-component/manageChange/changeDetails/changeMajor";
import changeIntroduction from "@/components/manage-component/manageChange/changeDetails/changeIntroduction";
import changeAvatar from "@/components/manage-component/manageChange/changeDetails/changeAvatar";
import Aside from "@/components/manage-component/Aside";
import TopBar from "@/components/manage-component/TopBar";
import SubBar from "@/components/manage-component/SubBar";
export default {
  components: {
    confirmId,
    changeGender,
    changeGrade,
    changeDirection,
    changeMajor,
    changeIntroduction,
    changeAvatar,
    Aside,
    TopBar,
    SubBar,
  },

  data() {
    return {
      currentId: "",
      currentName: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    renderInfo(info) {
      this.fullscreenLoading = true;
      //info数组里面第一个是方向，第二个是年级，第三个是名字
      this.$axios
        .post("/first/member/get", {
          direction: info[0],
          grade: info[1],
          name: info[2],
        })
        .then((res) => {
          this.currentId = res.data[0].id;
          this.currentName = info[2];
          this.fullscreenLoading = false;
          document.querySelector(".diasbled-cover").style.display = "none";
        });
    },
  },
};
</script>
<style scoped>
.change-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #fff;
}
.divided-line {
  display: block;
  width: 100%;
  border-bottom: 1px solid #999;
  margin: 20px 0 20px 0;
}
.change-container {
  position: relative;
}
.diasbled-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: not-allowed;
  z-index: 1;
}
.inner {
  padding-top: 40px;
  width: 80%;
  height: 560px;
  float: right;
  overflow-y: scroll;
  background: #fff;
}
.inner::-webkit-scrollbar {
  width: 30px;
}
.inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.inner::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
</style>