<template>
  <nav id="nav" class="main-nav">
    <div class="nav--glow--ani" >
      <hr class="hr-tag"/>
      <div class="nav-container theme-border theme-shadow">

        <div class="auto-margin wrap-nav-btn">
          <button id="navBtn" class="nav-btn theme-border theme-shadow" title="Open / Close Nav" aria-label="Open / Close Nav" type="button">
            <svg class="nav-btn_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 150">
              <g>
                <path d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
                <path d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
                <path d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
              </g>
            </svg>
          </button>
        </div>

        <div id="wrapTitle" class="wrap-title">
          <img class="logo-flip" src="@/assets/images/theThinkerIconFlip.png" aria-label="[Image of The Thinker Statue]"/>
          <h1 class="wrap-title_h1">
            <router-link class="title-h1-anchor" title="Website Title and Link to Homepage" to="/">Systems Design</router-link>
          </h1>
          <img id="logo" class="logo" src="@/assets/images/theThinkerIcon.png" aria-label="[Image of The Thinker Statue]"/>
        </div>

        <div id="loginLinks" class="wrap-login-links auto-margin">
          <div id="loginBtn" class="login-btn" title="Open / Close Login and Account Links">
            <a role="button" class="login-btn_a" v-if="isLoggedIn" aria-label="Open / Close Logout and Account Links">Hi<i class="down-arrow"></i></a>
            <a role="button" class="login-btn_a" v-else aria-label="Login and Account Links">Log In<i class="down-arrow"></i></a>
            <ul id="login" data-mobile class="nav-drop-downs ndd--is--closed theme-border theme-shadow" style="display: none;">
              <li v-if="isLoggedIn" data-move class="nav-drop-downs_li"><a class="nav-drop-downs_li_a" @click="redirect" aria-label="Account"><u>Account</u></a></li>
              <li v-else data-move class="nav-drop-downs_li"><a class="nav-drop-downs_li_a" :href="registerAccount" aria-label="Sign Up"><u>Sign Up</u></a></li>
              <li v-if="isLoggedIn" data-move class="nav-drop-downs_li"><a class="nav-drop-downs_li_a" @click="store.dispatch('logout', null, { root: true })" aria-label="Log Out"><u>Log Out</u></a></li>
              <li v-else data-move class="nav-drop-downs_li"><a class="nav-drop-downs_li_a" @click="store.dispatch('setLoggedInState', null, { root: true })" aria-label="Log In"><u>Log In</u></a></li>
            </ul>
          </div>
        </div>

      </div>

      <hr class="hr-tag" />

      <div id="navLinksWrap" class="wrap-nav-links">
        <ul id="navLinks" class="nav-links nav-links--is--closed theme-border theme-shadow" title="main navigation links">
          <li class="auto-margin nav-links_li">
            <a role="button" class="nav-links_li_a">Home<i class="down-arrow"></i></a>
            <ul class="nav-drop-downs ndd--is--closed theme-border theme-shadow" style="display: none;">
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="/" aria-label="Home">Home</router-link></li>
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="/About" aria-label="About">About</router-link></li>
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="/Contact" aria-label="Contact">Contact</router-link></li>
            </ul>
          </li>
          <li class="auto-margin nav-links_li"><router-link class="nav-links_li_a" to="" aria-label="Placeholder">Placeholder</router-link></li>
          <li class="auto-margin nav-links_li"><router-link class="nav-links_li_a" to="" aria-label="Placeholder">Placeholder</router-link></li>
          <li class="auto-margin nav-links_li"><router-link class="nav-links_li_a" to="" aria-label="Placeholder">Placeholder</router-link></li>
          <li class="auto-margin nav-links_li">
            <a class="nav-links_li_a" role="button" aria-label="Placeholder">Placeholder<i class="down-arrow"></i></a>
            <ul class="nav-drop-downs auto-margin ndd--is--closed theme-border theme-shadow" style="display: none;">
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="#" aria-label="Placeholder">Placeholder</router-link></li>
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="#" aria-label="Placeholder">Placeholder</router-link></li>
              <li class="nav-drop-downs_li"><router-link class="nav-drop-downs_li_a" to="#" aria-label="Placeholder">Placeholder</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { store } from '@/store/index'

