<template>
  <v-form v-model="valid" @submit.prevent="register">
    <v-container class="ml-2" >
      <v-row >
        <v-col
          cols="6"
          md="4"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="User Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="6"
          md="4"
        >
          <v-text-field
            v-model="email"
            type='email'
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="6"
          md="4"
        >
          <v-text-field
            v-model="password"
            label="Password"
            type="Password"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="6"
          md="4"
        >
           <v-text-field
            label="Pick your color"
          ></v-text-field>
          <v-color-picker
            v-model="color"
            required
            class="ma-2"
            hide-inputs
            hide-canvas
          ></v-color-picker>
        </v-col>
        <br/>
        <v-col
          cols="12"
          md="4"
        >
         <v-radio-group
            v-model="cooker"
            mandatory            
            >
            <v-radio
                label="I register as a cooker"
                id="true"
                value="true"
            ></v-radio>
            <v-radio
                label="I register as an eater"
                id="false"
                value="false"
            ></v-radio>
            </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-btn class="mr-4 mb-2"
      @click="register">Submit
    </v-btn>
    <p v-if="error">{{this.error}}</p>
  </v-form>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "@/main";
import Firebase from "../main.js"



export default {
  methods: {
    async register() {
      try {
        if(!this.name || !this.password || !this.email){
            this.error = 'Please fill the form'
            return
        }
        this.error = ''
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( cred =>
        {
           cred.user.updateProfile({
            displayName: this.name
          })
          return  db.collection('users').doc(cred.user.uid).set({
            name: this.name,
            cooker: this.cooker,
            color: this.color,
        })
        })

        if(this.cooker === "true") this.cooker = true;
        if(this.cooker === "false") this.cooker = false;
        this.$store.commit("setUserName", this.name);
        Firebase.onAuth()


        this.$router.replace({ name: "App" });
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
  computed: {

    },
};
</script>
