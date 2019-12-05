<template>
  <v-app id="inspire"
    :style="`background :linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${background})`"
  >
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>My Inventory</v-toolbar-title>
                <v-spacer />
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip> -->
                <!-- <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip> -->
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="validate">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    autofocus
                    required
                    v-bind:class="{mierror: usererr}" class="myinput mi"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="text"
                    v-model="password"
                    required 
                    v-bind:class="{mierror: passerr}" class="myinput mi"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit" href="dashboard">Login</v-btn>
              </v-card-actions>
              <div v-show="hasError" class="error">
            <span v-if="usererr" class="er">Incorrect username!</span>
            <span v-if="passerr" class="er">Incorrect password!</span>
        </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
//   export default {
//     props: {
//       source: String,
//     },
//   }
// </script>

// <script lang="ts">
import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
        background: require("../assets/bg.jpg"),
        username: "",
        password: "",
        passerr: false,
        usererr: false,
        hasError: false,
    };
  },
  created() {
        axios
      .get("https://source.unsplash.com/user/pankajpatel")
      .then(res => {
        this.background = res.request.responseURL;
      })
  },
   methods: {
      validate() {
          
          this.usererr = this.username != "chan";
          this.passerr = this.password != "chan";
            if (!this.usererr && !this.passerr) {
                this.hasError = false;
            } else {
                this.hasError = true;
            }
          if (!this.passerr && !this.usererr) {
              this.$router.push("/dashboard");
          }
      },
      
  }
};
</script>
<style scoped>

/* .lcont { */
  /* height: 100vh; */
  /* text-align: center; */
  /* background-image: url("../assets/back.jpg"); */
/* background-size: cover; */
  /* background-image: linear-gradient(to bottom right, white, rgb(199, 222, 247)); */
/* } */
/* .fb {
  background:white;
  margin:0;
  padding:1px;
} */
/* .loginholder { */
  /* border-radius: 1px; */
  /* display: inline-block; */
  /* border: 2px solid #6ec2f3; */
  /* margin-top: 120px; */
  /* background: white; */
/* } */
/* .mi {
  margin: 27px;
  width: 230px;
} */
.error {
  color: rgb(243, 0, 0);
  background: rgb(250, 219, 219);
}
/* .bi {
  margin-top: 0px !important;
  margin-bottom: 27px !important;
  display: inline-block;
}
.lh {
  background:rgba(198, 226, 248, 0.7);
  padding: 15px;
  margin:0;
}
.er {
    display:block;
    /* margin: 5px; */
/* } */ 
</style>
