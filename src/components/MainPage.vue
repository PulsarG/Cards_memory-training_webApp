<template>
  <div>
    <two-cards></two-cards>
    <add-words></add-words>
  </div>
</template>

<script>
import AddWords from "@/components/AddWords.vue";
import TwoCards from "@/components/TwoCards.vue";

export default {
  components: { AddWords, TwoCards },

  data() {
    return {
     
    };
  },

  methods: {
   
  },
  
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
