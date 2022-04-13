<template>
  <p>
    The current project is a Vue.Js 3 client app with .NET Core 3.1 used for the
    OIDC compliant token server, the identity management app and the backend.
  </p>
  <h4>TODO</h4>
  <ol class="text-indent">
    <li class="temp-li-class">1) Set up CI/CD</li>
    <li class="temp-li-class">2) Experiment with WebXR and WebGL 3D engine</li>
    <li class="temp-li-class">
      3) Migrate backend, token server and identity management apps to .NET 6
    </li>
    <li class="temp-li-class">4) Unifiy style across all the UIs</li>
    <li class="temp-li-class">
      5) Add external identity providers (Microsoft Account and Google Account)
      for login
    </li>
    <li class="temp-li-class">6) A Guest Book say "Hello, I was here"</li>
  </ol>
  <h4>The Frameworks and Libraries</h4>
  <ul class="center-text">
    <li class="temp-li-class">VueJs for a browser client application</li>
    <li class="temp-li-class">
      Identity Server 4 for Token Signing and Token Management.
    </li>
    <li class="temp-li-class">
      ASP.NET Identiy Core for User Management and 2FA functionality with TOTP
    </li>
    <li class="temp-li-class">
      Entity Framework Core ORM to communicate with the database.
    </li>
    <li class="temp-li-class">
      .NET Core, WebApi for the backend RESTful API.
    </li>
  </ul>
  <img src="@/assets/images/html.jpg" class="images" />
  <h4>Software on the Server</h4>
  <ul class="center-text">
    <li class="temp-li-class">Running Windows Server 2019</li>
    <li class="temp-li-class">SQL Server 2019 Express</li>
    <li class="temp-li-class">Thunderbird Email Client</li>
    <li class="temp-li-class">HmailServer relay / email server</li>
    <li class="temp-li-class">Running on a VPS in Eastern Europe</li>
  </ul>
</template>

<script></script>

<style>
.temp-li-class {
  margin: 1rem auto;
  max-width: 45rem;
}
.center-text {
  text-align: center;
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
}
</style>
