<template>
   <div>
    <h2>{{ props.msg }}</h2>
    <p>I have spent time researching, designing and coding a ‘base’ for enterprise software, and now the hard part comes: writing, (and I use the term loosely) engaging, content for visitors to this site.</p>

    <p>Following Service Oriented Architecture (SOA), the idea is to build the base software functionality in such a way that any organization can add to it and customize to suit their needs. For a base, authentication and authorization are a must. The application will need a public facing website as well as an administrator's client application. Blogging functionality could be useful for ‘base functionality’ of an enterprise application.  From there, organization specific services can be added as needed.</p>

    <p>As of now, authentication is complete. A User can register a new account with email verification, add and verify phone a number via SMS, change password and forgot password, and enable 2FA using TOTP. The ApplicationUser model is barebones and inherits from the base IdentityUser class of the ASP.Net Core Identity Framework - custom ApplicationUser properties will be added in later SDLC, iterations.</p>

    <img src="@/assets/images/VSSS.png" class="images"/>

    <p>Currently, I am in the Analysis phase for the authorization use cases, designing authorization policies, user claims and (probably) user roles - so a combination of claims-based and roles-based, authorization policies. Once I have decided on the base policies that will be required for generic authorization, I can start the Design and Implementation phases. An Administrator UI / CRUD Endpoints will be required in order to tailor authorization polices and user administration to specific organizational needs.</p>

    <img src="@/assets/images/VueSS.png" class="images"/>

    <p>Following the completion of authorization, come the clients. As one can see, right now they are in serious need of some lovin'. Also, the blog creation functionality will need an API and storage layer to accompany the main client. I am leaning towards VueJs / Net Core using a backend for frontend architecture, though I like what I have seen from Blazor and may choose that route for a client framework. So I will eventually unify the style across the UI's (Main Client, Id Management, Identity Server 4 log in / log out).</p>

    <p>For this software to embrace SOA, client applications - and the API’s to service those client applications - will need to be added to the token management system without needing to re-publish and re-deploy the ‘base functionality’ application.  The token management application (built with Identity Server 4), will need a UI so that a developer can add the resources as they are developed and are ready for production deployment.</p>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps, defineEmits } from 'vue'

const props = defineProps({ renderHeader: String, msg: String })
const emits = defineEmits(['renderHeader'])

onMounted(() => {
  emits('renderHeader', true)
})
</script>

<style scoped>
p {
  margin: auto auto;
  max-width: 45rem;
  text-align: left;
  text-indent: 3rem;
  padding: 1rem 1rem;
}

h2{
  margin-bottom: 3rem;
}

.images {
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: 2rem auto;
}
</style>
