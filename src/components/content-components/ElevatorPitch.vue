<template>
  <h4>A Bit About Me - the elevator pitch</h4>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      I studied Information Systems Technology with a major in Information
      Systems - so I design and build enterprise software. Professionally, I am
      interested in backend design & development with a focus in software
      security (auth & auth). I have a fascination with 3D animation and virtual
      reality/mixed reality, and in my spare time, I experiment with
      implementing 3D models/assets in a web browser. With VR/XR slowly gaining
      widespread use, I want to become an expert on VR/XR apps running in a web
      browser and will use this domain as a experimenting ground.
    </p>
  </div>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      The first language I learnt was JavaScript (ECMAScript 5). I went on to
      learn PHP 5, the CodeIgniter Framework, Wordpress and started with
      server-side programming. MySQL was my first foray into database scripting
      and I went on to use both Microsoft's T-SQL and Oracle's 10, PL-SQL. As I
      gained more experience, I started to focus on ASP.NET and built apps with
      .NET 4.x and ASP.NET Webforms.
    </p>
  </div>
  <hr class="hr-tag-2" />
  <img src="@/assets/images/VSSS.png" class="images" />
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      I took a look at Node.Js and played with a very early version of
      <a
        href="https://www.feathersjs.com"
        target="blank"
        class="a-tag-style-two"
        >Feather.js</a
      >
      by building a small real-time chat app (the quick start) which gave me an
      introduction into NOSQL databases. I won't say it was a career changing
      project, in fact it was a throw away project, but I did learn from it.
    </p>
  </div>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      Along the way, I took a side road and built a couple of small Android
      apps; I learnt much more than I thought I would about building for a
      platform. As it turns out, programming for Android taught me about
      background processes, threading and not to put computational algorithms,
      or long running processes on the UI thread - this knowledge would later
      come in handy when building Electron apps. I started to see how many of
      the programming best practices weren't about the language I was coding in,
      but about how to design and structure the code, how to think about the
      app's behavior and the importance of structuring data.
    </p>
  </div>
  <hr class="hr-tag-2" />
  <img src="@/assets/images/VueSS.png" class="images" />
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      When .NET Core came out I started learning the new framework. I did this
      by implementing an OpenID Connect compliant middleware (<a
        href="http://docs.identityserver.io/en/latest/"
        target="blank"
        class="a-tag-style-two"
        >Identity Server 4</a
      >). As .NET Core 2.x and 3.x came out I rebuilt the secure token server
      and gain a better understanding of the OpenID Connect and OAuth 2.0
      protocols. The subject of OpenID Connect and OAuth is very difficult, I
      understand more and more everytime I work with the protocols. As a
      developer, my personal choice for frameworks is Vue.js 3 for client
      applications and .NET Core WebApi for RESTful services. For data
      persistance I gravitate towards MS SQL Server and PostGres, and I see
      Event Logging and Error Logging as a legit use-case for NOSQL databases;
      yes believe it or not, I do.
    </p>
  </div>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <p>
      I have been part of a development team(s) that has designed, built and
      shipped Electron apps, Vue.js client apps and .NET WebAPI to production.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import {
  showBackgroundObserverOptions,
  buildShowBackgroundObserverOptions,
  showBackgroundIntersectionObserver,
} from "@/assets/js/helper-functions";

let pTagBackgroundObserver: IntersectionObserver;

onMounted(() => {
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const options: showBackgroundObserverOptions =
    buildShowBackgroundObserverOptions(windowWidth, windowHeight);
  pTagBackgroundObserver = showBackgroundIntersectionObserver(
    "highlight-p-tag",
    "highlight-p-tag__observer",
    options
  );
});
onUnmounted(() => {
  pTagBackgroundObserver.disconnect();
});
</script>

<style scoped>
.a-tag-style-two {
  font-weight: bold;
}
.a-tag-style-two:hover {
  color: var(--bgcolor1);
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .text-indent {
    text-align: center;
  }
  h4 {
    padding: 1rem 1rem;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
  .text-indent {
    text-align: left;
    text-indent: 5rem;
  }
  h4 {
    padding: 0 0;
  }
}
</style>
