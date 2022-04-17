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
    children: [
      {
        path: "/About/TheApp",
        name: "The App",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/components/content-components/TheApp.vue"
          ),
      },
      {
        path: "/About/ElevatorPitch",
        name: "Elevator Pitch",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/components/content-components/ElevatorPitch.vue"
          ),
      },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import(/* webpackChunkName: "home" */ "../views/Main.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/3d-web",
    name: "3DWeb",
    component: () =>
      import(/* webpackChunkName: "3DWeb" */ "@/components/babylon/3d-web.vue"),
  },
  {
    path: "/rose",
    name: "Rose",
    component: () =>
      import(/* webpackChunkName: "3DWeb" */ "@/components/babylon/rose.vue"),
  },
  {
    path: "/gears",
    name: "Gears",
    component: () =>
      import(/* webpackChunkName: "3DWeb" */ "@/components/babylon/gears.vue"),
  },
  {
    path: "/robot-arm",
    name: "RobotArm",
    component: () =>
      import(
        /* webpackChunkName: "3DWeb" */ "@/components/babylon/robotArm.vue"
      ),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/NotFound.vue"),
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
