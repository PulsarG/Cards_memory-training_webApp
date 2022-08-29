<template>
  <div class="mainlistpage">
    <div>
      <button class="btnlistshowwords" @click="hideNormalList">
        Слова на карточках
      </button>
      <div
        v-for="word in this.WordsList"
        :key="word.id"
        class="list"
        v-show="showNormalList"
      >
        <div class="listword">
          <p>
            {{ word.fw }} <br />
            {{ word.sw }}
          </p>
        </div>
        <p v-show="word.fr === 3" style="color: blue">Часто</p>
        <p v-show="word.fr === 2" style="color: green">Обычно</p>
        <p v-show="word.fr === 1" style="color: orange">Редко</p>
        <button @click="setFreq(word, -3)">Убрать</button>
      </div>
    </div>

    <div>
      <button class="btnlisthidedwords" @click="hideHidedList">
        Скрытые слова
      </button>
      <div
        v-for="word in this.$store.state.words.WordsHided"
        :key="word.id"
        class="list"
        v-show="showHidedList"
      >
        <button @click="setFreq(word, 2)">Вернуть</button>
        <div class="listword">
          <p>
            {{ word.fw }} <br />
            {{ word.sw }}
          </p>
        </div>
        <button @click="deleteCard(word)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNormalList: true,
      showHidedList: true,

      WordsList: [],
    };
  },
  methods: {
    hideNormalList() {
      if (this.showNormalList) {
        this.showNormalList = false;
      } else {
        this.showNormalList = true;
      }
    },
    hideHidedList() {
      if (this.showHidedList) {
        this.showHidedList = false;
      } else {
        this.showHidedList = true;
      }
    },
    setFreq(word, numForFr) {
      this.$store.dispatch("words/setFreq", { word: word, numForFr: numForFr });
      setTimeout(() => {
        this.setWordList();
      }, 1000);
    },
    deleteCard(word) {
      this.$store.dispatch("words/deleteCard", word);
      this.$store.dispatch("words/getWordsHided");
    },
    setWordList() {
      this.WordsList.length = 0;
      this.WordsList.push(...this.$store.state.words.WordsOften);
      this.WordsList.push(...this.$store.state.words.WordsNormal);
      this.WordsList.push(...this.$store.state.words.WordsRarely);
    },
  },
  mounted() {
    setTimeout(() => {
      this.setWordList();
    }, 1000);
  },
};
</script>

<style scoped>
@media (max-width: 1000px) {
  .mainlistpage {
    flex-direction: row;
  }
  .list {
    max-width: 500px;
  }
}
@media (max-width: 999px) {
  .mainlistpage {
    flex-direction: column;
    align-items: center;
  }
  .list {
    max-width: 500px;
  }
}
@media (max-width: 767px) {
  .mainlistpage {
    flex-direction: column;
  }
  .list {
    max-width: 500px;
  }
}
@media (max-width: 510px) {
  .mainlistpage {
    flex-direction: column;
  }
  .list {
    max-width: 300px;
  }
}

.mainlistpage {
  display: flex;
  margin: auto;
  max-width: 1000px;
  justify-content: center;
}
.list {
  border: 1px dotted black;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 500px;
  height: 50px;
  align-items: center;
}
.listword {
  display: flex;
  flex-direction: row;
}

.btnlistshowwords {
  height: 30px;
  width: auto;
  background: none;
  border: none;
}
.btnlisthidedwords {
  height: 30px;
  width: auto;
  background: none;
  border: none;
}
</style>
