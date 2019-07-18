<template>
  <v-container grid-list-md fill-height fluid>
    <v-toolbar app flat class="transparent pt-3 px-3">
      <v-btn color="primary" large class="pl-0 round-right notcapital">
        <v-icon right dark size="30">
          mdi-account
        </v-icon>
        <span class="title font-weight-bold ml-3">Operator</span>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        HMI A
      </v-toolbar-title>
      <v-select
        v-model="lineSelected"
        class="ml-5 select-line title font-weight-regular"
        :items="lines"
        item-text="text"
        item-value="value"
        solo
      />
      <v-btn large round color="yellow" class="ml-5">
        <span class="title font-weight-regular">rework</span>
      </v-btn>
      <v-spacer />
      <v-btn icon large flat class="transparent" color="red">
        <v-icon size="40">
          mdi-export
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card class="card-rounded mx-3">
          <v-card-text class="pa-0 ma-0">
            <v-toolbar flat dark color="primary" class="round-top px-3">
              <v-icon>clear</v-icon>
            </v-toolbar>
          </v-card-text>
          <v-card-text class="px-5">
            <span>text</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  layout: 'hmi',
  data() {
    return {
      lines: [{ value: 34, text: 'Line 34' }, { value: 36, text: 'Line 36' }],
      lineSelected: 36
    }
  }
}
</script>
