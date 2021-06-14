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
        <input type="date" v-model="date" placeholder="date" />
      </div>
      <button type="submit">Send</button>
    </form>
  </v-container>
</template>

<script>
// import createReq from '../main.js'
export default {
  name: "CreateReq",
  data(){
      return {
          menu:"",
          comment:'',
          data:''
      }
  },

  methods:{
    
  }

}
</script>
