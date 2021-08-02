<template>
  <v-app id="inspire">
    <v-responsive min-width="300">

      <v-content>
         <v-container fluid fill-height>
            <v-layout align-start justify-center>
               <v-flex xs8 sm8 md5 lg3>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              name="email"
                              label="email"
                              type="text"
                              v-model="email"
                              :rules="emailRules"
                              required
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password"
                              required
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                     </v-card-actions>

                     <p v-if="error" class="red--text">{{error}}</p>
                     <span class="ml-2 text-xl-body-4">Need an account? Click <router-link to="/register" @click="registerClicked"> here </router-link> to make an account
                     </span> 

               </v-flex>
               
            </v-layout>
         </v-container>
      </v-content>
     </v-responsive>
   </v-app>
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
