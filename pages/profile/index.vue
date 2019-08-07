<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <v-card>
          <v-card-text>
            <v-layout column align-center justify-center>
              <v-flex>
                <v-avatar size="100" color="primary lighten-4">
                  <span class="display-2 white--text">B</span>
                </v-avatar>
              </v-flex>
              <v-flex>
                <span class="headline">Bahrul Amaruddin</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="justify-center pb-5">
            <v-btn>Account Details</v-btn>
            <v-btn>Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title class="headline primary lighten-3 white--text">
            Account Details
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
