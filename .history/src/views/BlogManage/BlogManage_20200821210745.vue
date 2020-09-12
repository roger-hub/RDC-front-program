<template>
  <div class="blog-manage">
    <TopBar/>
    <SubBar>
        <span slot="fir">技术博客</span>
        <span slot="sec">管理博客</span>
    </SubBar>
    <Aside class="aside"/>
    <div class="blog-m">
      <div class="blog-m-box">
        <BlogActions/>
        <BlogTable/>
      </div>
    </div>
  </div>
</template>

<script>
import BlogTable from './childComps/BlogTable.vue'
import BlogActions from './childComps/BlogActions.vue'
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'
import SubBar from '@/components/SubBar.vue'

export default {
  components: {
    BlogTable,
    BlogActions,
    Aside,
    TopBar,
    SubBar
  }
}
</script>

<style scoped>
.blog-manage{
  width: 100%;
  height: 100%;
  /* margin:10px auto; */
  border-radius: 5px;
  background: #fff;
}

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
