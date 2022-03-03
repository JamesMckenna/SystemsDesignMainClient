<template>
  <div id="animateNavWithThisDiv">
    <nav id="mainNav" class="mainNavAnimation">
      <hr />
      <div id="navContainer">
        <div id="openCloseNavBtn">
          <button id="navBtn" title="Open Close nav button" aria-label="Open Close nav button" type="button">
            <span role="img" aria-label="[Nav button image]" title="Nav button image" id="openCloseNavImg"></span>
          </button>
        </div>
        <div id="wrapTitle">
          <span id="logoFlip" role="img" aria-label="[Image of The Thinker Statue]"></span>
          <h1 id="wrapTitleH1">
            <router-link id="mainH1Anchor" title="Website title and home link" to="/">Systems Design</router-link>
          </h1>
          <span id="logo"></span>
        </div>
        <div id="loginLinks">
          <div id="loginBtn" title="Login and Account links">
            <div>
              <a role="button" v-if="isLoggedIn" aria-label="Logout Account">Hi<i class="down"></i></a>
              <a role="button" v-else aria-label="Login Account">Log In<i class="down"></i></a>
            </div>
            <div>
              <ul id="login" class="loginIsClosed" data-mobile>
                <li v-if="isLoggedIn" data-move><a @click="redirect" aria-label="Account"><u>Account</u></a></li>
                <li v-else data-move><a :href="registerAccount" aria-label="Sign Up"><u>Sign Up</u></a></li>
                <li v-if="isLoggedIn" data-move><a @click="store.dispatch('logout', null, { root: true })" aria-label="Log Out"><u>Log Out</u></a></li>
                <li v-else data-move><a @click="store.dispatch('setLoggedInState', null, { root: true })" aria-label="Log In"><u>Log In</u></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div id="navLinksWrap">
        <ul id="navLinks" class="mainNavIsClosed" title="main navigation links">
          <li>
            <a role="button">Home<i class="down"></i></a>
            <ul class="navDropDowns nddIsClosed ndd-border ndd-shadow">
              <li><router-link to="/" aria-label="Home">Home</router-link></li>
              <li><router-link to="/About" aria-label="About">About</router-link></li>
              <li><router-link to="/Contact" aria-label="Contact">Contact</router-link></li>
            </ul>
          </li>
          <!-- <li v-show="isLoggedIn"><router-link to="/Blogs" aria-label="Blogs">Blogs</router-link></li> -->
          <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
          <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
          <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
          <li>
            <a class="" role="button" aria-label="Placeholder">Placeholder<i class="down"></i></a>
            <ul class="navDropDowns nddIsClosed ndd-border ndd-shadow">
              <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
              <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
              <li><router-link to="#" aria-label="Placeholder">Placeholder</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { store } from "@/store/index";

let stateStore = reactive({ store });
let isLoggedIn = ref(false);
let mainNav: HTMLElement;
let mq: MediaQueryList;
let navLinksWrap: HTMLElement;
let loginBtn: HTMLElement;
let login: HTMLElement;
let navLinks: HTMLElement;
let scrollLastStopped: number = 0;
let scrollCurrentStopped: number = 0;
const registerAccount = process.env.VUE_APP_REGISTER_ACCOUNT;
const ustore = useStore();

const redirect = () => {
  window.location.assign(process.env.VUE_APP_IDMANAGEMENT_BASE_URL + "/Account/Login");
};

/**
 * Hide/Show nav bar
 */
const scrollStopped = (evt: Event): void => {
  const nav = document!.getElementById("animateNavWithThisDiv")!;
  let sy = window.scrollY;
  let timer: number = -1;
  //if login open, close it
  if (login.classList.contains("loginIsOpen")) {
    openLogin(evt);
  }
  //if nav bar open, close it
  if (navLinks.classList.contains("mainNavIsOpen")) {
    openCloseNav(evt);
  }
  //Hide up animation
  if (sy > 80) {
    nav.className = "navUpAni";
  }
  //Bring down animation
  if (sy < scrollLastStopped) {
    nav.className = "navDownAni";
  }
  //resets timer while scrolling
  if (timer != -1) {
    clearTimeout(timer);
  }
  //when scrolling stops, start timer....if no scroll event after 300ms get y scroll position to see if user next scroll up or down
  timer = window.setTimeout(() => {
    scrollCurrentStopped = window.scrollY;
    scrollLastStopped = showHideNav(scrollCurrentStopped);
  }, 300);
};

