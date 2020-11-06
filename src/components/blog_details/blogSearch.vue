<template>
  <div class="search_container">
    <input type="text" placeholder="搜索博客" />
    <div class="search_btn">
      <button>搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogSearch",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
  @import url("../../assets/css/blog_details/base.css");
.search_container {
  width: 320px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  background-color: #fff;
}

.search_container input {
  height: 100%;
  width: 100%;
  border: none;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding-left: 50px;
  background: url(../../assets/icon/search.png) 10px 50%/24px no-repeat;
}

.search_btn {
  height: 100%;
}

.search_btn button {
  width: 85px;
  height: 100%;
  background-color: #1693c4;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border: none;
  color: #fff;
}

.search_btn button:hover{
  background-color: #5ca4d8;
}

.search_btn button:active{
  background-color: #1693c4;
}
</style>