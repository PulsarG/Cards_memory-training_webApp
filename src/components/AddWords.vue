<template>
  <div class="mainaddwords">
    
      <input type="text" placeholder="Иностранное слово" v-model="fw" class="addint"/>
    
    
      <input type="text" placeholder="Перевод" v-model="sw" class="addint"/>
    
      <button @click="AddWords">Добавить</button>
      <p v-show="isAdd">Добавлено</p>
    
  </div>
</template>

<script>
import { db } from "@/main";
import { collection, addDoc } from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  props: {
    user: String,
  },
  data() {
    return {
      fw: "",
      sw: "",

      isAdd: false,
    };
  },

  methods: {
    async AddWords() {
      await addDoc(collection(db, this.$store.state.login), {
        fw: this.fw,
        sw: this.sw,
        fr: 2,
      });

      this.fw = "";
      this.sw = "";
      this.isAdd = true;
      setTimeout(() => {
        this.isAdd = false;
      }, 1000);
      this.getAllWords();
    },

    ...mapActions({
      getAllWords: "words/getAllWords",
    }),
  },
};
</script>

<style>
.mainaddwords {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width:  400px;
  margin: auto;
  padding-top: 15px;
}
.addint {
  margin-top: 5px;
  height: 30px;
}
</style>