<template>
  <div class="blog-manage">
    <top-bar></top-bar>
    <div class="blog-m">
      <a-side></a-side>
      <div class="blog-m-box">
        <sub-bar></sub-bar>
        <blog-actions> </blog-actions>
        <blog-table></blog-table>
      </div>
    </div>
  </div>
</template>

<script>
import BlogTable from './childComps/BlogTable'
import BlogActions from './childComps/BlogActions'
import aSide from '../../components/Aside'
import TopBar from '../../components/TopBar'
import SubBar from '../../components/SubBar'

export default {
  components: {
    BlogTable,
    BlogActions,
    aSide,
    TopBar,
    SubBar
  }
}
</script>

<style scoped>
.blog-m {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.blog-m-box {
  float: left;
  width: 80%;
}
.blog-table {
  margin: 0 auto;
}
</style>
