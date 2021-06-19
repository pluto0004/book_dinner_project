<template>
 <v-app >
        <v-card >
          <v-container>
            <v-form @submit.prevent='addEvent'>
              <v-text-field v-model="name" type='text' label='menu (required)'></v-text-field>
              <v-text-field v-model="comment" type='text' label='comment'></v-text-field>
              <v-text-field v-model="start" type='date' label='date'></v-text-field>
              <v-btn type='submit' color='primary' class='mr-4' @click.stop='dialog =false'>
                Send a request
              </v-btn>
            </v-form>
              {{error}}
          </v-container>
        </v-card>
</v-app>


</template>

<script>
import {db} from '@/main'

export default {
     data: () => ({
      name: null,
      comment: null,
      start:null,
      end:null,
      userName:null,
      currentlyEditing: null,
      dialog: false,
      error:'',
    }),

  methods: {
      async addEvent(){
        try{
          if(this.name && this.start){
            console.log(this.$store.state.userName)
            await db.collection('calRequest').add({
              name:this.name,
              comment:this.comment,
              start:this.start,
              end:this.start,
              userName:this.$store.state.currentUser.displayName,
              color: this.$store.state.userColor,
            })
          }else{
              this.error = 'Please fill the menu and the date'
              return
          }
        }catch(error){
          console.log(error)
        }
        this.$emit('dialog', this.dialog)
        this.$emit('close')
        this.getEvents()
        this.name=""
        this.comment=""
        this.start=""

    }, 
    async getEvents(){
          let snapshot = await db.collection('calRequest').get()
          let events = [];
          snapshot.forEach(doc => {
              let appData = doc.data();
              appData.id = doc.id
              events.push(appData)
          })
          this.events = events
      },

}
}


</script>
