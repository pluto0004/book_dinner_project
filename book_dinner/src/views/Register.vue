<template>
  <div>
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="register">
      Register
      <div class="isCooker">
        <span>Are you a cooker?</span>
        <input type="radio" v-model="cooker" name="cooker" id="1" value="Yes"  />
          <label for="1">Yes</label>
        <input type="radio" v-model="cooker" name="cooker" id="2" value="No"/>
          <label for="2">No</label>

      </div>
      <div class="userName">
        <input type="text" v-model="userName" placeholder="user name" required/>
      </div>
      <div class="email">
        <input type="email" v-model="email" placeholder="email" required/>
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" required/>
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "@/main";


export default {
  methods: {
    async register() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        
        
        await db.collection('users').doc(user.uid).set({
            name: this.userName,
            cooker: Boolean(this.cooker)
        })

        this.$router.replace({ name: "Calender" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      userName:'',
      cooker: false,
      error: "",
    };
  },
};
</script>
