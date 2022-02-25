import { Module } from "vuex";
import { RootStateType } from "../index";
import { User } from "oidc-client";
import { authGetters } from './authGetters';
import { authMutations } from './authMutations';
import { authActions } from './authActions';

export type AuthStateType = {
    loggedIn: boolean,
    user: User,
    accessToken: string,
    refreshToken?: string,
    idToken: string,
    scopes: string[],
    showRefreshModal: boolean
}

export const authModule: Module<AuthStateType, RootStateType> = {
    state: (): AuthStateType => ({
        loggedIn: false,
        user: {} as User,
        accessToken: "",
        refreshToken: "",
        idToken: "",
        scopes: [],
        showRefreshModal: false
    }),
    getters: authGetters,
    mutations: authMutations,
    actions: authActions
}