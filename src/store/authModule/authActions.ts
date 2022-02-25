import { ActionContext, ActionTree } from "vuex";
import { RootStateType, store } from "../index";

import { AuthStateType } from "./index";
import { AuthMutations, AuthMutationTypes } from "./authMutations";

import { User, UserManager, Log } from "oidc-client";
import  config from "@/appConfig/authSettings";
const userManager = new UserManager(config);

if(process.env.NODE_ENV === "development"){
    console.info("RUNNING IN DEV MODE!! UserManager - oidc-client");
    Log.logger = console;
    Log.level = Log.DEBUG;
}

type AugmentedActionContext = {
    commit<K extends keyof AuthMutations<AuthStateType>>(key: K, payload: Parameters<AuthMutations<AuthStateType>[K]>[1]) : ReturnType<AuthMutations<AuthStateType>[K]> 
} & Omit<ActionContext<AuthStateType, RootStateType>, "commit">

type AuthActions = {
    //TEST ACTION
    setLoggedInState({ commit }: AugmentedActionContext) : void,

    login({ commit }: AugmentedActionContext) : void,
    logout({ commit }: AugmentedActionContext) : void
}

export const authActions: ActionTree<AuthStateType, RootStateType> & AuthActions = {
    
    //TEST ACTION
    setLoggedInState({ commit }) {
      console.log("called");
        commit(AuthMutationTypes.TEST_SET_LOGGEDIN_STATE, true);
    },

    login({ commit }) {
      console.log("CALLED")
      userManager.signinRedirect()
      //.then(() => userManager.getUser())
      //.then((data) => {commit(AuthMutationTypes.SET_LOGGEDIN_STATE, data as User)})
      .catch(err => {
        store.dispatch("setError", err);
      });
    },

    logout({ commit }) {
      userManager.signoutRedirect()
      .then(function() {
        commit(AuthMutationTypes.SET_LOGOUT_STATE, false);
      })
      .catch(err => {
        store.dispatch("setError", err);
      });
    }
}