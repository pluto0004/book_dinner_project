<template>
    <div>
      <v-btn color='primary' class="mr-4" dark @click="dialog = true">
            New request
      </v-btn>
      <v-dialog
      v-model="dialog"
      max-width="600px">
        <AddNewReq />
      </v-dialog>
      
      <v-row class="mt-4">
        <v-col class="flex-direction: row">
          <v-card
              class="mt-4 ml-2"
              width="300"
              outlined
              v-for="event in $store.state.eventLists" :key='event.id'
              @click="acceptClicked(event)"
              
          >
              <v-list-item two-line >
                  <v-list-item-content width="100%">
                      <div class="text-overline mb-4" >
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
              >
                  Accept
              </v-btn>
              <v-btn icon>
                <v-icon @click="deleteEvent(event.id)">mdi-delete</v-icon>
              </v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
      dialog: false,
      selectedEvent: {},


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
      async acceptClicked(event){
           try{
            await db.collection('confirmedReq').add({
              name: event.name,
              comment: event.comment,
              start: event.start,
              end: event.start,
              color: 'black'
            })
            await this.deleteEvent(event.id)
        }catch(error){
          console.log(error)
        }
      },
      async deleteEvent(event){
        console.log(event)
        await db.collection('calRequest').doc(event).delete();
        this.getEvents()
      },
 
    }
    
  }
</script>