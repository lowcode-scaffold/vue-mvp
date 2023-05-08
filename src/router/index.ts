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
  },
  {
    path: "/vue/template",
    name: "vue-template",
    component: () =>
      import(
        /* webpackChunkName: "vue-template" */ "../views/vue/userManage/List/index.vue"
      ),
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
  },
  {
    path: "/definePropsAndEmit",
    name: "definePropsAndEmit",
    component: () =>
      import(
        /* webpackChunkName: "definePropsAndEmit" */ "../views/vue/DefinePropsAndEmit/index.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
