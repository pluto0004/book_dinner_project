<template>
    <div>
      <v-btn color='primary' class="mr-4" dark @click="dialog = true">
            New request
      </v-btn>
      <v-dialog v-model="dialog" max-height=500>
        <AddNewReq />
      </v-dialog>

        <v-card
            class="mx-auto mt-4"
            max-width="344"
            outlined
            v-for="event in $store.state.eventLists" :key='event.id'
        >
        
            <v-list-item two-line >
                <v-list-item-content>
                    <div class="text-overline mb-4">
                    Menu                </div>
                    <v-list-item-title class="text-h5 mb-1">
                    {{event.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        
                        {{event.comment}}
                        <br />
                        <br />
                        Date: {{event.start}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>        
            <v-card-actions>
            <v-btn
                outlined
                rounded
                text
                v-if="$store.state.isCooker===true"
                @click="acceptClicked"
            >
                Accept
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/auth";
import { db } from "@/main";
import AddNewReq from '../components/AddNewReq'


  export default {
      components:{
          AddNewReq
      },
    data: () => ({
      dialog: false


    }),
    methods:{
        async getEvents(){
          let snapshot = await db.collection('calRequest').get()
          let events = [];
          snapshot.forEach(doc => {
              let appData = doc.data();
              appData.id = doc.id
              console.log(appData)
              events.push(appData)
          })
         this.$store.commit("setEventLists", events);

      },
      async acceptClicked(){
          
      }
    }
    
  }
</script>