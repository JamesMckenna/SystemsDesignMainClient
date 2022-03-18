<template>
    <div class="home">
        <h2>{{ $props.msg }}</h2>
        <p>I have spent time researching, designing and coding a ‘base’ for enterprise software, and now the hard part comes: writing, (and I use the term loosely) engaging, content for visitors to this site. As I haven't taken the necessary steps for search engine optimization, I am under the impression that visitors to this site have come here via LinkedIn or have followed a link on my resume.</p>

        <h4>A Bit About Me - the elevator pitch</h4>
        <p>I studied Information Systems Technology with a major in Information Systems - so I design and build enterprise software. I have a fascination with 3D animation and virtual reality/mixed reality, and in my spare time, I experiment with implementing 3D models/assets in a web browser. With VR/XR slowly gaining widespread use, I want to become an expert on VR/XR apps running in a web browser and will use this domain as a experimenting ground.</p>

        <p>The first language I learnt was JavaScript (ECMAscript 5). I went on to learn PHP 5, CodeIgniter, Wordpress and started with server-side programming. MySQL was my first foray into database scripting and I went on to learn both Microsoft T-SQL and Oracle 10, PL-SQL. As I gained more experience, I started to focus on ASP.NET and gained experience with .NET 4.7 and Webforms.</p>

        <img src="@/assets/images/VSSS.png" class="images"/>
        <p>I took a look at Node.Js and played with a very early version of <a href="https://www.feathersjs.com" target="blank" style="font-weight:bold;">Feather.js</a> by building a small real-time chat app (the quick start) which gave me an introduction into NOSQL databases. I won't say it was a career changing project, in fact it was a throw away project, but I did learn from it.</p>

        <p>Along the way, I took a side road and built a couple of small Android apps; I learnt much more than I thought I would about building for a platform. As it turns out, programming for Android taught me about background processes, threading and not to put computational algorithms, or long running processes on the UI thread - this would come in handy later when building Electron apps. I started to see how many of the programming best practices weren't about the language I was coding in, but about how to design and structure the code, how to think about the app's behavior and how to structure data.</p>

        <img src="@/assets/images/VueSS.png" class="images"/>

        <p>When .NET Core came out I started learning the new framework. I did this by implementing an OpenID Connect compliant middleware (<a href="http://docs.identityserver.io/en/latest/" target="blank" style="font-weight:bold;">Identity Server 4</a>). As .NET Core 2.x and 3.x came out I rebuilt the secure token server and gain a better understanding of the OpenID Connect and OAuth 2.0 protocols. As a developer, my personal choice for frameworks are Vue.js 3 for client applications and .NET Core WebApi for RESTful services. For data persistance I gravitate towards MS SQL Server and PostGres, with Event Logging and Error Logging as a legit use-case for NOSQL databases.</p>

        <p>I have been part of a development team that has shipped a couple of Electron apps, Vue.js client apps and .NET WebAPI, RESTful APIs to production.</p>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({ msg: String })
</script>
