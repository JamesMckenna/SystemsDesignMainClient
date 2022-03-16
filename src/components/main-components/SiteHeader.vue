<template>
  <header id="site-header" class="site-header">
    <img class="left-header-img theme-shadow theme-border" />
    <div class="header-center" title="Systems Design animated logo"></div>
    <img class="right-header-img theme-shadow theme-border" />
  </header>
</template>

<script></script>

<style>
.site-header {
  position: relative;
  top: 9rem;
  margin: auto auto 12rem auto;
  display: grid;
  grid-template-columns: auto auto auto;
}

.header-center {
  display: block;
  min-width: 16rem;
  min-height: 9rem;
  margin: auto;
  background-image: url("../../assets/images/sdr-title-ani.gif");
  background-repeat: no-repeat;

  background-size: contain;
}

.left-header-img,
.right-header-img {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/DamagedCode.jpg");
}
.right-header-img {
  transform: rotateY(180deg);
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {

}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {

}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {

  .header-center
  .right-header-img
  .left-header-img {
    display: inline-flex;
  }
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
