import { WebStorageStateStore, UserManagerSettings } from "oidc-client";

const config: UserManagerSettings = {
  metadata: {
    issuer: process.env.VUE_APP_IS4_BASE_URL,
    authorization_endpoint:
      process.env.VUE_APP_IS4_BASE_URL + "/connect/authorize",
    userinfo_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/userinfo",
    end_session_endpoint:
      process.env.VUE_APP_IS4_BASE_URL + "/connect/endsession",
    jwks_uri:
      process.env.VUE_APP_IS4_BASE_URL +
      "/.well-known/openid-configuration/jwks",
    check_session_iframe:
      process.env.VUE_APP_IS4_BASE_URL + "/connect/checksession",
    introspection_endpoint:
      process.env.VUE_APP_IS4_BASE_URLL + "/connect/introspect",
    revocation_endpoint:
      process.env.VUE_APP_IS4_BASE_URL + "/connect/revocation",
    token_endpoint: process.env.VUE_APP_IS4_BASE_URL + "/connect/token",
  },
  prompt: "login",
  authority: process.env.VUE_APP_IS4_BASE_URL,
  client_id: "MainClient",
  redirect_uri: process.env.VUE_APP_BASE_URL + "/callback.html",
  response_type: "code",
  scope: "openid profile offline_access IdApi email",
  post_logout_redirect_uri: process.env.VUE_APP_BASE_URL,

  accessTokenExpiringNotificationTime: 150,

  checkSessionInterval: 2000,
  monitorSession: true,
  automaticSilentRenew: false,

  filterProtocolClaims: true,

  revokeAccessTokenOnSignout: true,
  staleStateAge: 300,
  silent_redirect_uri: process.env.VUE_APP_BASE_URL + "/silent-refresh.html",

  userStore: new WebStorageStateStore({ store: window.sessionStorage }), // This is acceptable from a security stand point, but best to use inmemorystorage and obufuscate js code.

  // TODO: Implement this - should be able to access userStore as console.log(this.$userManager.settings.userStore.get("oidc.user:" + process.env.VUE_APP_IS4_BASE_URL + ":" + process.env.VUE_APP_MAIN_CLIENT));
  // InMemoryWebStorage has a getItem(), setItem() that returns as promise.
  // userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
};

export default config;