const isLoggedIn = ref(false)
let navBtn: HTMLElement
let navLinksWrap: HTMLElement
let loginBtn: HTMLElement
let login: HTMLElement
let navLinks: HTMLElement
let scrollLastStopped: number = window.scrollY
const registerAccount = process.env.VUE_APP_REGISTER_ACCOUNT

const redirect = () => {
  window.location.assign(process.env.VUE_APP_IDMANAGEMENT_BASE_URL + '/Account/Login')
}

const showHideNav = (evt: Event): void => {
  setTimeout(() => { if (navLinks.classList.contains('nav-links--is--open')) openCloseNav(evt) }, 150)
  if (document.querySelector('.ndd--is--open')) closeOpenNDDs()

  window.onscroll = function () {
    if (scrollLastStopped < window.scrollY) {
      document!.getElementById('nav')!.classList.remove('nav--down--ani')
      document!.getElementById('nav')!.classList.add('nav--up--ani')
    } else {
      document!.getElementById('nav')!.classList.remove('nav--up--ani')
      document!.getElementById('nav')!.classList.add('nav--down--ani')
    }
    scrollLastStopped = window.scrollY
  }
}

const resizeListener = (evt: Event): void => {
  const logoImg = document.getElementById('logo')!

  // if less than 40em (640px)
  if (!window.matchMedia('(min-width: 40em)')!.matches && login.hasAttribute('data-mobile')) {
    login.removeAttribute('data-mobile')
    document.getElementById('loginLinks')!.appendChild(logoImg)
    navLinksWrap.style.display = 'none'
    navLinks.prepend(loginBtn)
  }

  // if larger than 40em
  if (window.matchMedia('(min-width: 40em)')!.matches && !login.hasAttribute('data-mobile')) {
    login.setAttribute('data-mobile', 'false')
    document.getElementById('wrapTitle')!.appendChild(logoImg)
    document.getElementById('loginLinks')!.appendChild(loginBtn)
  }

  evt.stopPropagation()
}

const openCloseNav = (evt?: Event): void => {
  if (document.querySelector('.ndd--is--open')) { closeOpenNDDs() }

  if (navLinks.classList.contains('nav-links--is--open')) {
    navLinks.classList.remove('nav-links--is--open')
    navLinks.classList.add('nav-links--is--closed')
  } else {
    navLinksWrap.style.display = 'flex'
    navLinks.classList.remove('nav-links--is--closed')
    navLinks.classList.add('nav-links--is--open')
  }

  if (navLinks.classList.contains('nav-links--is--open')) { navLinksWrap.addEventListener('animationend', openCloseNavEventListener, true) }

  if (evt != null) evt.stopPropagation()
}
const openCloseNavEventListener = (evt: Event) => {
  if ((evt as AnimationEvent).animationName === 'close--nav--links') {
    navLinksWrap.style.display = 'none'
    navLinksWrap.removeEventListener('animationend', openCloseNavEventListener, true)
  }
}

const closeOpenNDDs = (clickedElement?: HTMLElement): void => {
  document.querySelectorAll('.nav-drop-downs').forEach(element => {
    if (clickedElement != null) {
      if (element !== clickedElement && element.classList.contains('ndd--is--open')) {
        element.classList.remove('ndd--is--open')
        element.classList.add('ndd--is--closed')
      }
    } else {
      element.classList.remove('ndd--is--open')
      element.classList.add('ndd--is--closed')
    }
  })
}

