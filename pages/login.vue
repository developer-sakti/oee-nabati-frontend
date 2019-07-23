<template>
  <v-container fluid fill-height class="pa-0">
    <v-layout row wrap fill-height>
      <v-flex xs12 sm12 md4 fill-height>
        <span>a</span>
      </v-flex>
      <v-flex xs12 sm12 md8 fill-height>
        <span>b</span>
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
