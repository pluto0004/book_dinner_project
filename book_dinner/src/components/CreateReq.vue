<template>
  <v-container>
       <form @submit.prevent="request">
      <div class="menu">
        <input type="menu" v-model="menu" placeholder="menu" />
      </div>
      <div class="comment">
        <input type="comment" v-model="comment" placeholder="comment" />
      </div>
      <div class="date">
        <input type="date" v-model="start" placeholder="date" />
      </div>
      <button type="submit">Send</button>
    </form>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "@/main";

export default {
  name: "CreateReq",
  data(){
      return {
          menu:"",
          comment:'',
          start:null,
          end:null
      }
  },

  methods:{
    async request(){
        const user = firebase.auth().currentUser
        
        let color;
        const dbUsers =  await db.collection('users')

        dbUsers.forEach(dbUser => {
            console.log(dbUser, "aaaaaaaa")
            if(dbUser.id === user.uid) color = dbUser.color
        })
        
        await db.collection('calRequest').doc("test1").set({
          menu:this.menu,
          name: 'aaa',
          comment:this.comment,
          start:this.start,
          end:this.start,
          userName: user.email,
          color:color
        })
    }
  }

}
</script>
