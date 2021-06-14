<template>
  <div>
    Log in
    <form @submit.prevent="login">
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Login</button>
    </form>

    <div class="error" v-if="error">{{ error.message }}</div>
    <span
      >Need an account? Click here to <router-link to="/register" /> make an
      account</span
    >
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async login() {
      try {
        const login = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(login);
        this.$router.replace({ name: "Secret" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
};
</script>
