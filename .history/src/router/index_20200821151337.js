import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CheckMessage from '../views/CheckMessage.vue'
import DeleteAndReply from '../views/DeleteAndReply.vue'

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
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router