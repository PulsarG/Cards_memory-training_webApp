<template>
  <div class="maindivtwocards">
    <div>
      <div class="twocardsbtns">
        <button class="btnCards" @click="getFreq">
          <h1>{{ fw }}</h1>
        </button>
        <button
          class="btnCards secondcard"
          @click="openSecondCard"
          id="seconbtncard"
        >
          <h1>{{ sw }}</h1>
        </button>
      </div>
      <div>
        <p v-show="$store.state.words.isReady">Готово</p>
      </div>
    </div>
    <div>
      <button @click="setFreqForCard(this.id, -1)" id="btnrare">Реже</button>
      <button @click="setFreqForCard(this.id, +1)" id="btnoften">Чаще</button>
    </div>
    <button @click="setFreqForCard(this.id, -3)">Не показывать</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    user: String,
  },
  data() {
    return {
      fw: "Click here to get started!",
      sw: "Кликни сюда, чтобы начать!",
      fr: 0,
      id: "",

      frNumber: [1, 2, 2, 3, 3, 3],

      lastWord: [],

      indexForOpenSecondCard: 1,
    };
  },

  methods: {
    openSecondCard() {
      let btn = document.getElementById("seconbtncard");
      if (!this.indexForOpenSecondCard) {
        btn.style.background = "white";
        ++this.indexForOpenSecondCard;
      } else {
        btn.style.background = "black";
        this.getFreq();
        --this.indexForOpenSecondCard;
      }
    },

    async setFreqForCard(id, numForFr) {
      this.$store.dispatch("words/setFreq", {
        word: { fw: this.fw, sw: this.sw, fr: this.fr, id: id },
        numForFr: numForFr,
      });
    },

    getFreq() {
      let r = ~~(Math.random() * this.frNumber.length);
      this.selectWordsArrAftergetFreq(this.frNumber[r]);
    },

    setRandomNum(arr) {
      let r = ~~(Math.random() * arr.length);
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

        this.two++;
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

        this.three++;
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

        this.one++;
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
    /* isReady() {
      return this.$store.state.words.isReady;
    }, */
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

<style>
.maindivtwocards {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  padding-top: 5px;
}

.twocardsbtns {
  display: flex;
  flex-direction: column;
}

.btnCards {
  width: 400px;
  height: 100px;
  background: none;
  border: 1px solid black;
  margin-top: 3px;
}

.secondcard {
}
</style>
