<template>
    <v-main>
        <v-form @submit.prevent="login">
            <v-container>
            <v-row>
                <v-col
                cols="5"
                md="4"
                >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="5"
                md="4"
                >
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="Password"
                    required
                ></v-text-field>
                </v-col>

            </v-row>
            </v-container>
            <v-btn class="mr-4 mb-2"
            @click="login">Login
            </v-btn>
            Need an account? Click <router-link to="/register" @click="registerClicked"> here </router-link> to make an account
            <p v-if="error">{{this.error}}</p>
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
              console.log(dbUser.id, currentUser.uid, 'this')
              if(dbUser.id === currentUser.uid){
                this.$store.commit("logInAsCooker");
              }
          });
        
          this.$store.commit("setCurrentUser", currentUser);
          this.$router.replace({ name: "Calendar" });
      } catch (err) {
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
