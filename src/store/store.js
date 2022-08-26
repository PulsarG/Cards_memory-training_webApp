import { createStore } from "vuex";
import words  from "./modules/words";

const store = createStore({
  modules: { words },
  state: () => ({
    login: "",
    isAuth: false,
  }),

  mutations: {
    setLogin(state, l) {
      state.login = l;
    },

    setAuth(state, a) {
      state.isAuth = a;
    },
  },
});

export default store;
