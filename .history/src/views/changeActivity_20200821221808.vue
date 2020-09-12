<template>
  <div class="change-wrapper">
      <TopBar/>
      <SubBar>
          <span slot="fir">研发介绍</span>
          <span slot="sec">修改活动信息</span>
      </SubBar>
      <Aside class="aside"/>
    <confirm-activity @settleActivity="renderInfo" v-loading.fullscreen.lock="fullscreenLoading"></confirm-activity>
    <span class="divided-line"></span>
    <div class="change-container">
      <div class="diasbled-cover"></div>
      <change-content :activityId="currentId"></change-content>
      <change-picture :activityId="currentId"></change-picture>
    </div>
  </div>
</template>

<script>
import confirmActivity from "@/components/manageActivity/confirm/confirm-activity";
import changeContent from "@/components/manageActivity/changeActivity/changeContent";
import changePicture from "@/components/manageActivity/changeActivity/changePicture";
import SubBar from '@/components/SubBar.vue'
import TopBar from '@/components/TopBar.vue'
import Aside from '@/components/Aside.vue'
export default {
  components: {
    confirmActivity,
    changeContent,
    changePicture,
    Aside,
    TopBar,
    SubBar
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
  width: 1000px;
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
</style>