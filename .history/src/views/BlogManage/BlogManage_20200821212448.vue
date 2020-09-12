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
  border-radius: 5px;
  background: #fff;
}

.blog-m{
    height: 545px;
    overflow-y: scroll;
    width: 100%;
    float: right;
}

.blog-m::-webkit-scrollbar{
    width: 30px;
}

.blog-m::-webkit-scrollbar {
/*滚动条整体样式*/
width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
height: 1px;
}

.blog-m::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
border-radius: 10px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
background: #535353;
}

.blog-m-box {
  float: left;
  width: 80%;
}
.blog-table {
  margin: 0 auto;
}
</style>