const showHideNav = (scrollCurrentStopped: number): number => {
  return scrollCurrentStopped;
};

/**
 *Move login links to and from main navigation list
 *Move logo div for cleaner layout
 *@ 40em appro: 640 px font size 16
 */
const resizeListener = (evt: Event): void => {
  let newParent;
  let loginBtn;

  let logoImg = document.getElementById("logo")!;

  //if less than 40em (640px)
  if (!mq.matches && login.hasAttribute("data-mobile")) {
    loginBtn = document.getElementById("loginBtn")!;
    login.removeAttribute("data-mobile");
    newParent = navLinks;

    //move logo
    let loginLinks = document.getElementById("loginLinks")!;
    loginLinks.appendChild(logoImg);

    //remove links wrapper div for cleaner layout
    navLinksWrap.style.display = "none";
    newParent.appendChild(loginBtn);
  }

  //if larger than 40em
  if (mq.matches && !login.hasAttribute("data-mobile")) {
    loginBtn = document.getElementById("loginBtn")!;
    login.setAttribute("data-mobile", "false");

    newParent = document.getElementById("loginLinks")!;

    //move logo
    const wrapTitle = document.getElementById("wrapTitle")!;
    wrapTitle.appendChild(logoImg);

    newParent.appendChild(loginBtn);
  }
  evt.stopPropagation();
};

const openCloseNav = (evt: Event): void => {
  if (navLinks.classList.contains("mainNavIsOpen")) {
    closeOpenNDD();  
    navLinks.className = "mainNavIsClosed";
  } else {
    navLinksWrap.style.display = "flex";
    navLinks.className = "mainNavIsOpen";
  }

  if(navLinks.classList.contains("mainNavIsOpen")){
    navLinksWrap.addEventListener("animationend", openCloseNavEventListener, true);
  }
  evt.stopPropagation();
};
const openCloseNavEventListener = () => {
  if (navLinks.classList.contains("mainNavIsClosed")) {
    navLinksWrap.style.display = "none";
    navLinksWrap.removeEventListener('animationend', openCloseNavEventListener, true);
  }
}

const openLogin = (evt: Event): void => {

  if (navLinks.classList.contains("mainNavIsOpen") && login.hasAttribute("data-mobile")) {
    //openCloseNav(evt);
  }

  if (login.classList.contains("loginIsClosed")) {
    login.style.display = "block";
    //start css animation
    login.className = "loginIsOpen";
  } else {
    //start css animation
    login.className = "loginIsClosed";
  }

  // login.addEventListener("animationend", (evt) => {
  //     if (login.classList.contains("loginIsClosed")) {
  //       login.style.display = "none";
  //     } 
  //   },
  //   true
  // );

  evt.stopPropagation();
};


const closeOpenNDD = (ndd?: HTMLElement): void => {

    //if previously open ndd not event target, close it without triggering css animation
    const allNavDropDowns = document.querySelectorAll(".navDropDowns");
    allNavDropDowns.forEach(element => {
      if(ndd != null){
        if(element != ndd && element.classList.contains("nddIsOpen")){
          element.classList.remove("nddIsOpen");
          element.classList.add("nddIsClosed");
          (element as HTMLElement).style.display = "none";
        }
      } else{
        element.classList.remove("nddIsOpen");
        element.classList.add("nddIsClosed");
        (element as HTMLElement).style.display = "none";
      }
    });
}

