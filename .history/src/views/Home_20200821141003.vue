<template class="clearfix">
  <div class="home">
    <TopBar/>
    <Aside class="aside"/>
    <div class="right clearfix">
      <subBar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'
import SubBar from '@/components/SubBar.vue'
import CheckMessage from './CheckMessage.vue'
import DeleteAndReply from './DeleteAndReply.vue'

export default {
  name: 'Home',
  components: {
    Aside,
    TopBar,
    SubBar,
    CheckMessage,
    DeleteAndReply
  }
}
</script>

<style scoped>
.home{
  height: 100%;
  background: #ccc;
}

.aside{
  width: 20%;
  height: 100%;
  float: left;
}

.right{
  width:80%;
  float: right;
}

.router{
  height: 100%;
}
</style>
