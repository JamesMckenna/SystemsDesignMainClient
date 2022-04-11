import Oidc, { UserManagerSettings } from "oidc-client";

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

  checkSessionInterval: 10000,
  monitorSession: true,
  automaticSilentRenew: false,

  filterProtocolClaims: true,

  revokeAccessTokenOnSignout: true,
  staleStateAge: 300,
  silent_redirect_uri: process.env.VUE_APP_BASE_URL + "/silent-refresh.html",

  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
};

export default config;
