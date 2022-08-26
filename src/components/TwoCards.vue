<template>
  <div>
    <button @click="getFreq">
      <h1>{{ fw }}</h1>
    </button>
    <button @click="getFreq">
      <h1>{{ sw }}</h1>
    </button>
    <div>
      <p v-show="isReady">Готово</p>
    </div>
  </div>
  <div>
    <button @click="setRareCard(this.id)" id="btnrare">Реже</button>
    <button @click="setOftenCard(this.id)" id="btnoften">Чаще</button>
  </div>
</template>

<script>
import { db } from "@/main";
import { setDoc, doc, addDoc } from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  props: {
    user: String,
  },
  data() {
    return {
      fw: "Hello",
      sw: "Привет",
      fr: 0,
      id: "",

      frNumber: [1, 2, 2, 3, 3, 3],

      lastWord: [],

      isReady: false,
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
        this.showReadyText();
        this.getAllWords();
        this.getFreq();
      } catch (e) {
        alert(e);
      }
    },
    async setOftenCard(id) {
      try {
        await setDoc(doc(db, this.$store.state.login, id), {
          fw: this.fw,
          sw: this.sw,
          fr: ++this.fr,
        });
        /* alert("Сохранено");
          this.reloadChars(true); */
        this.showReadyText();
        this.getAllWords();
        this.getFreq();
      } catch (e) {
        alert(e);
      }
    },

    getFreq() {
      let r = Math.floor(Math.random() * this.frNumber.length);
      this.selectWordsArrAftergetFreq(this.frNumber[r]);
      console.log(this.frNumber[r]);
    },

    setRandomNum(arr) {
      let r = Math.floor(Math.random() * arr.length);
      return r;
    },

    selectWordsArrAftergetFreq(r) {
      if (r == 1 && this.WordsRarely.length != 0) {
        this.setRandomCardRarely();
      } else if (r == 2 && this.WordsNormal.length != 0) {
        this.setRandomCardNormal();
      } else if (r == 3 && this.WordsOften.length != 0) {
        this.setRandomCardOften();
      } else {
        this.getFreq();
      }
    },

    setRandomCardNormal() {
      let r = this.setRandomNum(this.WordsNormal);

      if (this.lastWord == this.WordsNormal[r]) {
        this.getFreq();
      } else {
        this.fw = this.WordsNormal[r].fw;
        this.sw = this.WordsNormal[r].sw;
        this.fr = this.WordsNormal[r].fr;
        this.lastWord = this.WordsNormal[r];

        this.id = this.WordsNormal[r].id;
      }
    },

    setRandomCardOften() {
      let r = this.setRandomNum(this.WordsOften);
      if (this.lastWord == this.WordsOften[r]) {
        this.getFreq();
      } else {
        this.fw = this.WordsOften[r].fw;
        this.sw = this.WordsOften[r].sw;
        this.fr = this.WordsOften[r].fr;
        this.lastWord = this.WordsOften[r];
        this.id = this.WordsOften[r].id;
      }
    },

    setRandomCardRarely() {
      let r = this.setRandomNum(this.WordsRarely);
      if (this.lastWord == this.WordsRarely[r]) {
        this.getFreq();
      } else {
        this.fw = this.WordsRarely[r].fw;
        this.sw = this.WordsRarely[r].sw;
        this.fr = this.WordsRarely[r].fr;
        this.lastWord = this.WordsRarely[r];
        this.id = this.WordsRarely[r].id;
      }
    },

    ...mapActions({
      getAllWords: "words/getAllWords",
    }),

    showReadyText() {
      this.isReady = true;
      setTimeout(() => {
        this.isReady = false;
      }, 1000);
    },
  },

  computed: {
    WordsNormal() {
      return this.$store.state.words.WordsNormal;
    },
    WordsOften() {
      return this.$store.state.words.WordsOften;
    },
    WordsRarely() {
      return this.$store.state.words.WordsRarely;
    },
  },

  watch: {
    fr(v) {
      let btnr = document.getElementById("btnrare");
      let btno = document.getElementById("btnoften");
      if (v == 1) {
        btnr.setAttribute("disabled", true);
        btno.removeAttribute("disabled");
      } else if (v == 3) {
        btnr.removeAttribute("disabled");
        btno.setAttribute("disabled", true);
      } else {
        btnr.removeAttribute("disabled");
        btno.removeAttribute("disabled");
      }
    },
  },
};
</script>

<style></style>
