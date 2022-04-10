<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal theme-border theme-shadow">
        <header class="modal-header">
          <h3 class="header-text">Your session is about to expire!</h3>
        </header>
        <section class="modal-body">
          A session last for {{ sessionLength }} minutes and you have been
          inactive for awhile.<br />
          You will be logged out soon.
        </section>
        <footer class="modal-footer">
          <button
            id="refreshBtn"
            type="button"
            class="theme-button theme-shadow theme-border renew-button"
            @click="renew"
          >
            Don't log me out, refresh my session!
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { store } from "@/store/index";
import { onMounted, ref } from "vue";

let sessionLength = ref(0);
const um = store.getters.getUserManager;
const renew = () => {
  const rb = document.getElementById("refreshBtn");
  rb!.innerText = "REFRESHING!!";
  if (store.getters.getLoggedIn) {
    um.startSilentRenew();
    setTimeout(() => {
      um.stopSilentRenew();
    }, 2000);
  }
};

onMounted(() => {
  sessionLength.value = process.env.VUE_APP_TOKEN_DURATION / 60;
});
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 1rem;
  display: flex;
  background-color: var(--bg-colour-1);
}

.modal-header {
  height: 4rem;
  border-bottom: 1px solid #eeeeee;
  color: black;
  padding: 0;
}
.header-text {
  margin: auto;
}
.modal-footer {
  height: 3rem;
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.renew-button {
  margin: auto;
  height: 2rem;
}

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .modal {
    max-width: 95%;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
