<template>
  <div id="BlogTable">
    <div class="table-wrap">
      <vxe-table
        border
        resizable
        auto-resize
        height="100%"
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
          field="class_"
          title="分类"
          width="160"
        ></vxe-table-column>
        <vxe-table-column
          field="time"
          title="时间"
          width="180"
        ></vxe-table-column>
        <vxe-table-column
          field="author"
          title="作者"
          width="150"
        ></vxe-table-column>

        <vxe-table-column title="操作" fixed="right" width="200">
          <template v-slot>
            <el-button type="primary" size="mini" plain>查看</el-button>
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
      currentId: ''
    }
  },
  created() {
    this.getTotaLNum()
    this.refreshPage()
  },
  mounted() {
    BlogManageBus.$on('refreshCurrentPage', res => this.refreshPage())
  },
  methods: {
    deleteBlog() {
      this.$axios
        .post('/api/blog/delete', {
          id: this.currentId
        })
        .then(res => {
          this.refreshPage()
        })
    },
    getTotaLNum() {
      this.$axios
        .post('/api/blog/get', {
          around: this.around,
          class_: this.dir,
          count: '1'
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
          page: this.currentPage
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
      return function() {
        var nowTime = new Date().getTime()
        if (nowTime - lastTime > wait) {
          handler.apply(this, arguments)
          lastTime = nowTime
        }
      }
    },
    removeEvent(row) {
      this.currentId = row.path[3].firstChild.firstChild.firstChild.innerHTML
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          this.deleteBlog()
        }
      })
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
</style>
