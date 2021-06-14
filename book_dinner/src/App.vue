<template>
  <v-app>
     <v-app-bar
    color="green"
    flat
    max-height="15%"
    >
     <TopHeader/>
    </v-app-bar>

    <v-content>
     <Calender/>
      This will be the contents
      <CreateReq/>
    </v-content>
  </v-app>
</template>

<script>
// import Home from './views/Home.vue'
// import Register from './views/Register.vue'
// import Secret from './views/Secret.vue'
import TopHeader from './components/Top-Header.vue'
import Calender from './components/Calender.vue'
import CreateReq from './components/CreateReq.vue'


export default {
  name: "App",
  components:{
    // Home,
    // Register,
    // Secret,
    TopHeader,
    Calender,
    CreateReq
  },

  data: () => ({
    //
  }),
};
</script>
