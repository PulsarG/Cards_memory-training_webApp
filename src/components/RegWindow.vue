<template>
  <div class="modalreg" v-show="isShowReg" @click.stop="hideModal">
    <div @click.stop class="modalcontent">
      <input type="text" placeholder="Login" v-model="login"/>
      <input type="email" placeholder="Email ( необязательно )" v-model="email" />
      <input type="text" placeholder="Password" v-model="pass"/>
      <button @click="RegUser">Зарегистрироваться</button>
      <p v-show="isReg">Регистрация прошла успешно</p>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { collection, addDoc } from "firebase/firestore";
export default {
  props: {
    isShowReg: Boolean,
  },
  data() {
    return {
      login: "",
      pass: "",
      email: "",

      isReg: false,
    };
  },

  methods: {
    async RegUser() {
      if (this.login == "" || this.pass == "") {
        alert("Не введен Логин или Пароль");
      } else {
        try {
          addDoc(collection(db, "User"), {
            login: this.login,
            pass: this.pass,
            email: this.email,
            isLogin: true,
          });
          this.isReg = true;
          setTimeout(() => {
            this.isReg = false;
            this.hideModal();
          }, 3000);
        } catch (e) {
          alert(e);
        }
        this.login = "";
        this.pass = "";
      }
    },
    hideModal() {
      this.$emit("update:isShowReg", false);
    },
  },
};
</script>

<style scoped>
.modalreg {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.modalcontent {
  margin: auto;
  background: white;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

input{
  height: 30px;
}

button {
  margin-top: 10px;
}
</style>
