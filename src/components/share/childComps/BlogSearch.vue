<template>
  <div class="blog-srh" v-loading.fullscreen.lock="fullscreenLoading">
    <input type="text" id="blog-search" placeholder="搜索" @keyup.enter.prevent="enterSearch($event)" />
    <i class="el-icon-search" @click="handleSearch($event)"></i>
  </div>
</template>

<script>
import SearchBus from "@/components/share/net/SearchBus";
export default {
  data() {
    return {
      response: [],
      keyword: '',
      fullscreenLoading: false,
    };
  },
  // 部件
  components: {},
  // 静态
  props: {},
  // 对象内部的属性监听，也叫深度监听
  watch: {},
  // 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
  computed: {},
  // 方法表示一个具体的操作，主要书写业务逻辑；
  methods: {
    srchArticles() {
      SearchBus.$emit('referData', this.keyword)
    },
    handleSearch(e) {
      this.keyword = e.target.parentElement.firstChild.value;
      e.target.parentElement.firstChild.value = ''; //清空搜索框
      this.srchArticles();
    },
    enterSearch(e) {
      this.keyword = e.target.value;
      e.target.value = '';
      if (e.keyCode == 13) {
        this.srchArticles();
      }
    },
    // 请求数据
  }
}
</script>

<style scoped>
.blog-srh {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}
#blog-search {
  width: 240px;
  height: 35px;
  padding: 0 10px;
  border: none;
  outline: none;
  color: #666;
  font-size: 14px;
  border-bottom: #999 1px solid;
}
.el-icon-search {
  position: absolute;
  right: 20px;
  bottom: 10px;
  cursor: pointer;
}
.el-icon-search:hover {
  color: #0d6aa7;
}
</style>