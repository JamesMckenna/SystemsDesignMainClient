<template>
  <h4>A Porfolio Project (and a developer's playground)</h4>
  <hr class="hr-tag-2" />
  <section class="highlight-p-tag">
    <p>
      The current project is a
      <a
        href="https://github.com/JamesMckenna/SystemsDesignMainClient"
        target="blank"
        class="a-tag-style-two"
        >Vue.Js 3 client app</a
      >
      with
      <a
        href="https://github.com/JamesMckenna/SystemsDesign.rocks"
        target="blank"
        class="a-tag-style-two"
        >.NET Core 3.1</a
      >
      used for the OIDC compliant token server, the identity management and the
      backend apps/APIs.
    </p>
  </section>
  <hr class="hr-tag-2" />
  <section class="highlight-p-tag">
    <h4>TODO</h4>
    <h6>the (unordered) backlog, that never seems to end</h6>
    <ul class="text-indent">
      <li class="this-pages-li-class">
        - Lease two more virtual private servers
      </li>
      <li class="this-pages-li-class">
        - Set up CI/CD for all client and server-side apps
      </li>
      <li class="this-pages-li-class">
        - Containerize all client and server-side apps
      </li>
      <li class="this-pages-li-class">
        - Experiment with WebXR and WebGL 3D engine
      </li>
      <li class="this-pages-li-class">
        - Migrate backend, token server and identity management apps to LTS
        version
      </li>
      <li class="this-pages-li-class">
        - Implement an email contact endpoint for Contact page
      </li>
      <li class="this-pages-li-class">
        - Unifiy style across all the client apps
      </li>
      <li class="this-pages-li-class">
        - Add external identity providers (Microsoft Account and Google Account)
        for login
      </li>
      <li class="this-pages-li-class">
        - A Guest Book say "Hello, I was here"
      </li>
      <li class="this-pages-li-class">
        - Add Role Manager to the identity management app
      </li>
      <li class="this-pages-li-class">
        - Add UI to STS to dynamically add client apps and apis (Multi-Tenant
        STS)
      </li>
      <li class="this-pages-li-class">
        - Change STS to store config and operational data to database (postgres,
        redis)
      </li>
    </ul>
  </section>
  <hr class="hr-tag-2" />
  <img src="@/assets/images/html.jpg" class="images" />
  <hr class="hr-tag-2" />
  <section class="highlight-p-tag">
    <h4>The Frameworks and Libraries</h4>
    <ul class="center-text">
      <li class="this-pages-li-class">
        VueJs 3 for a browser client application, Vue/Cli v5.4, Vue Router v4,
        VueX v4
      </li>
      <li class="this-pages-li-class">
        Identity Server 4 for Token Signing and Token Management.
      </li>
      <li class="this-pages-li-class">
        ASP.NET Identity Core for User Management, Email verification and
        password reset, 2FA functionality with TOTP
      </li>
      <li class="this-pages-li-class">
        Entity Framework Core ORM to communicate with the database.
      </li>
      <li class="this-pages-li-class">
        .NET Core, WebApi for the backend RESTful API.
      </li>
    </ul>
  </section>
  <hr class="hr-tag-2" />
  <section class="highlight-p-tag">
    <h4>Software on the Server</h4>
    <ul class="center-text">
      <li class="this-pages-li-class">Running Windows Server 2019</li>
      <li class="this-pages-li-class">SQL Server 2019 Express</li>
      <li class="this-pages-li-class">Thunderbird Email Client</li>
      <li class="this-pages-li-class">HmailServer Smtp Server</li>
      <li class="this-pages-li-class">Running on a VPS in Eastern Europe</li>
    </ul>
  </section>
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
.this-pages-li-class {
  margin: 1rem auto;
  max-width: 45rem;
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
