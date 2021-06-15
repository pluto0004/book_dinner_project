<template>
 <v-app>
      <TopHeader/>
        <router-view/>
</v-app>


</template>

<script>
import TopHeader from '../components/Top-Header.vue'
// import Login from '../views/Login.vue'

export default {
  name: "Home",

  components: {
    TopHeader,
    // Login,
    // Calender
  },
  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
};


</script>
