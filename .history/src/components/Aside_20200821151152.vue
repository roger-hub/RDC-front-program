<template class="clearfix">
  <el-row class="tac">
  <el-col :span="12">
    <el-menu
      :unique-opened="true"
      default-active="activeIndex"
      router
      @open="handleOpen"
      @close="handleClose"
      class="el-menu-vertical-demo"
      background-color="#0D6AA7"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>研发介绍</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">项目</el-menu-item>
          <el-menu-item index="1-2">成员</el-menu-item>
          <el-menu-item index="1-3">活动</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>技术博客</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item index="2-1">新建博客</el-menu-item>
          <el-menu-item index="2-2">管理博客</el-menu-item> -->
          <el-menu-item v-for="(item,i) in navListTwo" :key="i" :index="item.name">
            <template slot="title">
              <span> {{ item.navItem }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>留言</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item index="2-1">审核</el-menu-item>
          <el-menu-item index="2-2">回复 & 删除</el-menu-item> -->
          <el-menu-item v-for="(item,i) in navListThree" :key="i" :index="item.name">
            <template slot="title">
              <span> {{ item.navItem }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  <router-view/>
</el-row>
</template>

<script>
export default {
  name:"Aside",
   data() { 
        return { 
          navListTwo:[ 
            {name:'/createblog',navItem:'新建博客'}, 
            {name:'/manageblog',navItem:'管理博客'}
            ],
            navListThree:[ 
            {name:'/checkmessage',navItem:'审核'}, 
            {name:'/deleteandreply',navItem:'回复 & 删除'}
            ],
            activeIndex:"unitSelection"
            } 
    },
  methods:{
    clickHead(e){
      this.$emit('changeHead');
      console.log(e.currentTarget);
      console.log(e.target);
    },
    clickTail(e){
      console.log(e.target);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // goClick(i){
    //   this.$router.push(this.navList[i].name);
    //   console.log(1)
    // }
  }
}
</script>

<style scoped>
.tac /deep/ .el-col{
  width: 100%;
  height: 2000px;
  border: none;
  background: #0D6AA7;
}

.tac /deep/ .el-col i{
  color: #fff;
}
</style>