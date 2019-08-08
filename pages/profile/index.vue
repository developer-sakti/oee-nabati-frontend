<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <v-card class="py-3">
          <v-card-text>
            <v-layout column align-center justify-center>
              <v-flex>
                <v-avatar size="100" color="green lighten-2">
                  <span class="display-2 white--text">B</span>
                </v-avatar>
              </v-flex>
              <v-flex>
                <span class="headline">Bahrul Amaruddin</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="justify-center pb-5">
            <v-btn
              :color="profileWindow == 0 ? 'primary lighten-2' : ''"
              @click="profileWindow = 0"
            >
              Account Details
            </v-btn>
            <v-btn
              :color="profileWindow == 1 ? 'primary lighten-2' : ''"
              @click="profileWindow = 1"
            >
              Change Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title class="headline primary white--text">
            Account Details
          </v-card-title>
          <v-window v-model="profileWindow">
            <v-window-item :value="0">
              <v-card-text>
                <v-text-field label="Username" readonly clearable />
                <v-text-field label="First Name" />
                <v-text-field label="Last Name" />
                <v-text-field label="Role" readonly />
                <v-text-field label="Status" readonly />
              </v-card-text>
            </v-window-item>
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field label="Old Password" />
                <v-text-field label="New Password" />
                <v-text-field label="Confirm Password" />
              </v-card-text>
            </v-window-item>
          </v-window>
          <v-card-actions class="pa-3">
            <v-spacer />
            <v-btn class="primary">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      profileWindow: 0
    }
  }
}
</script>