const nddOpenClose = (evt: Event): void => {
  let ulDropDown: Element

  // <a><i class="down-arrow"></i></a> the <i> is the event target
  if ((evt.target as HTMLElement).className === 'down-arrow') {
    ulDropDown = (evt.target as HTMLElement).parentElement!.nextElementSibling!

    // <a role="button"> is the event target EXCLUDING: loginBtn
  } else if (evt.target instanceof HTMLAnchorElement &&
          evt.target.getAttribute('role') === 'button' &&
          evt.target.parentElement?.getAttribute('id') !== 'loginBtn') {
    ulDropDown = (evt.target as HTMLElement).nextElementSibling!

    // event target was an <a> tag, child of <li> inside a <ul class="nav-drop-downs">
  } else if ((evt.target as HTMLElement).parentElement!.parentElement! instanceof HTMLUListElement &&
          (evt.target as HTMLElement).parentElement!.parentElement!.classList.contains('nav-drop-downs')) {
    ulDropDown = (evt.target as HTMLElement).parentElement!.parentElement!

    // event target was login button
  } else if ((evt.target as HTMLElement).getAttribute('id') === 'loginBtn' ||
          (evt.target as HTMLElement).parentElement!.getAttribute('id') === 'loginBtn' ||
          (evt.target as HTMLElement).parentElement!.parentElement!.getAttribute('id') === 'loginBtn') {
    if (navLinks.classList.contains('nav-links--is--open') &&
            document.getElementById('login')?.hasAttribute('data-mobile')) {
      openCloseNav(evt)
    }
    ulDropDown = document.getElementById('login') as HTMLElement

    // event target was an <li> within <ul id="navLinks"><li>A CHILD ELEMENT OR ELEMENTS<li></ul>
  } else if ((evt.target as HTMLElement).lastElementChild?.classList.contains('nav-drop-downs')) {
    ulDropDown = (evt.target as HTMLElement).lastElementChild!

    // handle all other click events
  } else {
    setTimeout(() => { if (navLinks.classList.contains('nav-links--is--open')) openCloseNav(evt) }, 550)
    if (document.querySelector('.ndd--is--open')) closeOpenNDDs()
    return
  }

  if (document.querySelector('.ndd--is--open')) {
    closeOpenNDDs(ulDropDown as HTMLElement)
  }

  if (ulDropDown.classList.contains('ndd--is--open') && !ulDropDown.hasAttribute('data-mobile')) {
    ulDropDown.addEventListener('animationend', nddOpenCloseEventListener, true)
  }

  if (ulDropDown.classList.contains('ndd--is--open')) {
    ulDropDown.classList.remove('ndd--is--open')
    ulDropDown.classList.add('ndd--is--closed')
  } else {
    ulDropDown.classList.remove('ndd--is--closed')
    ulDropDown.classList.add('ndd--is--open');
    (ulDropDown as HTMLElement).style.display = 'block'
  }

  evt.stopPropagation()
}
const nddOpenCloseEventListener = (evt: Event) => {
  if ((evt as AnimationEvent).animationName === 'close--ndd') {
    openCloseNav(evt);
    (evt.target! as HTMLElement).removeEventListener('animationend', nddOpenCloseEventListener, true)
  }
}

watch(
  () => store.getters.getLoggedIn,
  () => { isLoggedIn.value = store.getters.getLoggedIn }
)

onMounted(() => {
  navBtn = document.getElementById('navBtn')!
  navLinksWrap = document.getElementById('navLinksWrap')!
  loginBtn = document.getElementById('loginBtn')!
  login = document.getElementById('login')!
  navLinks = document.getElementById('navLinks')!

  window.addEventListener('scroll', showHideNav, true)
  window.addEventListener('load', resizeListener, true)
  window.addEventListener('resize', resizeListener, true)
  navBtn.addEventListener('click', openCloseNav, true)
  navLinks.addEventListener('click', nddOpenClose, false)
  loginBtn.addEventListener('click', nddOpenClose, false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', showHideNav, true)
  window.removeEventListener('load', resizeListener, true)
  window.removeEventListener('resize', resizeListener, true)
  navBtn.removeEventListener('click', openCloseNav, true)
  navLinks.removeEventListener('click', nddOpenClose, false)
  loginBtn.removeEventListener('click', nddOpenClose, false)
})
</script>

<style></style>
