<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <router-link
      class="blog-card"
      v-bind:key="index"
      v-for="(title, index) of title"
      tag="div"
      :to="{ path: '/blogDetail', query: { id: response[index].id } }"
    >
      <div class="card-hd">
        <div class="blog-date">
          <div class="blog-y">{{ time[index].year }}</div>
          <div class="blog-m">{{ time[index].month }}</div>
          <div class="blog-d">{{ time[index].day }}</div>
        </div>
        <div class="blog-ctr">
          <div class="blog-title">{{ title }}</div>
          <div class="blog-author">BY {{ author[index] }}</div>
          <div class="blog-content" v-html="content[index] + '...'"></div>
          <div class="blog-pic"></div>
        </div>
      </div>
      <div class="card-action">
        <div class="blog-tag">
          <i class="el-icon-collection-tag"></i>
          <span class="tags-li" v-for="(tag, i) in tags[index]" :key="i">
            {{ tag }}
          </span>
        </div>
        <div class="show-more">
          阅读更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
    </router-link>
    <div class="blog-pages">
      <el-pagination
        @current-change="currentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="totalSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import BlogBus from "@/components/share/net/BlogBus";
import SearchBus from "@/components/share/net/SearchBus";
import { fmtTime } from "@/common/utils.js";
import { deleteHTMLTag } from "@/common/utils.js";
import { get } from "http";

export default {
  name: "BlogCardAll",
  components: {
    fmtTime,
    deleteHTMLTag,
  },
  data() {
    return {
      mini: "1",
      Searchword: "",
      response: [],
      currentPage: 0,
      totalSize: 10,
      currrentDirection: "前端",
      fullscreenLoading: true,
    };
  },
  computed: {
    previousPage() {
      return this.currentPage - 1;
    },
    title() {
      return this.response.map((res) => res.title);
    },
    author() {
      return this.response.map((res) => res.author);
    },
    time() {
      return this.response.map((res, i) => {
        if (fmtTime(res.time) !== "未知") {
          return fmtTime(res.time);
        } else {
          return {};
        }
      });
    },
    content() {
      return this.response.map((res) => res.first_50);
    },
    tags() {
      return this.response.map((res) => {
        return eval("(" + res.class_ + ")");
      });
    },
  },
  mounted() {
    BlogBus.$on("getDataByDirection", (msg) => {
      this.currrentDirection = msg;
      this.getPageNum();
      this.getBlog();
    }),
      SearchBus.$on("referData", (msg) => {
        this.Searchword = msg;
        this.getBlog();
        this.getPageNum();
        this.Searchword = ""; //初始化搜索关键字
      });
  },
  created() {
    this.getPageNum();
    this.getBlog();
  },
  methods: {
    //更改页面
    currentChange(newPage) {
      this.currentPage = newPage;
      this.$axios
        .post("/first/blog/get", {
          around: "外",
          mini: "1",
          class_: this.currrentDirection,
          page: newPage - 1 + "",
        })
        .then((res) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.response = res.data;
        });
    },
    //获取博客 - 内外部 是否获取详情 方向 关键字 页码
    getBlog() {
      this.fullscreenLoading = true;
      this.$axios
        .post("/first/blog/get", {
          around: "外",
          mini: this.mini,
          class_: this.currrentDirection,
          title: this.Searchword,
          page: this.currentPage,
        })
        .then((res) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.fullscreenLoading = false;
          this.response = res.data;
          // this.currentPage = 1;
        });
    },
    //获取页码 - 内外部 方向 关键字
    getPageNum() {
      this.$axios
        .post("/first/blog/get", {
          around: "外",
          title: this.Searchword,
          class_: this.currrentDirection,
          count: "1",
        })
        .then((res) => {
          this.totalSize = res.data;
        });
    },
  },
};
</script>

<style scoped>
/* 通用博客卡片 */
.blog-card {
  margin-bottom: 30px;
  padding: 0 8px;
  border-bottom: 1px solid #d1d1d1;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
  cursor: pointer;
}
.blog-card:hover {
  background-color: rgb(245, 245, 245);
  box-shadow: 0 0 5px #ccc;
}
.blog-card:hover .blog-title {
  color: #0d6aa7;
}
.card-hd {
  display: flex;
  min-height: 100px;
  padding: 15px 0;
  cursor: pointer;
}
.card-action {
  display: flex;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 12px;
  color: #666;
}
.blog-date {
  width: 40px;
  height: 55px;
  padding: 10px;
  margin-right: 20px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  background-image: linear-gradient(to bottom, #0890c5 80%, #a2d2ff 100%);
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
}
.blog-y {
  font-size: 12px;
}
.blog-m {
  font-size: 20px;
}
.blog-d {
  font-size: 12px;
}
.blog-ctr {
  flex: 1;
  color: #555;
}
.blog-title {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 500px;
  letter-spacing: 2px;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
}
.blog-author {
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}
.blog-content {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}
.blog-pic img {
  width: 400px;
}
.show-more {
  margin-left: auto; /*flex布局右对齐*/
  cursor: pointer;
}
.tags-li {
  padding: 0 3px;
}
.blog-pages {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
.el-pagination {
  color: #666;
}
.el-pagination button:hover {
  color: #0d6aa7;
}
.el-pagination .el-pager li:hover {
  color: #0d6aa7;
}
.el-pagination .el-pager li.active {
  color: #0d6aa7;
}

@keyframes scale {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

.ball-pulse > div:nth-child(0) {
  -webkit-animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(1) {
  -webkit-animation: scale 0.75s 0.12s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(2) {
  -webkit-animation: scale 0.75s 0.24s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(3) {
  -webkit-animation: scale 0.75s 0.36s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div {
  background-color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
</style>
