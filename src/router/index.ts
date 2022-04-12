import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import { User } from "oidc-client";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting and lazy-loaded when the route is visited
    component: () => import(/* webpackChunkName: "home" */ "../views/Main.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/About",
    name: "About",
    component: () => import(/* webpackChunkName: "home" */ "../views/Main.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import(/* webpackChunkName: "home" */ "../views/Main.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/NotFound.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  (document.getElementsByTagName("title")[0] as HTMLElement).innerHTML =
    to.name!.toString() + "-SystemsDesign DOT rocks";
  if (store.getters.getLoggedIn) {
    const expireTime = await store.getters.getUserManager
      .getUser()
      .then((user: User) => {
        return user.expires_at;
      });
    const now = Math.round(Date.now() / 1000);
    if (expireTime - now <= 300) {
      store.getters.getUserManager.signinSilent();
    }
  }
});

export default router;
