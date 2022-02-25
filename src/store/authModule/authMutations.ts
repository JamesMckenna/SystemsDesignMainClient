import { AuthStateType} from "./index";
import { MutationTree } from "vuex";
import { User } from "oidc-client"

export enum AuthMutationTypes {

    //TEST MUTATION
    TEST_SET_LOGGEDIN_STATE = "TEST_SET_LOGGEDIN_STATE",

    HIDE_REFRESH_MODAL = "HIDE_REFRESH_MODAL",
    SHOW_REFRESH_MODAL = "SHOW_REFRESH_MODAL",
    SET_LOGGEDIN_STATE = "SET_LOGGEDIN_STATE",
    SET_LOGOUT_STATE = "SET_LOGOUT_STATE"
}

export type AuthMutations<AuthStateType> = {

    //TEST MUTATION
    [AuthMutationTypes.TEST_SET_LOGGEDIN_STATE](state: AuthStateType, payload: boolean) : void,

    [AuthMutationTypes.HIDE_REFRESH_MODAL](state: AuthStateType, payload: boolean) : void,
    [AuthMutationTypes.SHOW_REFRESH_MODAL](state: AuthStateType, payload: boolean) : void,
    [AuthMutationTypes.SET_LOGGEDIN_STATE](state: AuthStateType, payload: User) : void,
    [AuthMutationTypes.SET_LOGOUT_STATE](state: AuthStateType, payload: boolean) : void,
}

export const authMutations: MutationTree<AuthStateType> & AuthMutations<AuthStateType> = {

    //TEST MUTATION
    TEST_SET_LOGGEDIN_STATE: (state: AuthStateType, data: boolean) => {
        state.loggedIn = data;
        console.log(state.loggedIn);
    },

    HIDE_REFRESH_MODAL: (state: AuthStateType) => {
        state.showRefreshModal = false;
    },

    SHOW_REFRESH_MODAL: (state: AuthStateType) => {
        state.showRefreshModal = true;
    },

    SET_LOGGEDIN_STATE: (state: AuthStateType, data: User) => {
        state.loggedIn = true;
        state.idToken = data.id_token;
        state.user = data;
        state.accessToken = data.access_token;
        state.refreshToken = data.refresh_token;
        state.scopes = data.scopes;
    },

    SET_LOGOUT_STATE: (state: AuthStateType) => {
        state.loggedIn = false;
        state.idToken = "";
        state.user = {} as User;
        state.accessToken = "";
        state.refreshToken = "";
        state.scopes = [];
    },
}