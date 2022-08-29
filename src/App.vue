<template>
  <login-bar></login-bar>
  <div class="navbar">
    <button @click="$router.push('/')">Карточки</button>
    <button @click="$router.push('/list')">Список</button>
  </div>
  <router-view></router-view>
</template>

<script>
import LoginBar from "@/components/LoginBar.vue";
export default {
  components: { LoginBar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar {
  margin-top: 10px;
}
</style>
