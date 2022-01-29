<template>
  <header id="site-header" class="theme-border theme-shadow">
    <div class="left-header-img theme-shadow"></div>
    <div class="header-center">
      <h2 class="h2-header">Systems Design.Rocks Staging Server</h2>
      <slot name="header-content"></slot>
    </div>
    <div class="right-header-img theme-shadow-right"></div>
  </header>
</template>

<script></script>

<style scoped>
  #site-header {
    box-sizing: border-box;
    height: 10rem;
    margin-top: 5.5rem;
    background-color: var(--bgcolor3);
  }

  .header-center {
    text-align: center;
  }

  .left-header-img,
  .right-header-img {
    position: relative;
    top:-3px;
    box-sizing: border-box;
    background-image: url("../../assets/images/DamagedCode.jpg") ;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #cccccc;
  }
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  #site-header{
    height: 26rem;
    margin-top: 5.5rem;
    margin-bottom: 3rem;
    display: block;
    background-color: var(--bgcolor3);
  }

  .h2-header {
    text-align: center;
    margin: 1rem auto 1rem auto;
    text-shadow: var(--shadow-text-offset);
  }

  .header-center,
  .right-header-img,
  .left-header-img {
    width: 100%;
    display: block;
    margin: auto auto;
  }

  .left-header-img,
  .right-header-img {
    position: relative;
    float: none;
    width: 100%;
    height: 10rem;
    margin: 0;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
    #site-header{
    height: 23.9rem;
  }
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  #site-header {
    display: grid;
    grid-template-columns: 12rem auto 12rem;
    height: 10rem;
    margin-top: 5.5rem;
    background-color: var(--bgcolor3);
  }

  .header-center
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
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {

}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
  #site-header {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 15rem auto 15rem;
    height: 10rem;
    margin-top: 5.5rem;
    background-color: var(--bgcolor3);
  }

  .h2-header {
    text-align: center;
    margin: auto 1rem;
  }

  .left-header-img,
  .right-header-img {
    max-width: 15rem;
  }

  .header-center
  .right-header-img
  .left-header-img {
    display: inline-flex;
  }
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {

}

</style>
