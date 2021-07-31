<template>
    <v-main>
        <v-form @submit.prevent="login">
            <v-container class="ml-2" >
            <v-row class="flex-column justify-start">
                <v-col
                cols="6"
                >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-5 mb-0"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="6"

                >
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="Password"
                    class="mt-0"
                    required
                ></v-text-field>
                </v-col>

            </v-row>
            </v-container>
            <v-btn class="mr-4 mb-2 ml-4"
            @click="login" color='primary'>Login
            </v-btn>
            <br/>
            <p v-if="error" class="red--text">{{error}}</p>
            <span class="ml-2 text-xl-body-2">Need an account? Click <router-link to="/register" @click="registerClicked"> here </router-link> to make an account
            </span> 
        </v-form>
    </v-main>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import {db} from '@/main'


export default {
    components: {
  },
  methods: {
    async login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        
          const currentUser = await firebase.auth().currentUser
          const snapshot = await db.collection('users').get()

          snapshot.forEach(dbUser => {
            if(dbUser.id === currentUser.uid){
                if(dbUser.data().cooker === true){
                  this.$store.commit("logInAsCooker", true);
                }
              }
          });
        
          this.$store.commit("setCurrentUser", currentUser);
          this.$router.replace({ name: "Calendar" });
      } catch (err) {
        this.error = "Invalid Username or Password"
        console.log(err);
      }
    },
    registerClicked(){
        this.$store.commit("setRegister");
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
};
</script>
