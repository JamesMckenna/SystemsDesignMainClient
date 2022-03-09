<template>
  <header id="site-header" class="site-header theme-border theme-shadow">
    <img class="left-header-img theme-shadow" />
    <div class="header-center theme-shadow theme-border">
      <h2 class="h2-header">Systems Design.Rocks Staging Server</h2>
      <slot name="header-content"></slot>
    </div>
    <img class="right-header-img  theme-shadow-right" />
  </header>
</template>

<script></script>

<style scoped>
.site-header {
  position: relative;
  top: 9rem;
  margin: auto auto 12rem auto;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: var(--bgcolor3);
}
  .header-center {
    display: block;
    min-width: 32rem;
    min-height: 18rem;
    margin: auto;
    background-color: blue;
  }

  /* .h2-header {
    display: inline;
  } */
  .left-header-img,
  .right-header-img {
    height: 100%;
    width: 100%;
    background-image: url("../../assets/images/DamagedCode.jpg") ;
  }
  .right-header-img {
    transform: rotateY(180deg);
  }
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  /* #site-header {
    height: 26rem;
    margin-top: 5.5rem;
    margin-bottom: 3rem;
    display: block;
    background-color: var(--bgcolor3);
  } */

  /* .h2-header {
    text-align: center;
    margin: 1rem auto 1rem auto;
    text-shadow: var(--shadow-text-offset);
  } */

  /* .header-center,
  .right-header-img,
  .left-header-img {
    width: 100%;
    display: block;
    margin: auto auto;
  } */

  /* .left-header-img,
  .right-header-img {
    position: relative;
    float: none;
    width: 100%;
    height: 10rem;
    margin: 0;
  } */
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
    /* #site-header{
    height: 23.9rem;
  }*/
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  /* #site-header {
    display: grid;
    grid-template-columns: 12rem auto 12rem;
    height: 10rem;
    margin-top: 5.5rem;
    background-color: var(--bgcolor3);
  } */

  /* .header-center
  .right-header-img
  .left-header-img {
    display: inline-flex;
  }

  .left-header-img {
    margin: 0%;
    float: left;
    left: -1%;
    max-width: 15rem;
    max-height: 10rem;
  }

  .right-header-img {
    margin: 0%;
    float: right;
    right: -1%;
    max-width: 15rem;
    max-height: 10rem;
  } */
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {

}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
  /* #site-header {
    display: grid;
    grid-template-columns: 15rem auto 15rem;
    height: 10rem;
    margin-top: 5.5rem;
    background-color: var(--bgcolor3);
  } */

  /* .h2-header {
    text-align: center;
    margin: auto 1rem;
  } */

  /* .left-header-img,
  .right-header-img {
    max-width: 15rem;
  } */

  /* .header-center
  .right-header-img
  .left-header-img {
    display: inline-flex;
  } */
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {

}

</style>
