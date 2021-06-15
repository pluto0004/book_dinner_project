<template>
  <v-app>
     <Home />
  </v-app>
</template>

<script>
import Home from './views/Home.vue'
import { db } from "@/main";
import firebase from "firebase/app";
import "firebase/auth";


export default {
  name: "App",
  async created() {

			let snapshot = await db.collection("calRequest").get();
			let events = [];
			snapshot.forEach((doc) => {
				let appData = doc.data();
				appData.id = doc.id;
				events.push(appData);
      });
      this.$store.commit("setEventLists", events);


      // Get current user
      const user = await firebase.auth().currentUser;
      if(user !==  null){
        console.log('run!, created', user)
        this.$store.commit("setCurrentUser", user);
        this.$store.commit("setLogin");
      }

  },

  computed:{
  },

  components:{
    Home

  },

};
</script>
