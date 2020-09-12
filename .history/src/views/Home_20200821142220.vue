<template class="clearfix">
  <div class="home">
    <TopBar/>
    <Aside class="aside"/>
    <div class="right clearfix">
      <img src="../assets/logo.png" alt="">
      <div>Welcome to Reasearch and Development Center!</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'Home',
  components: {
    Aside,
    TopBar
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

img{
  display: block;
  width: 400px;
  margin: 50px auto;
}

.right div{
  display: table;
  margin: 20px auto;
  font-size: 50px;
  text-decoration-color:red;
}
</style>
