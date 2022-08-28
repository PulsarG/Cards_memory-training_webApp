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
    WordsHided: [],
  }),
  getters: {},
  mutations: {
    setWordsNormal(state, wn) {
      state.WordsNormal = wn;
    },
    setWordsRarely(state, wr) {
      state.WordsRarely = wr;
    },
    setWordsOften(state, wo) {
      state.WordsOften = wo;
    },
    setWordsHided(state, wo) {
      state.WordsHided = wo;
    },
  },
  actions: {
    getAllWords({ dispatch }) {
      dispatch("getWordsNormal");
      dispatch("getWordsRarely");
      dispatch("getWordsOften");
      dispatch("getWordsHided");
    },
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
    async getWordsRarely({ commit }) {
      try {
        const q = query(
          collection(db, store.state.login),
          where("fr", "==", 1)
        );
        let arr = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          arr.push(a);
        });
        commit("setWordsRarely", arr);
      } catch (e) {
        console.log(e);
      }
    },
    async getWordsOften({ commit }) {
      try {
        const q = query(
          collection(db, store.state.login),
          where("fr", "==", 3)
        );
        let arr = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          arr.push(a);
        });
        commit("setWordsOften", arr);
      } catch (e) {
        console.log(e);
      }
    },
    async getWordsHided({ commit }) {
      try {
        const q = query(
          collection(db, store.state.login),
          where("fr", "==", 0)
        );
        let arr = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          arr.push(a);
        });
        commit("setWordsHided", arr);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
