import authSettings from "@/appConfig/authSettings";
import { Module } from "vuex";
import { RootStateType } from "../index";
import { User } from "oidc-client";
import { authGetters } from "./authGetters";
import { authMutations } from "./authMutations";
import { authActions } from "./authActions";
import { UserManager } from "oidc-client";
export type AuthStateType = {
  loggedIn: boolean;
  user: User;
  accessToken: string;
  refreshToken?: string;
  idToken: string;
  scopes: string;
  showRefreshModal: boolean;
  userManager: UserManager;
};

export const authModule: Module<AuthStateType, RootStateType> = {
  state: {
    loggedIn: false,
    user: {} as User,
    accessToken: "",
    refreshToken: "",
    idToken: "",
    scopes: "",
    showRefreshModal: false,
    userManager: new UserManager(authSettings),
  },
  getters: authGetters,
  mutations: authMutations,
  actions: authActions,
};
