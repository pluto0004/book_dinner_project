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
        this.$store.commit("setCurrentUser", user); 
        this.$store.commit("setLogin", true);

      // Get cooker
       const snapshot = await db.collection('users').get()
          snapshot.forEach(async dbUser => {
              if(dbUser.id === user.uid){
                if(await dbUser.data().cooker === true){
                  this.$store.commit("logInAsCooker", true)}

                this.$store.commit("setColor",dbUser.data().color);
              }
          });
      }

  },


  components:{
    Home,
  },

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet');
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
