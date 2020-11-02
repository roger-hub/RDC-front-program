<template>
  <div class="change-wrapper">
    <TopBar />
    <SubBar>
      <span slot="fir">研发介绍</span>
      <span slot="sec">修改活动信息</span>
    </SubBar>
    <Aside class="aside" />
    <div class="inner">
      <confirm-activity
        @settleActivity="renderInfo"
        v-loading.fullscreen.lock="fullscreenLoading"
      ></confirm-activity>
      <span class="divided-line"></span>
      <div class="change-container">
        <div class="diasbled-cover"></div>
        <change-content :activityId="currentId"></change-content>
        <change-picture :activityId="currentId"></change-picture>
      </div>
    </div>
  </div>
</template>

<script>
import confirmActivity from "@/components/manage-component/manageActivity/confirm/confirm-activity";
import changeContent from "@/components/manage-component/manageActivity/changeActivity/changeContent";
import changePicture from "@/components/manage-component/manageActivity/changeActivity/changePicture";
import Aside from "@/components/manage-component/Aside";
import TopBar from "@/components/manage-component/TopBar";
import SubBar from "@/components/manage-component/SubBar";
export default {
  components: {
    confirmActivity,
    changeContent,
    changePicture,
    Aside,
    TopBar,
    SubBar,
  },
  props: {},
  data() {
    return {
      currentId: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    renderInfo(id) {
      this.fullscreenLoading = true;
      this.currentId = id;
      this.fullscreenLoading = false;
      document.querySelector(".diasbled-cover").style.display = "none";
    },
  },
  mounted() {},
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