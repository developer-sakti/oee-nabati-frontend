<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm8 md6>
            <v-card class="elevation-5 px-5 pt-3">
              <v-card-text>
                <div class="layout column align-center mb-3">
                  <v-responsive>
                    <v-img src="/process.png" width="180" height="80" />
                  </v-responsive>
                  <span
                    class="flex my-4 primary--text display-2 font-weight-bold hidden-sm-and-down"
                  >
                    OEE Nabati
                  </span>
                  <span
                    class="flex my-4 primary--text headline font-weight-bold idden-md-and-up"
                  >
                    OEE Nabati
                  </span>
                </div>
                <form @submit.prevent="login">
                  <v-text-field
                    prepend-inner-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    solo
                    flat
                    required
                  />
                  <v-text-field
                    id="password"
                    prepend-inner-icon="lock"
                    solo
                    flat
                    name="password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 class="pb-3">
                      <v-btn block color="primary" type="submit" large>
                        Login
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'none'
}
</script>
<style>
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  background: #e0e0e0 !important;
}
</style>
