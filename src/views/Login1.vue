<template>
  <div class="lcont">
    <!-- <div class="home"></div> -->
    <div class="loginholder">
      <div class="lh">
        <span class="comm">COMM</span>
        <span class="unity">UNITY</span>
      </div>
      <div class="fb">
      <form @submit.prevent="validate">
        <input type="text" placeholder="Username" v-model="username" required v-bind:class="{mierror: usererr}" class="myinput mi" />

        <input type="text" placeholder="Password" v-model="password" required v-bind:class="{mierror: passerr}" class="myinput mi" />
        <button class="mybtn bi" type="submit">Login</button>
        <div v-show="hasError" class="error">
            <span v-if="usererr" class="er">Incorrect username!</span>
            <span v-if="passerr" class="er">Incorrect password!</span>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Login",
  data() {
    return {
        username: "",
        password: "",
        passerr: false,
        usererr: false,
        hasError: false,
    };
  }, methods: {
      validate() {          
          this.usererr = this.username != "rivas";
          this.passerr = this.password != "rivas";
            if (!this.usererr && !this.passerr) {
                this.hasError = false;
            } else {
                this.hasError = true;
            }
          if (!this.passerr && !this.usererr) {
              this.$router.push("/dashboard");
          }
      }
  }
};
</script>
<style>
.lcont {
  height: 100vh;
  text-align: center;
  /* background-image: url("../assets/back.jpg"); */
background-size: cover;
  /* background-image: linear-gradient(to bottom right, white, rgb(199, 222, 247)); */
}
.fb {
  background:white;
  margin:0;
  padding:1px;
}
.loginholder {
  border-radius: 1px;
  display: inline-block;
  /* border: 2px solid #6ec2f3; */
  margin-top: 120px;
  /* background: white; */
}
.mi {
  margin: 27px;
  width: 230px;
}
.error {
  color: rgb(243, 0, 0);
  background: rgb(250, 219, 219);
}
.bi {
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
}
</style>
