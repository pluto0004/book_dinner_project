<template>
 <v-app>
      <TopHeader/>
    <router-view/>
</v-app>


</template>

<script>
import TopHeader from '../components/Top-Header'

export default {
  name: "Home",

  components: {
    TopHeader,
  },
  computed:{
    user(){
      return this.$store.state.isLoggedIn
    },
  },

};


</script>
