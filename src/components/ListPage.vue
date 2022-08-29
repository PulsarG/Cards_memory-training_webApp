<template>
  <div class="mainlistpage">
    <div>
      <button class="btnlistshowwords" @click="hideNormalList">
        Слова на карточках
      </button>
      <div
        v-for="word in WordsOften"
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
        <p style="color: blue">Часто</p>
        <button @click="setFreq(word, -3)">Убрать</button>
      </div>

      <div
        v-for="word in WordsNormal"
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
        <p style="color: green">Обычно</p>
        <button @click="setFreq(word, -3)">Убрать</button>
      </div>

      <div
        v-for="word in WordsRarely"
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
        <p style="color: orangered">Редко</p>
        <button @click="setFreq(word, -3)">Убрать</button>
      </div>
    </div>

    <div>
      <button class="btnlisthidedwords" @click="hideHidedList">
        Скрытые слова
      </button>
      <div
        v-for="word in WordsHided"
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
        <button>Удалить</button>
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

    WordsHided() {
      return this.$store.state.words.WordsHided;
    },
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
