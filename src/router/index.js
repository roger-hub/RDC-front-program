import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import blogDetail from "@/views/blogDetail";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/share",
    component: () => import("@/views/Share"),
    meta: {
      title: "技术分享"
    }
  },
  {
    path: "/blogDetail",
    component: blogDetail,
    query: {
      id: 280
    },
    meta: {
      title: "博客详情"
    }
  },
  {
    path: "/member",
    component: () => import("@/views/memberInfo"),
    meta: {
      title: "成员信息"
    }
  },
  {
    path: "/login",
    component: () => import("@/views/manage-views/Login"),
    meta: {
      title: "管理员登录"
    }
  },
  {
    path: "/RDC-home",
    component: () => import("@/views/manage-views/Home"),
    meta: {
      title: "后台首页"
    }
  },
  {
    path: "/checkmessage",
    component: () => import("@/views/manage-views/CheckMessage"),
    meta: {
      title: "检查消息"
    }
  },
  {
    path: "/deleteAndReply",
    component: () => import("@/views/manage-views/DeleteAndReply"),
    meta: {
      title: "删除留言"
    }
  },
  {
    path: "/createBlog",
    component: () => import("@/views/manage-views/blogWrite"),
    meta: {
      title: "内部博客写入"
    }
  },
  {
    path: "/manageBlog",
    component: () => import("@/views/manage-views/BlogManage/blogManage.vue"),
    meta: {
      title: "管理博客"
    }
  },
  {
    path: "/addInfo",
    component: () => import("@/views/manage-views/addInfo"),
    meta: {
      title: "添加成员信息"
    }
  },
  {
    path: "/changeInfo",
    component: () => import("@/views/manage-views/changeInfo"),
    meta: {
      title: "修改信息"
    }
  },
  {
    path: "/addActivity",
    component: () => import("@/views/manage-views/addActivity"),
    meta: {
      title: "添加活动"
    }
  },
  {
    path: "/changeActivity",
    component: () => import("@/views/manage-views/changeActivity"),
    meta: {
      title: "修改活动信息"
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title; //给目标路由的页面的title赋值
  // document.title = to.name;
  next(); //必须调用，不调用不会跳转
});
export default router;
