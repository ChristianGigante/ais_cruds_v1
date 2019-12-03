<template>
  <v-app  >
    <v-content>
      <!-- <HelloWorld/> -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

//  data() {
//     return {
//       // background: require("./assets/logo.png"),
//     }
//   },
  // mounted() {
  //   axios
  //     .get("https://source.unsplash.com/user/cinquantesix")
  //     .then(res => {
  //       this.background = res.request.responseURL;
  //     })
  // }
};
</script>
