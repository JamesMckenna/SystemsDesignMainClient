import { AuthStateType } from "./index";
import { GetterTree } from "vuex";
import { User, UserManager } from "oidc-client";
import { RootStateType } from "..";

type AuthGetters = {
  getRefreshToken(state: AuthStateType): string;
  getIdToken(state: AuthStateType): string;
  getAccessToken(state: AuthStateType): string;
  getShowRefreshModal(state: AuthStateType): boolean;
  getLoggedIn(state: AuthStateType): boolean;
  getUser(state: AuthStateType): User;
  getSessionStorage(state: AuthStateType): string | null;
  getUserManager(state: AuthStateType): UserManager;
};

export const authGetters: GetterTree<AuthStateType, RootStateType> &
  AuthGetters = {
  getRefreshToken: (state: AuthStateType): string => {
    return state.refreshToken ? state.refreshToken : "";
  },

  getIdToken: (state: AuthStateType): string => {
    return state.idToken;
  },

  getAccessToken: (state: AuthStateType): string => {
    return state.accessToken;
  },

  getShowRefreshModal: (state: AuthStateType): boolean => {
    return state.showRefreshModal;
  },

  getLoggedIn(state: AuthStateType): boolean {
    return state.loggedIn;
  },

  getUser: (state: AuthStateType): User => {
    return state.user;
  },

  getSessionStorage: (): string | null => {
    return sessionStorage.getItem(
      "oidc.user:" +
        process.env.VUE_APP_IS4_BASE_URL +
        ":" +
        process.env.VUE_APP_MAIN_CLIENT
    );
  },

  getUserManager: (state: AuthStateType): UserManager => {
    return state.userManager;
  },
};
