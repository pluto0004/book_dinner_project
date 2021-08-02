<template>

<v-app id="inspire">
  <v-responsive min-width="300">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-start justify-center >
               <v-flex xs8 sm8 md5 lg3>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              v-model="name"
                              :rules="nameRules"
                              :counter="10"
                              label="User Name"
                              required
                           ></v-text-field>
                           <v-text-field
                              v-model="email"
                              type='email'
                              label="E-mail"
                              required  
                           ></v-text-field>
                           <v-text-field
                              v-model="password"
                              label="Password"
                              type="Password"
                              required
                           ></v-text-field>
                           <p
                              class="mt-2 font-weight-bold text-h6"
                            >Pick your color !</p>

                              <v-row justify="space-around">
                                <v-color-picker
                                v-model="color"
                                required
                                class="ma-2"
                                hide-canvas
                                >
                                </v-color-picker>

                              </v-row>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn class="mr-4 mb-2"
                              @click="register" color="primary">Submit
                            </v-btn>
                     </v-card-actions>
                     <p v-if="error" class="red--text">{{error}}</p>
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
import { db } from "@/main";



export default {
  created(){
     this.$store.dispatch('onAuth')
    },
  methods: {
    async register() {
      try {
        if(!this.name || !this.password || !this.email){
            this.error = 'Please fill the form'
            return
        }

        // save in the firestore
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( cred =>
        {
           cred.user.updateProfile({
            displayName: this.name
          })
          return  db.collection('users').doc(cred.user.uid).set({
            name: this.name,
            cooker: this.cooker === 'true' ? true:false,
            color: this.color,
        })
        })

        if(this.cooker === 'true'){
          this.$store.commit("logInAsCooker", true)
        }

        this.$store.dispatch('onAuth')
        this.$router.push('/')

      } catch (err) {
        console.log(err);
      }
    },
    clear () {
        this.name = ''
        this.email = ''
        this.password = null
        this.cooker = false
      },
  },
  data() {
    return {
      isDisabled: true,
      valid:false,
      email: "",
      password: "",
      name:'',
      cooker: false,
      error: "",
      color:'',
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
