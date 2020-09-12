import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
Vue.prototype.$axios = Axios;
Vue.prototype.$http = Axios;
Vue.prototype.$blogBus = new Vue()
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VXETable)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')