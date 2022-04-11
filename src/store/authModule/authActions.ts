import { ActionContext, ActionTree } from "vuex";
import { RootStateType, store } from "../index";

import { AuthStateType } from "./index";
import { AuthMutations, AuthMutationTypes } from "./authMutations";

import { Log } from "oidc-client";
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
    store.getters.getUserManager.signinRedirect().catch((err: Error) => {
      store.dispatch("setError", err);
    });
  },

  logout({ commit }) {
    store.getters.getUserManager
      .signoutRedirect()
      .then(() => {
        commit(AuthMutationTypes.SET_LOGOUT_STATE, false);
      })
      .catch((err: Error) => {
        store.dispatch("setError", err);
      });
  },
};
