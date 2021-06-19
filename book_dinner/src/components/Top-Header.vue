<template>
  <div>
    <v-app-bar>
      <!-- Home -->
      <v-btn icon>
          <router-link to="/about">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="#9C00BF">
                <v-icon dark>
                  mdi-home
                </v-icon>
            </v-btn>
          </router-link>
        </v-btn>

        <!-- Login -->
        <v-btn icon v-if="user === false">
          <router-link to="/login">
            <v-btn
            class="mx-2"
            fab
            dark
            small
            color="light blue">
            <v-icon dark>
              mdi-login
            </v-icon>
          </v-btn>
        </router-link>
        </v-btn>
     
        <!-- Register -->
        <v-btn icon v-if="user === false">
          <router-link to="/register">
          <v-btn
              class="mx-2"
              fab
              dark
              small
              color="light green">
              <v-icon dark>
                mdi-account-multiple-plus
              </v-icon>
          </v-btn>
        </router-link>
        </v-btn>
      


      <!-- List -->
        <v-btn  icon v-if="user === true">
          <router-link to="/reqlist">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="orange">
                <v-icon dark>
                  mdi-format-list-bulleted
                </v-icon>
            </v-btn>
          </router-link>
        </v-btn>

       <!-- Calendar -->
        <v-btn icon v-if="user === true">
          <router-link to="/calendar">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="#00BF9C">
                <v-icon dark>
                  mdi-calendar
                </v-icon>
            </v-btn>
          </router-link>
        </v-btn>

        <!-- Sign out -->
        <v-btn icon v-if="user === true">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="signOut">
                <v-icon dark>
                  mdi-exit-to-app
                </v-icon>
            </v-btn>
        </v-btn> 

        <p class="text-center text-align ml-3 mt-4" v-if="user === true">
         Welcome <b>{{userStatus.displayName}} !</b>
        </p>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Firebase from "../main.js"

export default {
   created() {
    Firebase.onAuth()
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  computed:{
    user(){
      return this.$store.state.isLoggedIn
    },
    userStatus(){
      return this.$store.state.currentUser
    },
    userName(){
      return this.$store.state.userName
    }
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        if(this.$store.state.isLoggedIn){
        this.$store.commit("setLogin", false);
        this.$store.commit("setCurrentUser", {});
        this.$store.commit("setUserName", "");
        this.$store.commit("setUserEmail", "");
        this.$store.commit("setColor", "green");
        this.$store.commit("setColor", false);
        }
        this.$router.replace({name:"App"})
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
