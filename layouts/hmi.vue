<template>
  <v-app>
    <v-toolbar app flat class="transparent pt-3">
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
        class="ml-5 select-line"
        :items="lines"
        item-text="text"
        item-value="value"
        label="Line"
        solo
      />
      <v-btn large round color="yellow" class="ml-5">
        <span class="title font-weight-regular">rework</span>
      </v-btn>
      <v-spacer />
      <v-btn icon flat class="transparent" color="red">
        <v-icon size="40">
          mdi-export
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-content> <nuxt /> </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      lines: [{ value: 34, text: 'Line 34' }, { value: 36, text: 'Line 36' }]
    }
  }
}
</script>
