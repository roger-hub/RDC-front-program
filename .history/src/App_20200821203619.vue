<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

*{
  padding: 0;
  margin: 0;
}

.clearfix::after{
  content: '';
  clear: both;
  display: block;
}

html{
  height: 100%;
}

body{
  overflow: hidden;
}

ul{
  list-style: none;
}

.aside{
  width: 20%;
  height: 100%;
  float: left;
}
</style>