const nddOpenClose = (evt: Event): void => {
  
  //if login links open, close
  if (login.classList.contains("loginIsOpen")) {
    openLogin(evt);
  }

  let ulDropDown: Element;
  if(evt.target instanceof HTMLAnchorElement && evt.target.getAttribute("role") === "button") { 
    ulDropDown = (evt.target as HTMLElement).nextElementSibling!;

    closeOpenNDD(ulDropDown as HTMLElement);

    if(ulDropDown.classList.contains("nddIsOpen")) {
      ulDropDown.classList.remove("nddIsOpen");
      ulDropDown.classList.add("nddIsClosed");
    }else {
      ulDropDown.classList.remove("nddIsClosed");
      ulDropDown.classList.add("nddIsOpen");
      (ulDropDown as HTMLElement).style.display = "block";
    }
  } else {
    //evt.target is an <a> tag within the dropdown
    ulDropDown = (evt.target as HTMLElement).parentElement!.parentElement!
    ulDropDown.classList.remove("nddIsOpen");
    ulDropDown.classList.add("nddIsClosed");
  }

  if (ulDropDown.classList.contains("nddIsOpen")) { 
    ulDropDown.addEventListener("animationend", nddOpenCloseEventListener, true);
  }

  evt.stopPropagation();
};
const nddOpenCloseEventListener = (evt: Event) => {
  if ((evt.target! as HTMLElement).classList.contains('nddIsClosed')) {
    openCloseNav(evt);
    (evt.target! as HTMLElement).removeEventListener("animationend", nddOpenCloseEventListener, true);
  }
}

watch(() => store.getters.getLoggedIn,() => {
    isLoggedIn.value = store.getters.getLoggedIn;
  }
);

onMounted(() => {
  mainNav = document.getElementById("openCloseNavBtn")!;
  mq = window.matchMedia("(min-width: 40em)")!;
  navLinksWrap = document.getElementById("navLinksWrap")!;
  loginBtn = document.getElementById("loginBtn")!;
  login = document.getElementById("login")!;
  navLinks = document.getElementById("navLinks")!;

  window.addEventListener("scroll", scrollStopped, true);
  window.addEventListener("load", resizeListener, true);
  window.addEventListener("resize", resizeListener, true);
  mainNav.addEventListener("click", openCloseNav, true);
  //navLinksWrap.addEventListener("click", openCloseNav, false);
  navLinks.addEventListener("click", nddOpenClose, false);
  loginBtn.addEventListener("click", openLogin, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollStopped);
  window.removeEventListener("load", resizeListener);
  window.removeEventListener("resize", resizeListener);
  mainNav.removeEventListener("click", openCloseNav);
  //navLinksWrap.removeEventListener("click", openCloseNav);
  navLinks.removeEventListener("click", nddOpenClose);
  loginBtn.removeEventListener("click", openLogin);
});
</script>

<style scoped>
/*-------------------- Nav -----------------------------*/
#logo,
#logoFlip {
  position: relative;
  display: inline-flex;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  z-index: inherit;
}
#logo {
  background-image: url("/images/theThinkerIcon.png");
}
#logoFlip {
  background-image: url("/images/theThinkerIcon2.png");
  left: 0.5rem;
}
#wrapTitle {
  position: relative;
  z-index: inherit;
  display: inline-flex;
  margin-top: 0.1875rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}
#navContainer {
  position: relative;
  z-index: inherit;
  width: 96%;
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: var(--ndd-bg-colour);
  border-color: var(--ndd-bg-colour);
  border-radius: 0.1875rem;
  border-style: inset;
  border-width: 0.1rem;
  box-shadow: var(--boxshadow);
}
#wrapTitleH1 {
  position: relative;
  z-index: inherit;
  /*margin: 0rem; /*remove user agent styles*/
  margin-left: 0.3125rem;
  display: inline-flex;
  padding-bottom: 1%;
}
#mainH1Anchor {
  width: inherit;
  height: inherit;
  margin-left: auto;
  margin-right: auto;
}
.mainNavAnimation {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-decoration: none;
  animation: mainNavAnimation 5s infinite alternate;
  -webkit-animation: mainNavAnimation 5s infinite alternate;
  -moz-animation: mainNavAnimation 5s infinite alternate;
  -o-animation: mainNavAnimation 5s infinite alternate;
}
@keyframes mainNavAnimation {
  from {
    -webkit-box-shadow: 0.0625rem 0.0625rem 0.625rem 0.1875rem rgb(105, 105, 134) inset;
    -moz-box-shadow: 0.0625rem 0.0625rem 0.625rem 0.1875rem rgb(105, 105, 134) inset;
    box-shadow: 0.0625rem 0.0625rem 0.625rem 0.1875rem rgb(105, 105, 134) inset;
  }

  to {
    -webkit-box-shadow: 0rem 0rem 0rem -0.025rem rgb(105, 105, 134) inset;
    -moz-box-shadow: 0rem 0rem 0rem -0.025rem rgb(105, 105, 134) inset;
    box-shadow: 0rem 0rem 0rem -0.025rem rgb(105, 105, 134) inset;
  }
}

