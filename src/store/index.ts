
import { createStore, Store, ActionContext } from "vuex";
import { InjectionKey } from "vue";
import { authModule } from "./authModule/index";

export type RootStateType = {
  error: string,
}

enum RootStateTypes {
  SET_ERROR = "SET_ERROR"
}

type RootMutations<S = RootStateType> = {
  [RootStateTypes.SET_ERROR](state: S, payload: string) : void,
}

const key: InjectionKey<Store<RootStateType>> = Symbol();

type AugmentedActionContext = {
  commit<K extends keyof RootMutations>(key: K, payload: Parameters<RootMutations[K]>[1]) : ReturnType<RootMutations[K]> 
} & Omit<ActionContext<RootStateType, RootStateType>, "commit">

const rootModule = {
  state: (): RootStateType => ({
    error: ""
  }),
  mutations: {
    SET_ERROR (state: RootStateType, payload: string) {
      state.error = payload;
      console.error(payload);
    }
  },
  actions: {
    setError({commit} : AugmentedActionContext, payload: string){
      commit(RootStateTypes.SET_ERROR, payload)
    }
  },
}

export const store = createStore({
  modules: {
    root: rootModule,
    authModule: authModule
  }
})
