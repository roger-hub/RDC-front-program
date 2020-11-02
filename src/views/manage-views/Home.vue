<template class="clearfix">
  <div class="home">
    <TopBar />
    <Aside class="aside" />
    <div class="right clearfix">
      <img src="../../assets/manage-assets/logo.png" alt="" />
      <div>Welcome!</div>
      <div>Here is RDC.</div>
      <div>Reasearch and Development Center.</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from "@/components/manage-component/Aside";
import TopBar from "@/components/manage-component/TopBar";

export default {
  name: "Home",
  components: {
    Aside,
    TopBar,
  },
};
</script>

<style scoped>
html,body{
  height: 100vh;
  overflow: hidden;
}

.home {
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
}

.aside {
  width: 20%;
  height: 100vh;
  float: left;
}

.right {
  width: 80%;
  float: right;
}

.router {
  height: 100%;
}

img {
  display: block;
  width: 300px;
  margin: 100px auto;
}

.right div {
  display: table;
  margin: 0 auto;
  font-size: 25px;
  font-family: 方正粗圆简体;
  font-weight: bolder;
}
</style>
