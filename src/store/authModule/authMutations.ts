import { AuthStateType } from "./index";
import { MutationTree } from "vuex";
import { User } from "oidc-client";

export enum AuthMutationTypes {
  HIDE_REFRESH_MODAL = "HIDE_REFRESH_MODAL",
  SHOW_REFRESH_MODAL = "SHOW_REFRESH_MODAL",
  SET_LOGGEDIN_STATE = "SET_LOGGEDIN_STATE",
  SET_LOGOUT_STATE = "SET_LOGOUT_STATE",
}

export type AuthMutations<AuthStateType> = {
  [AuthMutationTypes.HIDE_REFRESH_MODAL](state: AuthStateType): void;
  [AuthMutationTypes.SHOW_REFRESH_MODAL](state: AuthStateType): void;
  [AuthMutationTypes.SET_LOGGEDIN_STATE](
    state: AuthStateType,
    payload: string
  ): void;
  [AuthMutationTypes.SET_LOGOUT_STATE](
    state: AuthStateType,
    payload: boolean
  ): void;
};

export const authMutations: MutationTree<AuthStateType> &
  AuthMutations<AuthStateType> = {
  HIDE_REFRESH_MODAL: (state: AuthStateType) => {
    state.showRefreshModal = false;
  },

  SHOW_REFRESH_MODAL: (state: AuthStateType) => {
    state.showRefreshModal = true;
  },

  SET_LOGGEDIN_STATE: (state: AuthStateType, data: string) => {
    const parsed = JSON.parse(data);
    state.loggedIn = true;
    state.idToken = parsed.id_token;
    state.user = parsed.profile;
    state.accessToken = parsed.access_token;
    state.refreshToken = parsed.refresh_token;
    state.scopes = parsed.scope;
  },

  SET_LOGOUT_STATE: (state: AuthStateType) => {
    state.loggedIn = false;
    state.idToken = "";
    state.user = {} as User;
    state.accessToken = "";
    state.refreshToken = "";
    state.scopes = "";
  },
};
