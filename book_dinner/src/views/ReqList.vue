<template>
    <div>
      <v-row align="center" justify="center" class="mt-4" >
        <v-btn 
        large
        color='primary' 
        class="mr-4 mt-4" 
        dark 
        @click="dialog = true">
              New request
        </v-btn>
        <v-dialog
        v-model="dialog"
        max-width="600px"        
        >
          <AddNewReq @dialog='dialog = $event' @close='getEvents'/>
        </v-dialog>
      </v-row>
      <v-row class="mt-4 ml-4">
        <v-col class="flex-direction: row">
          <v-card
              class="mt-4 ml-2"
              width="300"
              outlined
              v-for="event in $store.state.eventLists" :key='event.id'
              >
              <v-list-item two-line >
                  <v-list-item-content width="100%">
                      <div class="text-overline mb-4" >
                      Menu                </div>
                      <v-list-item-title class="text-h5 mb-1">
                       <form v-if="currentlyEditing  !== event.id" >
                          {{event.name}}
                       </form>
                       <form v-else>
                        <textarea-autosize
                          v-model="event.name"
                          type="text"
                          style="width:100%"
                          :min-height='30'
                          placeholder="add comment">
                        {{event.name}}
                        </textarea-autosize>
                      </form>
                      </v-list-item-title>
                      <br />
                      <v-list-item-subtitle>
                       <form v-if="currentlyEditing  !== event.id" >
                          {{event.comment}}
                       </form>
                       <form v-else>
                        <textarea-autosize
                          v-model="event.comment"
                          type="text"
                          style="width:100%"
                          :min-height='100'
                          placeholder="add comment">
                          {{event.comment}}
                        </textarea-autosize>
                      </form>
                          <br />
                          Date: {{event.start}}
                          <br />
                          Request from {{event.userName}}
                      </v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>        
              <v-card-actions>
              <v-btn
                  outlined
                  rounded
                  text
                  v-if="cookerStatus === true"
                  @click.prevent="acceptClicked(event)"

              >
                  Accept
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== event.id"
                @click.prevent="editEvent(event)"
              >
                Edit
              </v-btn>
              <v-btn
                text
                v-else
                @click.prevent="updateEvent(event)"
              >
                Save
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

import { db } from "@/main";
import AddNewReq from '../components/AddNewReq'
import Firebase from "../main.js"

  export default {
      components:{
          AddNewReq
      },
    data: () => ({
      dialog: false,
      selectedEvent: {},
      currentlyEditing:null
    }),
    async created(){
      this.getEvents()
      await Firebase.onAuth()
    },
    computed:{
      user(){
        return this.$store.state.isLoggedIn
      },
      cookerStatus(){
        return this.$store.state.isCooker
      }
  },
    methods:{
        async getEvents(){
          let snapshot = await db.collection('calRequest').get()
          let events = [];
          snapshot.forEach(doc => {
              let appData = doc.data();
              appData.id = doc.id
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
              color: event.color,
              userName: event.userName
            })
            await this.deleteEvent(event.id)
        }catch(error){
          console.log(error)
        }
      },
      async deleteEvent(event){
        await db.collection('calRequest').doc(event).delete();
        this.getEvents()
      },
      editEvent(event){
        this.currentlyEditing = event.id
      },
      async updateEvent(event){
        await db.collection('calRequest').doc(this.currentlyEditing).update({
          name:event.name,
          comment: event.comment
        })
        this.selectedOpen = false;
        this.currentlyEditing = null
      },
 
    }
    
  }
</script>