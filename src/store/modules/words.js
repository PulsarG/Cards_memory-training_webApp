import { db } from "@/main";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import store from "@/store/store";

export default {
  state: () => ({
    Wordsrarely: [],
    WordsNormal: [],
    WordsOften: [],
    WordsHided: [],
    isReady: false,
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
    setWordsHided(state, wh) {
      
      state.WordsHided = wh;
    },
    setIsReady(state) {
      state.isReady = true;
      setTimeout(() => {
        state.isReady = false;
      }, 1000);
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
        console.log("1");
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
        console.log("2");
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
        console.log("3");
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
        console.log("4");
      }
    },

    async setFreq({ state, commit, dispatch }, a) {
      try {
        let newFr = a.word.fr + a.numForFr;
        if (newFr < 0) newFr = 0;
        await setDoc(doc(db, store.state.login, a.word.id), {
          fw: a.word.fw,
          sw: a.word.sw,
          fr: newFr,
        });
        commit("setIsReady");
        dispatch("getAllWords");
      } catch (e) {
        console.log(e);
        console.log("5");
      }
    },
  },
  namespaced: true,
};
