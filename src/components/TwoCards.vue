<template>
  <div>
    <button @click="getWordsNormal">
      <h1>{{ fw }}</h1>
    </button>
    <button @click="setRandomCardNormal">
      <h1>{{ sw }}</h1>
    </button>
  </div>
  <div>
    <button @click="setRareCard(this.id)">Реже</button>
    <button @click="setPlus">Чаще</button>
  </div>
</template>

<script>
import { db } from "@/main";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  props: {
    user: String,
  },
  data() {
    return {
      fw: "",
      sw: "",
      fr: 0,
      id: "",

      lastWord: [],
    };
  },

  methods: {
   async setRareCard(id) {
        try {
          await setDoc(doc(db, this.$store.state.login, id), {
            fw: this.fw,
            sw: this.sw,
            fr: --this.fr,
          });
          /* alert("Сохранено");
          this.reloadChars(true); */
        } catch (e) {
          alert(e);
        }
    },

    setRandomNum(arr) {
      let r = Math.floor(Math.random() * arr.length);
      return r;
    },

    setRandomCardNormal() {
      let r = this.setRandomNum(this.WordsNormal);

      if ((this.lastWord == this.WordsNormal[r])) {
        this.setRandomCardNormal();
      } else {
        this.fw = this.WordsNormal[r].fw;
        this.sw = this.WordsNormal[r].sw;
        this.fr = this.WordsNormal[r].fr;
        this.lastWord = this.WordsNormal[r];

        this.id = this.WordsNormal[r].id;
      }
    },

    ...mapActions({
      getWordsNormal: "words/getWordsNormal",
    }),
  },

  computed: {
    WordsNormal() {
      return this.$store.state.words.WordsNormal;
    },
  },
};
</script>

<style></style>
