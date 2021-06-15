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
                event.name
            <v-list-item-content>
                <div class="text-overline mb-4">
                event.name
                </div>
                <v-list-item-title class="text-h5 mb-1">
                Headline 5
                </v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ></v-list-item-avatar>
            </v-list-item>

        <!-- 
            <v-card-actions>
            <v-btn
                outlined
                rounded
                text
            >
                Button
            </v-btn>
            </v-card-actions> -->
        </v-card>
    </div>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/auth";
// import { db } from "@/main";
import AddNewReq from '../components/AddNewReq'


  export default {
      components:{
          AddNewReq
      },
    data: () => ({
      dialog: false


    }),
    
  }
</script>