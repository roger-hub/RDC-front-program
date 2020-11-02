import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/normalize.css";
import "@/assets/iconfont/iconfont.css";
import "@/icons";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/index.css";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$blogBus = new Vue();
Vue.use(VXETable);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
