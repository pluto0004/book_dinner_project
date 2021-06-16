<template>
  <section>
    <h1 class="text-center mt-5">UCHI食 🍙</h1>
          <v-main>
                <v-container
                  class="fill-height"
                  fluid
                >
                  <v-row
                    align="center"
                    justify="center"
                  >
                    <v-col
                      cols="12"
                      sm="8"
                      md="4"
                    >
                      <div class="text-center pa-4">
                          <div class="my-4" v-if="user === true">
                              <v-btn rounded width="80%" color="primary">Check all requests <router-link to="/reqlist"/> </v-btn>
                          </div>
                          <div class="my-4">
                              <v-btn href="/login" rounded width="80%" color="primary">Login</v-btn>
                          </div>
                          <div class="my-4">
                              <v-btn href="/register" rounded width="80%" color="primary">Register</v-btn>
                          </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
            </v-main>
        </section>
</template>

<script>

export default {
  name: "About",

  
  computed:{
    user(){
      console.log(this.$store.state.isLoggedIn, 'computed')
      return this.$store.state.isLoggedIn
    },
  },

}
</script>
