<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 lg6>
            <v-card class="elevation-5 px-5 pt-3">
              <v-card-text>
                <div class="layout column align-center">
                  <v-img src="/process.png" width="180" height="80" />
                  <h1 class="flex my-4 primary--text">
                    OEE Nabati
                  </h1>
                </div>
                <!-- <v-layout v-if="error.status">
                  <v-flex xs12 md12>
                    <alert
                      :text="error.message"
                      type="error"
                      @dismissed="onDismissed"
                    />
                  </v-flex>
                </v-layout> -->
                <form @submit.prevent="login">
                  <v-text-field
                    append-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    required
                  />
                  <v-text-field
                    id="password"
                    append-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12>
                      <v-btn block color="primary" type="submit">
                        Login
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="text-xs-center">
                      <span class="subheading">Belum punya akun ?</span>
                      <v-btn
                        flat
                        class="text-none"
                        color="primary"
                        to="/register"
                      >
                        Daftar disini
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
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
