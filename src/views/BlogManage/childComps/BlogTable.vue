<template>
  <div id="BlogTable">
    <div class="table-wrap">
      <vxe-table
        border
        resizable
        auto-resize
        height="425px"
        size="medium"
        highlight-hover-row
        :loading="loading"
        :data="tableData"
      >
        <vxe-table-column field="id" title="ID" width="50"></vxe-table-column>
        <vxe-table-column
          show-overflow="ellipsis"
          field="title"
          title="标题"
          width="350"
        ></vxe-table-column>
        <vxe-table-column
          show-overflow="ellipsis"
          field="class_"
          title="分类"
          width="160"
        ></vxe-table-column>
        <vxe-table-column
          show-overflow="ellipsis"
          field="time"
          title="时间"
          width="180"
        ></vxe-table-column>
        <vxe-table-column
          show-overflow="ellipsis"
          field="author"
          title="作者"
          width="150"
        ></vxe-table-column>

        <vxe-table-column title="操作" fixed="right" width="200">
          <template v-slot>
            <el-button
              type="danger"
              size="mini"
              plain
              @click="removeEvent($event)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <div id="tb-footer">
        <div class="tb-footer-fl"></div>
        <div class="tb-footer-fr">
          <el-pagination
            @current-change="throttle(handleCurrentChange($event), 5000)"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="totalNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleLists } from '../../../common/utils.js'
import BlogManageBus from './BLogManageBus.js'
export default {
  name: 'blog-table',
  data() {
    return {
      tableData: [],
      loading: true,
      currentPage: 0,
      totalNum: 10,
      around: '外',
      dir: '',
      currentId: '',
      searchWord: ''
    }
  },
  created() {
    this.getTotaLNum()
    this.refreshPage()
  },
  mounted() {
    //刷新当前页
    BlogManageBus.$on('refreshCurrentPage', res => {
      this.refreshPage()
    }),
      //处理搜索函数
      BlogManageBus.$on('handleSearch', res => {
        this.searchWord = res
        this.getTotaLNum()
        this.refreshPage()
      }),
      //处理内部博客外部博客的切换问题
      BlogManageBus.$on('refreshAround', res => {
        //初始化
        this.currentPage = 0;
        this.searchWord = ''
        this.around = res;
        this.getTotaLNum();
        this.refreshPage()
      })
  },
  methods: {
    deleteBlog() {
      this.$axios
        .post('/api/blog/delete', {
          id: this.currentId
        })
        .then(res => {
          this.refreshPage()
          this.getTotaLNum()
        })
    },
    getTotaLNum() {
      this.$axios
        .post('/api/blog/get', {
          around: this.around,
          class_: this.dir,
          title: this.searchWord,
          count: '1',
          pNum: "8"
        })
        .then(res => {
          this.totalNum = res.data
        })
    },
    refreshPage(page) {
      this.loading = true
      this.currentPage = page || this.currentPage
      this.$axios
        .post('/api/blog/get', {
          around: this.around,
          class_: this.dir,
          title: this.searchWord,
          page: this.currentPage,
          pNum: "8"
        })
        .then(res => {
          this.loading = false
          this.tableData = res.data.map((value, index) => {
            return (value = handleLists(value))
          })
        })
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage - 1
      this.refreshPage()
    },
    throttle(handler, wait) {
      var lastTime = 0
      return function () {
        var nowTime = new Date().getTime()
        if (nowTime - lastTime > wait) {
          handler.apply(this, arguments)
          lastTime = nowTime
        }
      }
    },
    removeEvent(row) {
      this.currentId = row.path[3].firstChild.firstChild.firstChild.innerHTML
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteBlog()
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>
#BlogTable {
  width: 100%;
  padding: 10px;
}
#tb-footer {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
}

.tb-footer-fl {
  padding: 0 5px;
}
.tb-footer-fr {
  margin-left: auto;
}

.vxe-modal--footer button {
  display: inline-block;
}
</style>
