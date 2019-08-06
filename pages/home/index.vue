<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card color="blue darken-3" dark>
          <v-card-title>
            <span class="title">OEE</span>
          </v-card-title>
          <v-card-text>
            <span>Detail</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card color="green darken-3" dark>
          <v-card-title>
            <span class="title">Performance Rate</span>
          </v-card-title>
          <v-card-text>
            <span>Detail</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-card color="success" dark height="75vh">
          <v-card-title>
            <span class="title">Quality Product Rate</span>
          </v-card-title>
          <v-card-text>
            <span>Detail</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style>
#map {
  height: 60vh !important;
}
</style>
