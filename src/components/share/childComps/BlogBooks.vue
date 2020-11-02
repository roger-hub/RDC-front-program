<template>
  <div class="blog-books">
    <div class="shr-header">
      <div class="shr-title fl">
        <span class="fontsize"></span>
        <span class="shr-txt font18">
          书籍推荐
          <div class="shr-under under16"></div>
        </span>
      </div>
      <div class="books-nav fr">
        <div class="direction">
          <div class="direction-now" @click="showAllDir">
            {{ dir }}
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <ul v-show="isDirShow" @click="chooseDir">
          <li
            v-for="(item, index) in allDir"
            :key="index"
            v-show="item === dir ? false : true"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="books-container">
      <div class="books-bd" v-for="(item, index) in booksItem" :key="index">
        <div class="books-pic">
          <img :src="item.coverUrl" alt />
        </div>
        <div class="books-ctr">
          <div class="books-tit">{{ item.bookName }}</div>
          <div class="books-author">{{ item.author }}</div>
          <div class="books-content"></div>
        </div>
      </div>
    </div>
    <div class="books-more fr" @click="getMoreBooks">
      <i class="el-icon-refresh"></i>
      刷新
    </div>
  </div>
</template>

<script>
export default {
  // 部件
  components: {},
  data() {
    return {
      booksItem: [],
      isDirShow: false,
      dir: "前端",
      allDir: ["前端", "后台", "安卓", "大数据"],
    };
  },
  watch: {},
  methods: {
    showAllDir() {
      this.isDirShow = !this.isDirShow;
    },
    getMoreBooks() {
      this.$axios
        .post("/first/book/queryBooks_02", {
          direction: this.dir,
        })
        .then((res) => {
          this.booksItem = res.data;
        });
    },
    chooseDir(event) {
      this.dir = event.target.innerText;
      this.$axios
        .post("/first/book/queryBooks_02", {
          direction: this.dir,
        })
        .then((res) => {
          this.isDirShow = !this.isDirShow;
          this.booksItem = res.data;
        });
    },
  },
  created() {
    this.$axios
      .post("/first/book/queryBooks_02", {
        direction: "前端",
      })
      .then((res) => {
        this.booksItem = res.data;
      });
  },
};
</script>

<style scoped>
.books-nav {
  position: relative;
  padding-right: 15px;
  line-height: 40px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.books-nav ul {
  position: absolute;
  top: 100%;
  right: 0;
  width: 70px;
  background-color: #fff;
  box-shadow: 0px 3px 3px #ccc;
}
.books-nav ul > li {
  height: 30px;
  line-height: 30px;
  padding: 0 0 0 15px;
}
.books-nav ul > li:hover {
  color: #0d6aa7;
}
.books-container {
  min-height: 100px;
}
.books-bd {
  display: flex;
  cursor: pointer;
  border-bottom: 1px dotted #ccc;
  transition: 0.5s;
}
.books-bd:hover {
  background-color: rgb(245, 245, 245);
  box-shadow: 0 0 3px #e0e0e0;
}
.books-pic {
  display: flex;
  width: 100px;
  height: 150px;
  justify-content: center;
  align-items: center;
}
.books-pic img {
  width: 90px;
  height: 95px;
}
.books-ctr {
  flex: 1;
  padding: 20px 5px;
}
.books-tit {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}
.books-tit:hover {
  color: #0d6aa7;
}
.books-author {
  font-size: 12px;
  color: #999;
}
.books-more {
  margin-top: 20px;
  padding-right: 15px;
  font-size: 12px;
  cursor: pointer;
}
.books-more:hover {
  color: #0d6aa7;
}
</style>
