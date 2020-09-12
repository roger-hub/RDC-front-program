<template>
  <div class="m-blog-actions">
    <!-- <vxe-button status="primary" icon="vxe-icon--plus">增加</vxe-button> -->
    <vxe-button icon="vxe-icon--refresh" @click="refreshList">刷新</vxe-button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import BlogManageBus from './BLogManageBus.js'
export default {
  methods: {
    refreshList() {
      BlogManageBus.$emit('refreshCurrentPage', 'true')
    }
  }
}
</script>

<style scoped>
.m-blog-actions {
  padding: 10px;
}
vxe-button {
  margin-right: 10px;
}
</style>
