<template>
  <section>
    <h1 class="text-center mt-5 ">UCHI食 <img src="../../public/icon.png" alt="icon" width="25rem" align="center"></h1>
          <v-main>
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
                      <div class="text-center pa-4">
                          <div class="my-4" v-if="user === true">
                              <router-link to="/reqlist"><v-btn rounded width="80%" color="primary">Check all requests </v-btn></router-link> 
                          </div>
                          <div class="my-4" v-if="user === false">
                            <router-link to="/login"><v-btn rounded width="80%" color="primary">Login</v-btn></router-link> 
                          </div>
                          <div class="my-4" v-if="user === true">
                            <v-btn @click="signOut" rounded width="80%" color="primary">Logout</v-btn>
                          </div>
                          <div class="my-4">
                              <router-link to="/register"><v-btn rounded width="80%" color="primary">Register</v-btn></router-link> 
                          </div>
                          <div class="my-4" v-if="user === true">
                            <v-btn @click="addAdmin" rounded width="80%" color="primary">Admin</v-btn>
                          </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
            </v-main>
        </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import {func} from "../main.js"

export default {
  name: "About",

  
  computed:{
    user(){
      console.log(this.$store.state.isLoggedIn, 'computed')
      return this.$store.state.isLoggedIn
    },
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        if(this.$store.state.currentUser){
        this.$store.commit("setCurrentUser", '');
        }
        this.$router.replace({name:"About"})
      } catch (err) {
        console.log(err);
      }
    },
    addAdmin(){
        // admin check
          const addAdminRole= func.httpsCallable('addAdminRole');
          addAdminRole({
            email: this.$store.state.currentUser.email
          }).then(result => console.log(result))
        
    }
  },

}
</script>
