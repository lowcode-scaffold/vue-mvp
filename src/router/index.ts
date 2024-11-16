import {
  getIframeId,
  setIframeId,
  updateTitle,
} from "@/utils/electronWebService";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    redirect: "/vanilla",
  },
  {
    path: "/mobx",
    name: "mobx",
    component: () =>
      import(/* webpackChunkName: "mobx" */ "../views/mobx/userManage/List"),
  },
  {
    path: "/vue",
    name: "vue",
    component: () =>
      import(/* webpackChunkName: "vue" */ "../views/vue/userManage/List"),
    meta: {
      title: "vue-mvp|vue",
    },
  },
  {
    path: "/vue/template",
    name: "vue-template",
    component: () =>
      import(
        /* webpackChunkName: "vue-template" */ "../views/vue/userManage/List/index.vue"
      ),
    meta: {
      title: "vue-mvp|vue-template",
    },
  },
  {
    path: "/formily",
    name: "formily",
    component: () =>
      import(
        /* webpackChunkName: "formily" */ "../views/formily-reactive/userManage/List"
      ),
  },
  {
    path: "/vanilla",
    name: "vanilla",
    component: () =>
      import(
        /* webpackChunkName: "vanilla" */ "../views/vanilla/userManage/List"
      ),
    meta: {
      title: "vue-mvp|vanilla",
    },
  },
  {
    path: "/definePropsAndEmit",
    name: "definePropsAndEmit",
    component: () =>
      import(
        /* webpackChunkName: "definePropsAndEmit" */ "../views/vue/DefinePropsAndEmit/index.vue"
      ),
    meta: {
      title: "vue-mvp|definePropsAndEmit",
    },
  },
  {
    path: "/electronWebService",
    name: "electronWebService",
    component: () =>
      import(
        /* webpackChunkName: "electronWebService" */ "../views/electronWebService/index.vue"
      ),
    meta: {
      title: "vue-mvp|electronWebService",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.query.iframeId && !getIframeId()) {
    setIframeId(to.query.iframeId as string);
  }
  next();
});

router.afterEach((to, from) => {
  document.title = (to.meta.title as string) || "vue-mvp";
  updateTitle(document.title);
});

export default router;
