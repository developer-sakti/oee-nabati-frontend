<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <span class="display-1 font-weight-bold orange--text">Report</span>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title class="headline grey darken-1 white--text">
            Filter
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md3>
                <v-select
                  v-model="lineFilterId"
                  label="Line"
                  solo
                  dark
                  background-color="primary darken-1"
                  :items="line"
                  item-text="name"
                  item-value="id"
                />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  v-model="shiftFilterId"
                  label="Shift"
                  solo
                  dark
                  background-color="primary lighten-1"
                  :items="shift"
                  item-text="shift_name"
                  item-value="id"
                />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-menu>
                  <template slot="activator">
                    <v-text-field
                      v-model="fromdate"
                      light
                      solo
                      flat
                      readonly
                      placeholder="From Date"
                    />
                  </template>
                  <v-date-picker v-model="fromdate" reactive />
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-menu>
                  <template slot="activator">
                    <v-text-field
                      v-model="todate"
                      solo
                      flat
                      readonly
                      light
                      placeholder="To Date"
                    />
                  </template>
                  <v-date-picker v-model="todate" reactive />
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center class="mt-5">
              <v-flex xs12 sm6 md3>
                <v-btn block large color="primary" class="text-none">
                  Download as ODS
                </v-btn>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-btn block large color="primary darken-2" class="text-none">
                  Download as XLSX
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import shift from '~/mixins/shift.select'
import line from '~/mixins/line.select'
export default {
  // middleware: ['auth'],
  mixins: [shift, line],
  head() {
    return {
      title: 'Report - Machine Vision'
    }
  },
  data() {
    return {
      lineFilterId: null,
      shiftFilterId: null,
      fromdate: null,
      todate: null
    }
  }
}
</script>
<style>
.v-input__slot {
  margin-bottom: 0px !important;
}
.v-menu--inline {
  display: inline-block;
  width: 100% !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  border: 2px solid #bdbdbd !important;
}
.v-input__control .v-input__slot {
  margin: 0px !important;
}
</style>
