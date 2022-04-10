import { ActionContext, ActionTree } from "vuex";
import { RootStateType, store } from "../index";

import { AuthStateType } from "./index";
import { AuthMutations, AuthMutationTypes } from "./authMutations";

import { User, UserManager, Log } from "oidc-client";
import config from "@/appConfig/authSettings";
const userManager = new UserManager(config);

if (process.env.NODE_ENV === "development") {
  console.info("RUNNING IN DEV MODE!! UserManager - oidc-client");
  Log.logger = console;
  Log.level = Log.DEBUG;
}

type AugmentedActionContext = {
  commit<K extends keyof AuthMutations<AuthStateType>>(
    key: K,
    payload: Parameters<AuthMutations<AuthStateType>[K]>[1]
  ): ReturnType<AuthMutations<AuthStateType>[K]>;
} & Omit<ActionContext<AuthStateType, RootStateType>, "commit">;

type AuthActions = {
  login({ commit }: AugmentedActionContext): void;
  logout({ commit }: AugmentedActionContext): void;
};

export const authActions: ActionTree<AuthStateType, RootStateType> &
  AuthActions = {
  login() {
    userManager.signinRedirect().catch((err: Error) => {
      store.dispatch("setError", err);
    });
  },

  logout({ commit }) {
    userManager
      .signoutRedirect()
      .then(() => {
        commit(AuthMutationTypes.SET_LOGOUT_STATE, false);
      })
      .catch((err: Error) => {
        store.dispatch("setError", err);
      });
  },
};
