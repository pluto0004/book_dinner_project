<template>
  <div>
    <v-app-bar>
      <!-- Home -->
      <v-btn icon>
          <router-link to="/home">
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
     
             <!-- Register -->
        <v-btn v-if="$store.state.currentUser.uid.length === 0"  icon>
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
      
       <!-- Login -->
        <v-btn v-if="$store.state.currentUser.uid.length === 0"  icon>
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

      <!-- List -->
        <v-btn v-if="$store.state.currentUser.uid.length"  icon>
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
        <v-btn v-if="$store.state.currentUser.uid.length" icon>
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
        <v-btn v-if="$store.state.currentUser" icon>
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

        <p class="text-center text-align ml-3 mt-4" v-if="!$store.state.currentUser">
         Please login / register
        </p>
        <p class="text-center text-align ml-3 mt-4" v-else>
         You are signed in as <b>{{$store.state.currentUser.email}}</b>
        </p>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => this.$store.state.isloggedIn = !!user)
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        if(this.$store.state.currentUser){
        this.$store.commit("setCurrentUser", '');
        }
        this.$router.replace({name:"Login"})
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