/*------------- NAV -------------*/
#mainNav {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 400;
  top: 0;
  width: 100vw;
}
#animateNavWithThisDiv {
  position: fixed;
  top: 0;
  z-index: 500;
}
#navContainer {
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: baseline;
}
.navUpAni {
  animation: forwards;
  animation-name: navUp;
  animation-duration: 800ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}
.navDownAni {
  animation: forwards;
  animation-name: navDown, mainNavAnimation;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}
@keyframes navUp {
  0% {
    top: 0;
  }
  100% {
    top: -10rem;
  }
}
@keyframes navDown {
  0% {
    top: -10rem;
  }
  100% {
    top: 0rem;
  }
}
#navLinksWrap {
  position: relative;
  margin: auto;
  z-index: 501;
  display: none;
}
#navLinksWrap > #navLinks > li {
  margin-top: 0.1875rem;
}
#openCloseNavBtn {
  position: relative;
  margin-top: 0.25rem;
  margin-bottom: auto;
  margin-left: 1rem;
  margin-right: auto;
  display: flex;
  align-items: center;
  width: 2rem;
}
#navBtn {
  position: relative;
  border-radius: 0.1875rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0; /*remove user agent*/
  background-color: transparent;
  display: inline-flex;
  z-index: inherit;
  box-shadow: var(--boxshadow);
}
#openCloseNavImg {
  width: 1.75rem;
  height: 1.75rem;
  background-image: url("/images/menu.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
}

/*----- start nav and drop down animations -------*/
.mainNavIsClosed {
  margin: auto;
  animation-name: mainNavClose;
  -webkit-animation-name: mainNavClose;
  -moz-animation-name: mainNavClose;
  -o-animation-name: mainNavClose;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 400ms;
  -webkit-animation-duration: 400ms;
  -moz-animation-duration: 400ms;
  -o-animation-duration: 400ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
}
.mainNavIsOpen {
  animation-name: mainNavOpen;
  -webkit-animation-name: mainNavOpen;
  -moz-animation-name: mainNavOpen;
  -o-animation-name: mainNavOpen;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 500ms;
  -webkit-animation-duration: 500ms;
  -moz-animation-duration: 500ms;
  -o-animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
}
.loginIsClosed {
  animation-name: loginClose;
  -webkit-animation-name: loginClose;
  -moz-animation-name: loginClose;
  -o-animation-name: loginClose;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 400ms;
  -webkit-animation-duration: 400ms;
  -moz-animation-duration: 400ms;
  -o-animation-duration: 400ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
}
.loginIsOpen {
  animation-name: loginOpen;
  -webkit-animation-name: loginOpen;
  -moz-animation-name: loginOpen;
  -o-animation-name: loginOpen;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 500ms;
  -webkit-animation-duration: 500ms;
  -moz-animation-duration: 500ms;
  -o-animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
}

/************************ START navDropDown & nddOpenClose animation ******************************/
.navDropDowns {
  position: absolute;
  max-width: 12rem;
  height: 0rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: var(--ndd-bg-colour);
  z-index: 505;
}
.navDropDowns > li {
  margin: 1em 0 1em 0;
}
.nddIsClosed {
  animation-name: nddClose;
  -webkit-animation-name: nddClose;
  -moz-animation-name: nddClose;
  -o-animation-name: nddClose;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 500ms;
  -webkit-animation-duration: 500ms;
  -moz-animation-duration: 500ms;
  -o-animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  -moz-transform-origin: center top;
  -o-transform-origin: center top;
  -ms-transform-origin: center top;
}
@keyframes nddClose {
  0% {
    width: 12rem;
    height: auto;
    margin-top: 1rem;
    left: calc(50% - 6rem);
    transform: scale(1);
    opacity: 1;
  }

  100% {
    width: 0%;
    height: 0;
    margin-top: -1rem;
    transform: scale(0);
    left: 50%;
    opacity: 0;
  }
}
.nddIsOpen {
  animation-name: nddOpen;
  -webkit-animation-name: nddOpen;
  -moz-animation-name: nddOpen;
  -o-animation-name: nddOpen;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-duration: 500ms;
  -webkit-animation-duration: 500ms;
  -moz-animation-duration: 500ms;
  -o-animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  -o-animation-timing-function: ease-in-out;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  -moz-transform-origin: center top;
  -o-transform-origin: center top;
  -ms-transform-origin: center top;
}
@keyframes nddOpen {
  0% {
    width: 0%;
    height: 0;
    margin-top: -1rem;
    transform: scale(0);
    left: 50%;
    opacity: 0;
  }

  100% {
    width: 12rem;
    height: auto;
    margin-top: 1rem;
    transform: scale(1);
    left: calc(50% - 6rem);
    opacity: 1;
  }
}

