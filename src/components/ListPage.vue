<template>
  <div class="mainlistpage">
    <div>
      <h4>Слова на карточках</h4>
      <div v-for="word in WordsOften" :key="word.id" class="list">
        <div class="listword">
          <p>
            {{ word.fw }} <br />
            {{ word.sw }}
          </p>
        </div>
        <p>Часто</p>
        <button @click="setFreq(word, -3)">Убрать</button>
      </div>

      <div v-for="word in WordsNormal" :key="word.id" class="list">
        <div class="listword">
          <p>
            {{ word.fw }} <br />
            {{ word.sw }}
          </p>
        </div>
        <p>Обычно</p>
        <button>Убрать</button>
      </div>

      <div v-for="word in WordsRarely" :key="word.id" class="list">
        <div class="listword">
          <p>
            {{ word.fw }} <br />
            {{ word.sw }}
          </p>
        </div>
        <p>Редко</p>
        <button>Убрать</button>
      </div>
    </div>

    <div>
      <h4>Скрытые слова</h4>
      <div v-for="word in WordsHided" :key="word.id" class="list">
        <button>Вернуть</button>
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
  methods: {
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
</style>
