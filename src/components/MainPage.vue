<template>
  <div>
    <two-cards></two-cards>
    <add-words class="add"></add-words>
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
.add {
  margin-top: 5px;
}
</style>
