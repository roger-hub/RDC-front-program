<template>
  <div class="blog-tags">
    <div class="shr-header">
      <div class="shr-title fl">
        <span class="fontsize"></span>
        <span class="shr-txt font18">
          标签
          <div class="shr-under under16"></div>
        </span>
      </div>
    </div>
    <ul class="tags">
      <li>javascript</li>
      <li>html</li>
      <li>css</li>
      <li>java</li>
      <li>c</li>
      <li>c++</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.blog-tags {
  margin-bottom: 20px;
}
.tags {
  overflow: hidden;
  padding: 0 10px;
  color: #666;
}
.tags li {
  float: left;
  padding: 3px 6px;
  margin: 0 16px 10px 0;
  background-color: #fafafa;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
}
.tags li:hover {
  background-color: #e1e1e1;
}
</style>
