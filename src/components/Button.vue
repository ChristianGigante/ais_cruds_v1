<template>
  <v-btn class="mx-2" outlined  fab dark color="primary">
    <v-icon dark>{{type}}</v-icon>
  </v-btn>
</template>

<script>
export default {
name: 'Button',
    data(){
      return{
        type: "mdi-pencil"
      }
    }
};
</script>

<style>
</style>
