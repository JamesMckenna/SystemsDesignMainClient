<template>
  <site-nav />
  <notify v-if="store.getters.getShowRefreshModal" />
  <site-header v-if="header.render" />
  <router-view
    v-slot="{ Component }"
    id="content-area"
    v-on:renderHeader="renderHeader"
  >
    <transition name="routetrans" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
  <site-footer />
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onUpdated, reactive } from "vue";
import SiteHeader from "@/components/main-components/SiteHeader.vue";
import SiteNav from "@/components/main-components/SiteNav.vue";
import SiteFooter from "@/components/main-components/SiteFooter.vue";
import Notify from "@/components/helper-components/NotifyModal.vue";
import { store } from "@/store/index";

const header = reactive({ render: false });

const renderHeader = (val: boolean): void => {
  header.render = val;
};

onBeforeMount(() => {
  store.getters.getUserManager.events.addUserLoaded(() => {
    //if statement prevents event from calling store.dispatch("hideRefreshModal") more than once
    if (store.getters.getShowRefreshModal) {
      store.commit("HIDE_REFRESH_MODAL");
    }
  });

  store.getters.getUserManager.events.addAccessTokenExpiring(() => {
    if (!store.getters.getShowRefreshModal) {
      store.commit("SHOW_REFRESH_MODAL");
    }
  });

  store.getters.getUserManager.events.addAccessTokenExpired(() => {
    store.dispatch("logout");
  });

  store.getters.getUserManager.events.addSilentRenewError(() => {
    store.commit(
      "SET_ERROR",
      "An error occured when attempting to refresh you login status."
    );
  });

  store.getters.getUserManager.events.addUserSignedOut(() => {
    store.commit("SET_LOGOUT_STATE");
    if (
      localStorage.getItem(
        "oidc.user:" +
          process.env.VUE_APP_IS4_BASE_URL +
          ":" +
          process.env.VUE_APP_MAIN_CLIENT
      ) != undefined
    ) {
      localStorage.removeItem(
        "oidc.user:" +
          process.env.VUE_APP_IS4_BASE_URL +
          ":" +
          process.env.VUE_APP_MAIN_CLIENT
      );
    }
  });
});

onBeforeUnmount(() => {
  store.getters.getUserManager.events.removeUserLoaded(() => {
    store.commit("SET_LOGOUT_STATE");
    console.info("User loaded listener successfully removed");
  });

  store.getters.getUserManager.events.removeAccessTokenExpiring(() => {
    console.info("Access token expiring listener successfully removed");
  });

  store.getters.getUserManager.events.removeAccessTokenExpired(() => {
    console.info("Access token expired listener successfully removed");
  });

  store.getters.getUserManager.events.removeSilentRenewError(() => {
    console.info("Silientrenew error listener successfully removed");
  });

  store.getters.getUserManager.events.removeUserSignedOut(() => {
    console.info("User signout listener successfully removed");
  });
});

onUpdated(() => {
  if (
    localStorage.getItem(
      "oidc.user:" +
        process.env.VUE_APP_IS4_BASE_URL +
        ":" +
        process.env.VUE_APP_MAIN_CLIENT
    ) != undefined
  ) {
    const data = localStorage.getItem(
      "oidc.user:" +
        process.env.VUE_APP_IS4_BASE_URL +
        ":" +
        process.env.VUE_APP_MAIN_CLIENT
    );
    store.commit("SET_LOGGEDIN_STATE", data);
  }
});
</script>

<style>
#app {
  position: relative;
  margin: auto auto;
  top: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.renderd-content {
  position: relative;
  z-index: 100;
  padding-top: 9rem;
}

.routetrans-enter-from {
  opacity: 0;
  transform: translateX(10rem);
}
.routetrans-enter-active {
  transition: all 0.5s ease-out;
}
.routetrans-leave-to {
  opacity: 0;
  transform: translateX(-10rem);
}
.routetrans-leave-active {
  transition: all 0.5s ease-in;
}

.highlight-p-tag {
  width: 95%;
  margin: 1rem auto;
  padding: 1rem 0.25rem 1rem 0.25rem;
  transition: background-color, box-shadow 0.5s ease-in;
}
.highlight-p-tag__observer {
  background-color: var(--bgcolor2);
  border-radius: 0.1875rem;
  box-shadow: 0 0 0.5rem var(--bgcolor3);
}

p {
  margin: auto auto !important;
  max-width: 45rem;
  padding: 1rem 1rem !important;
  line-height: 200% !important;
}

.figure-images,
.images {
  display: block;
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: 2rem auto;
  border-radius: 0.1875rem;
}
.images {
  box-shadow: 0 0 0.5rem var(--bgcolor3);
}

.router-link-active,
.router-link-exact-active {
  color: var(--bgcolor3);
}

.a-tag-style-two {
  font-weight: bold;
  word-wrap: break-word;
}
.a-tag-style-two:hover {
  font-weight: bold;
  color: var(--bgcolor1);
}

.hr-tag-2 {
  margin: 2rem auto;
  max-width: 45rem;
  line-height: 1.5rem;
  border: none;
  height: 0.125rem;
  color: var(--bgcolor1);
  background-color: var(--bgcolor1);
}

footer {
  position: relative;
  margin-top: 3rem !important;
  height: 10rem;
  padding: 2rem;
  background-color: var(--bgcolor3);
}
footer p {
  margin: auto auto;
  max-width: 45rem;
  text-align: center;
  padding: 1rem 1rem;
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  #app {
    min-width: 20rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  #app {
    min-width: 40rem;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  #app {
    min-width: 45.5rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
  #app {
    width: 83rem;
  }
}
</style>
