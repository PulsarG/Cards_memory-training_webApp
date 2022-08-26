<template>
  <div>
    <div v-show="!$store.state.isAuth">
      <reg-window v-model:isShowReg="isShowReg"></reg-window>
      <input type="text" placeholder="login" v-model="enterLogin" />
      <input type="text" placeholder="password" v-model="enterPass" />
      <button @click="LogIn">Войти</button>
      <button @click="OpenReg">Регистрация</button>
    </div>

    <div v-show="$store.state.isAuth">
      <h4>{{ $store.state.login }}</h4>
      <button @click="LogOut">Выйти</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { collection, getDocs, query, where } from "firebase/firestore";

import RegWindow from "@/components/RegWindow.vue";

export default {
  components: { RegWindow },
  data() {
    return {
      enterLogin: "",
      enterPass: "",

      isShowReg: false,
      
      items: [],
    };
  },

  methods: {
    async LogIn() {
      try {
        const q = query(
          collection(db, "User"),
          where("pass", "==", this.enterPass),
          where("login", "==", this.enterLogin)
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.items.push(doc.data());
        });
        
        if (this.items[0].isLogin) {
          this.$store.commit('setAuth', true);
        }
      } catch (e) {
        console.log(e);
      }
      if (this.items[0].isLogin) {
        localStorage.login = this.items[0].login;
        localStorage.isLogin = true;
        this.setLogin();
      } else {
        alert("Не верные данные");
      }
    },

    LogOut() {
      this.enterLogin = "";
      this.enterPass = "";
      this.$store.commit('setAuth', false);
      localStorage.removeItem("login");
      localStorage.removeItem("isLogin");
    },

    OpenReg() {
      this.isShowReg = true;
    },

    setLogin() {
      this.$store.commit("setLogin", this.enterLogin);
    },
  },

  mounted() {
    if (localStorage.login) {
      this.enterLogin = localStorage.login;
      this.$store.commit("setAuth", localStorage.isLogin);
      this.setLogin();
    }
  },
};
</script>

<style></style>
