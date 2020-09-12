import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CheckMessage from '../views/CheckMessage.vue'
import DeleteAndReply from '../views/DeleteAndReply.vue'
import blogWrite from '../views/blogWrite.vue'
import BlogManage from '../views/BlogManage/BlogManage.vue'
import addInfo from '../views/addInfo.vue'
import changeInfo from '../views/changeInfo.vue'
import addActivity from '../views/addActivity.vue'
import changeActivity from '../views/changeActivity.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: "/login",
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/checkmessage',
        name: 'CheckMessage',
        component: CheckMessage
    },
    {
        path: '/deleteandreply',
        name: 'DeleteAndReply',
        component: DeleteAndReply
    },
    {
        path: '/createblog',
        name: 'blogWrite',
        component: blogWrite
    },
    {
        path: '/manageblog',
        name: 'BlogManage',
        component: BlogManage
    },
    {
        path: '/addinfo',
        name: 'addInfo',
        component: addInfo
    },
    {
        path: '/changeinfo',
        name: 'changeInfo',
        component: changeInfo
    },
    {
        path: '/addactivities',
        name: 'addActivity',
        component: addActivity
    },
    {
        path: '/changeactivities',
        name: 'changeActivity',
        component: changeActivity
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router