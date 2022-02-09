import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    redirect: "/mobx",
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
    path: "/formily",
    name: "formily",
    component: () =>
      import(
        /* webpackChunkName: "formily" */ "../views/formily-reactive/userManage/List"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
