<template>
  <div class="m-blog-actions">
    <vxe-select
      v-model="value"
      placeholder="外部博客"
      size="medium"
      @change="handleAround($event)"
    >
      <vxe-option label="外部博客" value="外部博客"></vxe-option>
      <vxe-option label="原创博客" value="原创博客"></vxe-option>
    </vxe-select>
    <vxe-button icon="vxe-icon--refresh" @click="refreshList">刷新</vxe-button>

    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      size="small"
      v-model="input2"
      @change="handleSeasrch()"
    >
    </el-input>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import BlogManageBus from './BLogManageBus.js'
export default {
  data() {
    return {
      input2: '',
      value: null
    }
  },
  methods: {
    refreshList() {
      BlogManageBus.$emit('refreshCurrentPage', 'true')
    },
    handleSeasrch() {
      BlogManageBus.$emit('handleSearch', this.input2)
      this.input2 = ''
    },
    handleAround(obj) {
      if (obj.value === '原创博客') {
        BlogManageBus.$emit('refreshAround', '内')
      } else {
        BlogManageBus.$emit('refreshAround', '外')
      }
    }
  }
}
</script>

<style scoped>
.m-blog-actions {
  padding: 10px;
  display: flex;
}
.m-blog-actions .vxe-button {
  padding: 5px;
  margin-right: 10px;
}
.m-blog-actions .vxe-select {
  margin-right: 15px;
}
.m-blog-actions .el-input {
  margin-left: auto;
  width: 20%;
}
</style>
