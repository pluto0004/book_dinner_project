/* eslint-disable */
<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
         <v-btn color='primary' class="mr-4" dark @click="dialog = true">
            New request
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <!-- Add event dialog -->
      <v-dialog
      v-model="dialog"
      max-width="600px">
        <AddNewReq />
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>


        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon @click="deleteEvent(selectedEvent.id)">mdi-delete</v-icon>
              </v-btn>
              <form v-if="currentlyEditing  !== selectedEvent.id" >
                {{selectedEvent.name}}
              </form>
              <form v-else >
                <textarea-autosize
                v-model="selectedEvent.name"
                type="text"
                style="width:100%"
                :min-height='20'
                placeholder="add menu"
                font-size="8rem"
                font-color="white"
                >
                </textarea-autosize>
              </form>

              <v-spacer></v-spacer>
      
              <v-btn icon>
                <v-icon >mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing  !== selectedEvent.id" >
                {{selectedEvent.comment}}
                <br/>
                -----------------------------
                <br/>
                Requested from {{selectedEvent.userName}}
              </form>
              <form v-else >

                <textarea-autosize
                v-model="selectedEvent.comment"
                type="text"
                style="width:100%"
                :min-height='100'
                placeholder="add comment"
                >
                </textarea-autosize>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Close
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Edit
              </v-btn>
              <v-btn
                text
                v-else
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {db} from '@/main'
import AddNewReq from './AddNewReq'

  export default {
    components:{
      AddNewReq
    },
    data: () => ({
      today: new Date().toISOString().substr(0,10),
      focus: new Date().toISOString().substr(0,10),
      type: 'month',
      typeToLabel:{
          month: 'Month',
          week: 'Week',
          "4day": "4day"
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      name: null,
      comment: null,
      start:null,
      end:null,
      userName:null,
      currentlyEditing: null,
      dialog: false
    }),
    mounted () {
      this.getEvents()
    },
    computed:{

    },
    methods: {
      async getEvents(){
          let snapshot = await db.collection('confirmedReq').get()
          let events = [];
          snapshot.forEach(doc => {
              let appData = doc.data();
              appData.id = doc.id
              events.push(appData)
          })
          this.events = events
      },
      async updateEvent(ev){
        await db.collection('calRequest').doc(this.currentlyEditing).update({
          name:ev.name,
          comment: ev.comment
        })
        this.selectedOpen = false;
        this.currentlyEditing = null
      },
      async deleteEvent(ev){
        await db.collection('confirmedReq').doc(ev).delete();
        this.selectedOpen = false;
        this.getEvents()
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      editEvent(ev){
        this.currentlyEditing = ev.id
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>