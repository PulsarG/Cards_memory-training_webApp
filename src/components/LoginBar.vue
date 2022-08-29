<template>
  <div class="mainloginbar">
    <div v-show="!$store.state.isAuth">
      <reg-window v-model:isShowReg="isShowReg"></reg-window>
      <input type="text" placeholder="Login" v-model="enterLogin" />
      <input type="text" placeholder="Password" v-model="enterPass" />
      <button @click="LogIn">Войти</button>
      <button @click="OpenReg">Регистрация</button>
    </div>

    <div class="loginbarafterlogin" v-show="$store.state.isAuth">
      <h4>
        {{ $store.state.login }}
      </h4>
      <div class="count">
        <h4>(всего слов: {{ $store.state.words.countWords }} )</h4>
      </div>
      <button @click="LogOut">Выйти</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { collection, getDocs, query, where } from "firebase/firestore";

import RegWindow from "@/components/RegWindow.vue";
import { mapActions } from "vuex";

export default {
  components: { RegWindow },
  data() {
    return {
      enterLogin: "",
      enterPass: "",

      isShowReg: false,
    };
  },

  methods: {
    async LogIn() {
      let items = [];
      try {
        const q = query(
          collection(db, "User"),
          where("pass", "==", this.enterPass),
          where("login", "==", this.enterLogin)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        if (items[0].isLogin) {
          this.$store.commit("setAuth", true);
          this.$store.commit("words/setCountWords");
        }
      } catch (e) {
        console.log(e);
        alert("Не верные данные");
      }
      if (items[0].isLogin) {
        localStorage.login = items[0].login;
        localStorage.isLogin = true;
        this.setLogin();
        this.getAllWords();
      }
    },

    LogOut() {
      this.enterLogin = "";
      this.enterPass = "";
      this.$store.commit("setAuth", false);
      localStorage.removeItem("login");
      localStorage.removeItem("isLogin");
    },

    OpenReg() {
      this.isShowReg = true;
    },

    setLogin() {
      this.$store.commit("setLogin", this.enterLogin);
    },

    ...mapActions({
      getAllWords: "words/getAllWords",
    }),
  },

  mounted() {
    if (localStorage.login) {
      this.enterLogin = localStorage.login;
      this.$store.commit("setAuth", localStorage.isLogin);
      this.setLogin();
      this.getAllWords();
    }
  },
};
</script>

<style>
.mainloginbar {
  display: flex;
  justify-content: center;
  margin: auto;
}

.loginbarafterlogin {
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.count {
  display: flex;
  flex-direction: row;
}
</style>