.ndd-shadow {
  box-shadow: var(--boxshadow);
}
.ndd-border {
  border-color: var(--ndd-bg-colour);
  border-style: inset;
  border-width: 0.1rem;
  border-radius: 0.1875rem;
}

/************************ END navDropDown & nddOpenClose animation ******************************/


@keyframes mainNavOpen {
  0% {
    width: 0%;
    height: 0vh;
    display: flex;
    opacity: 0;
  }

  100% {
    width: 96%;
    height: 80vh;
    margin-bottom: 3rem;
    display: flex;
    opacity: 1;
  }
}
@keyframes mainNavClose {
  0% {
    width: 96%;
    height: 80vh;
    visibility: visible;
    opacity: 1;
  }

  100% {
    width: 0%;
    height: 0vh;
    visibility: visible;
    opacity: 0;
    display: none;
  }
}
@keyframes loginOpen {
  0% {
    width: 0;
    margin-top: -2rem;
    opacity: 0;
  }

  100% {
    width: 100%;
    margin-top: 1rem;
    opacity: 1;
  }
}
@keyframes loginClose {
  0% {
    width: 100%;
    margin-top: 1rem;
    opacity: 1;
  }

  100% {
    width: 0%;
    margin-top: -2rem;
    opacity: 0;
  }
}


/*-----end nav and drop down animations  -------*/

#navLinks {
  position: relative;
  margin: auto;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-left: 0rem;
  padding-right: 0rem;
  display: block;
  background-color: var(--ndd-bg-colour);
  border-color: var(--ndd-bg-colour);
  border-style: inset;
  border-width: 0.1rem;
  border-radius: 0.1875rem;
  z-index: 400;
  box-shadow: var(--boxshadow);
}
#navLinks > li {
  width: 100%;
  min-height: 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}



