<template>
  <v-container fluid fill-height class="pa-0 white-background">
    <v-layout row wrap fill-height>
      <v-flex md4 fill-height class="blue-background" text-xs-center>
        <v-container fill-height>
          <v-layout row wrap align-center justify-center fill-height>
            <v-flex text-xs-center class="white--text">
              <span class="display-2 font-weight-bold">Selamat Datang</span>
              <v-flex text-xs-center class="white--text">
                <!-- <span class="subheading">
                  Silahkan login untuk melihat data
                </!-->
              </v-flex>
              <v-img src="/process.png" class="mt-5" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 sm12 md8 fill-height>
        <v-container fill-height class="pa-5">
          <v-layout
            row
            wrap
            align-center
            justify-center
            fill-height
            class="pa-5"
          >
            <v-flex text-xs-center class="blue-text pa-5">
              <span class="display-1 font-weight-bold">
                OEE Nabati
              </span>
              <v-layout row wrap class=" mt-5 px-5">
                <v-flex md12>
                  <v-text-field
                    solo
                    flat
                    class="mx-5"
                    placeholder="Email"
                    prepend-inner-icon="mdi-email"
                  />
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    solo
                    flat
                    type="password"
                    class="mx-5"
                    placeholder="Password"
                    prepend-inner-icon="mdi-lock"
                  />
                </v-flex>
                <v-flex md12 class="px-5">
                  <v-btn block large color="primary">
                    <span class="text-none title">Login</span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  layout: "none",
  data() {
    return {};
  }
};
</script>
<style>
.blue-background {
  background: #4fc3f7 !important;
}
.white-background {
  background: #ffffff !important;
}
.blue-text {
  color: #4fc3f7 !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  background: #e0e0e0;
}
</style>
