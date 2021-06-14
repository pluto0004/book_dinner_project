<template>
  <v-app>
     <v-app-bar
    color="green"
    flat
    max-height="15%"
    >
     <TopHeader/>
     
      <router-link to="/login">
          <v-btn
          class="mx-2"
          fab
          dark
          large
          color="light blue">
          <v-icon dark>
            mdi-account
          </v-icon>
        </v-btn>
        Login
      </router-link>
      <router-link to="/register">
        <v-btn
            class="mx-2"
            fab
            dark
            large
            color="light green">
            <v-icon dark>
              mdi-account
            </v-icon>
        </v-btn>
          Register
      </router-link>
      <router-link to="/">
        <v-btn
            class="mx-2"
            fab
            dark
            large
            color="orange">
            <v-icon dark>
              mdi-home
            </v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
     
    <v-main>
    <router-view/> 

    </v-main>
  </v-app>
</template>

<script>
// import Home from './views/Home.vue'
// import Register from './views/Register.vue'
// import Secret from './views/Secret.vue'
import TopHeader from './components/Top-Header.vue'
// import Calender from './components/Calender.vue'
// import CreateReq from './components/CreateReq.vue'


export default {
  name: "App",
  components:{
    // Home,
    // Register,
    // Secret,
    TopHeader,
    // Calender,
    // CreateReq
  },

  data: () => ({
    //
  }),
};
</script>