/* --- start  hover styles <li> and <a>-------*/
#login > div > a:hover,
a:hover {
  color: var(--a-hover-colour);
  font-weight: normal;
}
#navBtn:hover,
#loginBtn:hover,
li:hover {
  background: -moz-linear-gradient(
    left,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  background: -webkit-linear-gradient(
    left,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  background: linear-gradient(
    to right,
    var(--navlink-gradient-hov-1) 0%,
    var(--navlink-gradient-hov-2) 50%,
    var(--navlink-gradient-hov-3) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=1 );
}
#navBtn:active,
#loginBtn:active,
li:active {
  background: -moz-linear-gradient(
    left,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    var(--navlink-gradient-active-1) 50%,
    var(--navlink-gradient-active-2) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#99000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */
}
/* --- end  hover styles on <li> and <a>-------*/

/*---------login links--------------*/
#loginLinks {
  /*at less than 40em (640px) this element only holds logo image*/
  position: relative;
  display: flex;
  margin: 0;
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  margin-right: auto;
  z-index: 501;
}
#loginBtn {
  position: relative;
  z-index: 501;
  height: 2em;
}
#loginBtn > div {
  position: relative;
  z-index: 501;
}
#loginBtn > div > a {
  position: relative;
  display: inherit;
  transform: translateX(50%);
  margin-left: -3rem; /*if content text changes this with need to as well*/
  margin-right: auto;
  margin-top: 0rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  z-index: 501;
}
#login {
  max-width: 12rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 0;
  padding-left: 0;
  margin: auto;
  background-color: var(--ndd-bg-colour);
  border-color: var(--ndd-bg-colour);
  border-style: inset;
  border-width: 0.1rem;
  box-shadow: var(--boxshadow);
  display: none;
}
#login > li {
  /* allows me to use margin auto in child element see #login > li > a*/
  display: flex;
  align-content: center;
  margin: 1em auto 1rem auto;
}
#login > li > a {
  margin: auto;
}
/*---- Start dropdown arrow css-----*/
i {
  border: solid black;
  border-width: 0 0.0325rem 0.0325rem 0;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  display: inline-block;
  padding: 0.25rem;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
/*---- End dropdown arrow css-----*/

/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  /*---- Title and Header css ---------*/
  #wrapTitleH1 {
    font-size: 1.625rem;
  }

  #logoFlip {
    display: none;
  }

  #logo {
    width: 1.625rem;
    height: 1.625rem;
    display: inline-flex;
  }

  /*---- At this screen width, #loginLinks contains logo.jpg and NOT login links. --*/
  #loginLinks {
    margin-top: 0.3125rem;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  li {
    text-decoration: none;
  }

  #logo,
  #logoFlip {
    display: block;
    width: 1.75rem;
    height: 1.75rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  #openCloseNavBtn {
    margin-left: 1rem;
    margin-right: 0rem;
    width: 8rem;
  }

  #loginLinks {
    position: relative;
    z-index: 501;
    margin-left: 0;
    margin-right: 1rem;
    width: 9rem;
    line-height: 1.75rem;
  }

  #loginBtn {
    margin-top: 0.125rem;
    margin-bottom: auto;
    width: 9rem;
  }

  #loginBtn > div > a {
    position: relative;
    width: 7rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
    transform: none;
    text-align: center;
  }

  div #login {
    width: 9rem;
  }

  #login {
    max-width: 9rem;
    padding: 0em;
    /*display: none;*/
  }

  #login > li {
    display: flex;
    align-content: center;
  }

  #login > li > a {
    position: relative;
    width: 7rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }

  #navLinks {
    padding: 0rem;
    display: inline-flex;
    width: 96%;
    align-content: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-style: inset;
    border-width: 0.15rem;
    border-radius: 0.1875rem;
  }

  #navLinks > li {
    display: inline-flex;
    align-content: center;
    width: 100%;
    min-height: 1.5rem;
    margin-bottom: 0rem;
    margin-top: 0rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  #navLinks li a {
    position: relative;
    align-self: center;
    margin: auto;
  }

  @keyframes mainNavOpen {
    0% {
      width: 0%;
      height: 0%;
      opacity: 0;
    }

    100% {
      width: 96%;
      height: 100%;
      opacity: 1;
      margin-bottom: 1rem;
      margin-left: auto;
      margin-right: auto;
      margin-top: 0rem;
    }
  }

  @keyframes mainNavClose {
    0% {
      width: 96%;
      height: 100%;
      visibility: visible;
      opacity: 1;
    }

    100% {
      width: 0%;
      height: 0%;
      visibility: visible;
      opacity: 0;
      display: none;
    }
  }

  @keyframes loginOpen {
    0% {
      width: 0;

      font-size: 0;
      opacity: 0;
    }

    100% {
      width: 9em;

      font-size: 100%;
      opacity: 1;
    }
  }

  @keyframes loginClose {
    0% {
      width: 9em;

      font-size: 100%;
      opacity: 1;
    }

    100% {
      width: 0em;
      font-size: 0%;
      opacity: 0;
    }
  }

  /************************ START navDropDown & nddOpenClose animation ******************************/
  @keyframes nddOpen {
    0% {
      position: relative;
    }

    1% {
      position: absolute;
      width: 0%;
      height: 0rem;
      margin-top: 0rem;
      margin-left: 0%;
      margin-right: 0%;
      margin-bottom: 0;
      transform: scale(0);
      opacity: 0;
    }

    100% {
      position: absolute;
      width: 100%;
      height: auto;
      margin-top: 3rem;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0;
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes nddClose {
    0% {
      position: absolute;
      width: 100%;
      height: auto;
      margin-top: 3rem;
      transform: scale(1);
      opacity: 1;
    }

    99%{
      position: absolute;
    }

    100% {
      position: relative;
      width: 0%;
      height: 0rem;
      margin-top: 0rem;
      transform: scale(0);
      opacity: 0;
    }
  }
  /************************ END navDropDown & nddOpenClose animation ******************************/
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  #wrapTitleH1 {
    font-size: 2rem;
  }
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
  /*---- Title and Header css ---------*/
  #mainNav {
    max-width: 83rem;
  }
}
</style>
