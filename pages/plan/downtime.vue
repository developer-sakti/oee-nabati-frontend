<template>
  <v-container fluid grid-list-md>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.color"
      :timeout="3000"
      bottom
      left
    >
      {{ snackbar.text }}
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card>
            <v-card-title class="primary" dark>
              <span class="headline white--text">Form Input</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md6>
                    <v-select
                      v-model="lineListSelectedId"
                      label="Line"
                      solo
                      light
                      flat
                      :items="line"
                      item-text="name"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-select
                      v-model="machineSelectedId"
                      label="Machine"
                      solo
                      light
                      flat
                      :items="machines"
                      item-text="name"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-menu>
                      <template slot="activator">
                        <v-text-field
                          solo
                          light
                          readonly
                          flat
                          placeholder="Tanggal"
                        />
                      </template>
                      <v-date-picker reactive />
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-select
                      label="Shift"
                      solo
                      light
                      flat
                      :items="shift"
                      item-text="shift_name"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-select
                      label="Reason"
                      solo
                      light
                      flat
                      :items="reasons"
                      item-text="reason"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <v-menu
                      ref="duration"
                      v-model="durationMenu"
                      full-width
                      :close-on-content-click="false"
                      :return-value.sync="downtimeDuration"
                    >
                      <template slot="activator">
                        <v-text-field
                          v-model="downtimeDuration"
                          solo
                          flat
                          light
                          readonly
                          placeholder="--:--:--"
                        />
                      </template>
                      <v-time-picker
                        v-if="durationMenu"
                        v-model="downtimeDuration"
                        format="24hr"
                        use-seconds
                        reactive
                        @click:second="$refs.duration.save(downtimeDuration)"
                      />
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="orange darken-2" dark @click="resetForm()">
                Reset
              </v-btn>
              <v-btn color="primary" @click="submit()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title class="primary">
            <v-layout row wrap>
              <v-flex xs8 sm8 md8>
                <span class="headline white--text">Downtime List</span>
              </v-flex>
              <v-flex xs4 sm4 md4 class="pa-0">
                <v-select
                  class="no-margin"
                  label="Line"
                  solo
                  light
                  :items="line"
                  item-text="name"
                  item-value="id"
                />
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex xs12 sm12 md12>
                <v-card flat class="primary" dark>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs8 sm8 md3>
                        <span>Line</span>
                      </v-flex>
                      <v-flex xs4 sm4 md3>
                        <span>: Line 1</span>
                      </v-flex>
                      <v-flex xs10 sm10 md3>
                        <span>Machine</span>
                      </v-flex>
                      <v-flex xs2 sm2 md3>
                        <span>: Baking</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs8 sm8 md3>
                        <span>Date</span>
                      </v-flex>
                      <v-flex xs4 sm4 md3>
                        <span>: 24 Agu 2019</span>
                      </v-flex>
                      <v-flex xs10 sm10 md3>
                        <span>Shift</span>
                      </v-flex>
                      <v-flex xs2 sm2 md3>
                        <span>: Shift 1</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs8 sm8 md3>
                        <span>Reason</span>
                      </v-flex>
                      <v-flex xs4 sm4 md3>
                        <span>: Machine Cleaning</span>
                      </v-flex>
                      <v-flex xs10 sm10 md3>
                        <span>Duration</span>
                      </v-flex>
                      <v-flex xs2 sm2 md3>
                        <span>: 75 minutes</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import defaultMixins from '~/mixins/default.mixins'
import line from '~/mixins/line.select'
import shift from '~/mixins/shift.select'
export default {
  middleware: ['auth'],
  mixins: [defaultMixins, line, shift],
  head() {
    return {
      title: 'Downtime Planning - Machine Vision'
    }
  },
  data() {
    return {
      valid: true,
      durationMenu: false,
      downtimeDuration: null,
      machineSelectedId: null,
      lineListSelectedId: null,
      machines: [],
      reasons: []
    }
  },
  watch: {
    machineSelectedId(value) {
      this.getListReason()
    }
  },
  created() {
    this.$axios.get(process.env.SERVICE_URL + '/machine').then(res => {
      this.machines = res.data
      this.machineSelectedId = 1
    })
  },
  methods: {
    getListReason() {
      this.reasons = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/downtime-reason-machine/category?machine_id=' +
            this.machineSelectedId +
            '&categori_id=1'
        )
        .then(res => {
          this.reasons = res.data
        })
    }
  }
}
</script>
<style>
.v-input__slot {
  margin-bottom: 0px !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  border: 2px solid #bdbdbd !important;
}
.v-input__control .v-input__slot {
  margin: 0px !important;
}
.v-menu--inline {
  display: inline-block;
  background-color: #ffffff;
  width: 100% !important;
}
</style>
