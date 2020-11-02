<template>
  <div class="block">
    <el-carousel
      :interval="4000"
      trigger="click"
      height="468.75px"
      @change="
        (now, pre) => {
          change(now, pre);
        }
      "
    >
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <img v-bind:src="img.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Rotation",
  data() {
    return {
      imgList: [
        { url: require("@/assets/images/home-images/lbt1.jpg") },
        { url: require("@/assets/images/home-images/lbt2.jpg") },
        { url: require("@/assets/images/home-images/lbt3.jpg") },
      ],
    };
  },
  methods: {
    change(now, pre) {
      const url = this.imgList[now].url;
      this.$emit("changeBg", url);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}

.block /deep/.el-carousel__indicator .el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  border: 1.5px solid #0d6aa7;
}

.block /deep/.el-carousel__indicator .el-carousel__button:hover {
  width: 16px;
  height: 16px;
}

.block /deep/ .el-carousel__arrow--left,
.block /deep/ .el-carousel__arrow--right {
  width: 80px;
  height: 80px;
  font-size: 30px;
}

.block /deep/ .is-active .el-carousel__button {
  background: #0d6aa7;
}
</style>
