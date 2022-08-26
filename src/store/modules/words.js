import { db } from "@/main";
import {
  collection,
  query,
  where,
  getDocs,
  /* setDoc,
  doc, */
} from "firebase/firestore";
import store from "@/store/store";

export default {
  state: () => ({
    Wordsrarely: [],
    WordsNormal: [],
    WordsOften: [],
  }),
  getters: {},
  mutations: {
    setWordsNormal(state, wn) {
      state.WordsNormal = wn;
    },
  },
  actions: {
    async getWordsNormal({ commit }) {
      try {
        const q = query(
          collection(db, store.state.login),
          where("fr", "==", 2)
        );
        let arr = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          arr.push(a);
        });
        commit("setWordsNormal", arr);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
