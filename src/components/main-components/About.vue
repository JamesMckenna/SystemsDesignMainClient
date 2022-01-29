<template>
  <div class="body-container">
    <h2>About This Application</h2>
    <p>
      The current project is a blogging / document creation application built with a VueJs client and .NET Core for the backend. There is a crazy amount of backend development to be completed before
      this client application receives any lovin' - after all, a sports car with a shinning paint job and sleek body lines is just an ornament if the engine doesn't run.
      <br />
      <i style="font-family: Roboto; font-size: .85rem;">I understand that listing the tech stack and deploymnent environment on a public web page is considered a security risk and decided in this case, it won't be the end of the world if this app gets hacked. When it comes down to it, there's nothing to gain from hacking this app.</i>
    </p>
    <h3>The Frameworks and Libraries used in this application</h3>
    <ul>
      <li>
        VueJs for a browser client application
      </li>
      <li>
        Identity Server 4 for Token Signing and Token Management.
      </li>
      <li>
        Identiy Core for User management and Multi-Factor Authentication using Time-based One Time Passwords
      </li>
      <li>
        Entity Framework Core to communicate with the database.
      </li>
      <li>
        .NET Core for the backend REST API's.
      </li>
      <li>
        Tip-Tap library for the text editor, client application.
      </li>
    </ul>
    <img src="@/assets/images/html.jpg" class="images"/>
    <h4>Software on the Server</h4>
    <ul>
      <li>
        Running Windows Server 2019
      </li>
      <li>
        SQL Server 2019 Express
      </li>
      <li>
        Thunderbird Email Client
      </li>
      <li>
        HmailServer relay / email server
      </li>
      <li>
        Running on a VPS in Eastern Europe
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineEmits } from 'vue'

const emits = defineEmits(['renderHeader'])

onMounted(() => {
  emits('renderHeader', false)
})
</script>

<style scoped>
h2 {
  margin: 1rem;
}

p {
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 45rem;
  margin: 1rem auto;
}

li {
  margin: 1rem auto;
  max-width: 45rem;
  line-height: 1.5rem;
  text-align: center;
}

.body-container {
  margin-top: 1rem;
  min-height: 80vh;
}

.images {
  display: block;
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: 2rem auto;
}
</style>
