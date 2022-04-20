<template>
  <p>
    The current project is a (newly rebuilt) Vue.Js 3 client app with .NET Core
    3.1 used for the OIDC compliant token server, the identity management and
    the backend apps/APIs.
  </p>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <h4>TODO - the (unordered) backlog</h4>
    <ul class="text-indent">
      <li class="temp-li-class">- Lease two more virtual private servers</li>
      <li class="temp-li-class">
        - Set up CI/CD for all client and server-side apps
      </li>
      <li class="temp-li-class">
        - Containerize all client and server-side apps
      </li>
      <li class="temp-li-class">- Experiment with WebXR and WebGL 3D engine</li>
      <li class="temp-li-class">
        - Migrate backend, token server and identity management apps to LTS
        version
      </li>
      <li class="temp-li-class">
        - Implement an email contact endpoint for Contact page
      </li>
      <li class="temp-li-class">- Unifiy style across all the client apps</li>
      <li class="temp-li-class">
        - Add external identity providers (Microsoft Account and Google Account)
        for login
      </li>
      <li class="temp-li-class">- A Guest Book say "Hello, I was here"</li>
      <li class="temp-li-class">
        - Add Role Manager to the identity management app
      </li>
      <li class="temp-li-class">
        - Add UI to STS to dynamically add client apps and apis (Multi-Tenant
        STS)
      </li>
      <li class="temp-li-class">
        - Change STS to store config and operational data to database (postgres,
        redis)
      </li>
    </ul>
  </div>
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <h4>The Frameworks and Libraries</h4>
    <ul class="center-text">
      <li class="temp-li-class">
        VueJs 3 for a browser client application, Vue/Cli v5.4, Vue Router v4,
        VueX v4
      </li>
      <li class="temp-li-class">
        Identity Server 4 for Token Signing and Token Management.
      </li>
      <li class="temp-li-class">
        ASP.NET Identity Core for User Management, Email verification and
        password reset, 2FA functionality with TOTP
      </li>
      <li class="temp-li-class">
        Entity Framework Core ORM to communicate with the database.
      </li>
      <li class="temp-li-class">
        .NET Core, WebApi for the backend RESTful API.
      </li>
    </ul>
  </div>
  <hr class="hr-tag-2" />
  <img src="@/assets/images/html.jpg" class="images" />
  <hr class="hr-tag-2" />
  <div class="highlight-p-tag">
    <h4>Software on the Server</h4>
    <ul class="center-text">
      <li class="temp-li-class">Running Windows Server 2019</li>
      <li class="temp-li-class">SQL Server 2019 Express</li>
      <li class="temp-li-class">Thunderbird Email Client</li>
      <li class="temp-li-class">HmailServer Smtp Server</li>
      <li class="temp-li-class">Running on a VPS in Eastern Europe</li>
    </ul>
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
.temp-li-class {
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
