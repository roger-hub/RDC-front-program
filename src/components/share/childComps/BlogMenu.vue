<template>
  <div class="blog-menu">
    <div class="shr-header">
      <div class="shr-title fl">
        <span class="fontsize"></span>
        <span class="shr-txt font18">
          菜单
          <div class="shr-under under16"></div>
        </span>
      </div>
    </div>
    <div class="menu-bd">
      <ul class="menu-ul">
        <li
          :key="item"
          v-for="(item, index) in items"
          :class="isItem == index ? 'active' : ''"
          @click="MenuClickEvent(item, index)"
        >
          {{ item }}
          <span class="fontsize fr">></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlogBus from "@/components/share/net/BlogBus";

export default {
  data() {
    return {
      items: ["前端", "后台", "安卓", "大数据"],
      isItem: 0,
    };
  },
  watch: {},
  methods: {
    MenuClickEvent(msg, index) {
      BlogBus.$emit("getDataByDirection", msg);
      var i = this;
      i.isItem = index;
    },
  },
};
</script>

<style scoped>
.blog-menu {
  margin-bottom: 20px;
}
.menu-bd {
  font-size: 16px;
  color: #777777;
}
.menu-ul li {
  padding: 15px 10px;
  cursor: pointer;
}
.menu-ul li:hover {
  color: #0d6aa7;
  background-color: rgb(245, 245, 245);
}
.menu-ul li.active {
  color: #0d6aa7;
  background-color: rgb(245, 245, 245);
}
.menu-ul span {
  padding-right: 15px;
}
</style>
