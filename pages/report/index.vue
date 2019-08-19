<template>
  <v-container fluid grid-list-md>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.color"
      :timeout="3000"
      top
      right
    >
      {{ snackbar.text }}
    </v-snackbar>
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
            <v-form ref="formReport" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md3>
                  <v-select
                    v-model="filter.line_id"
                    :rules="[rules.required]"
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
                    v-model="filter.shift_id"
                    :rules="[rules.required]"
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
                        v-model="filter.from_date"
                        :rules="[rules.required]"
                        light
                        solo
                        flat
                        readonly
                        placeholder="From Date"
                      />
                    </template>
                    <v-date-picker v-model="filter.from_date" reactive />
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md3>
                  <v-menu>
                    <template slot="activator">
                      <v-text-field
                        v-model="filter.to_date"
                        :rules="[rules.required]"
                        solo
                        flat
                        readonly
                        light
                        placeholder="To Date"
                      />
                    </template>
                    <v-date-picker v-model="filter.to_date" reactive />
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-form>
            <v-layout row wrap justify-center class="mt-5">
              <v-flex xs12 sm6 md3>
                <v-btn
                  block
                  large
                  color="primary"
                  class="text-none"
                  @click="downloadODS()"
                >
                  Download as ODS
                </v-btn>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-btn
                  block
                  large
                  color="primary darken-2"
                  class="text-none"
                  @click="downloadXLSX()"
                >
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
import datetime from '~/mixins/datetime'
import defaultMixins from '~/mixins/default.mixins'
export default {
  middleware: ['auth'],
  mixins: [shift, line, datetime, defaultMixins],
  head() {
    return {
      title: 'Report - Machine Vision'
    }
  },
  data() {
    return {
      valid: true,
      filter: {
        format: null,
        line_id: null,
        shift_id: null,
        from_date: null,
        to_date: null
      }
    }
  },
  created() {
    this.from_date = this.currentDate
    this.to_date = this.currentDate
  },
  methods: {
    downloadODS() {
      if (this.$refs.formReport.validate()) {
        this.filter.format = 'ods'
        this.download()
      } else {
        this.snackbar = {
          status: true,
          color: 'indigo',
          text: 'Filter should be filled'
        }
      }
    },
    downloadXLSX() {
      if (this.$refs.formReport.validate()) {
        this.filter.format = 'xlsx'
        this.download()
      } else {
        this.snackbar = {
          status: true,
          color: 'indigo',
          text: 'Filter should be filled'
        }
      }
    },
    download() {
      this.$axios
        .post(
          process.env.SERVICE_URL + '/report/excel',
          this.filter,
          this.token
        )
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Report.' + this.filter.format)
          document.body.appendChild(link)
          link.click()
        })
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
