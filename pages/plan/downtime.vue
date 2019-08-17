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
        <v-card>
          <v-card-title class="primary" dark>
            <span class="headline white--text">Downtime Planning</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="formPlanDowntime" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-select
                    v-model="lineListSelectedId"
                    label="Line"
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
                        v-model="downtimeDate"
                        :rules="[rules.required]"
                        solo
                        light
                        readonly
                        flat
                        placeholder="Tanggal"
                      />
                    </template>
                    <v-date-picker v-model="downtimeDate" reactive />
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-select
                    v-model="downtimeShiftId"
                    label="Shift"
                    solo
                    :rules="[rules.required]"
                    light
                    flat
                    :items="shift"
                    item-text="shift_name"
                    item-value="id"
                  />
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-select
                    v-model="downtimeReasonId"
                    label="Reason"
                    solo
                    :rules="[rules.required, rules.machineFirst]"
                    light
                    flat
                    :items="reasons"
                    item-text="reason"
                    item-value="downtimeReasonId"
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
                        :rules="[rules.required]"
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
            <v-btn color="orange darken-2" dark @click="reset()">
              Reset
            </v-btn>
            <v-btn color="primary" @click="submit()">Save</v-btn>
          </v-card-actions>
        </v-card>
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
                  v-model="lineFilterId"
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
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 class="wrapper-downtime">
                <vue-scroll :ops="scrollOptions">
                  <v-layout row wrap>
                    <v-flex
                      v-for="item in downtimes"
                      :key="item.id"
                      xs12
                      sm12
                      md12
                    >
                      <v-card flat class="primary" dark>
                        <v-card-text>
                          <v-layout row wrap>
                            <v-flex xs8 sm8 md3>
                              <span>Line</span>
                            </v-flex>
                            <v-flex xs4 sm4 md3>
                              <span>: {{ item.line.name }}</span>
                            </v-flex>
                            <v-flex xs10 sm10 md3>
                              <span>Machine</span>
                            </v-flex>
                            <v-flex xs2 sm2 md3>
                              <span>: {{ item.machine.name }}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs8 sm8 md3>
                              <span>Date</span>
                            </v-flex>
                            <v-flex xs4 sm4 md3>
                              <span>: {{ formatDate(item.date) }}</span>
                            </v-flex>
                            <v-flex xs10 sm10 md3>
                              <span>Shift</span>
                            </v-flex>
                            <v-flex xs2 sm2 md3>
                              <span>: {{ item.shift.shift_name }}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs8 sm8 md3>
                              <span>Reason</span>
                            </v-flex>
                            <v-flex xs4 sm4 md3>
                              <span>: {{ item.downtime_reason.reason }}</span>
                            </v-flex>
                            <v-flex xs10 sm10 md3>
                              <span>Duration</span>
                            </v-flex>
                            <v-flex xs2 sm2 md3>
                              <span>: {{ item.duration }} minutes</span>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </vue-scroll>
              </v-flex>
              <v-flex v-if="downtimes.length == 0" xs12 sm12 md12>
                <v-alert v-model="alert.status" :type="alert.type">
                  {{ alert.message }}
                </v-alert>
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
import datetime from '~/mixins/datetime'
import line from '~/mixins/line.select'
import shift from '~/mixins/shift.select'
export default {
  middleware: ['auth'],
  mixins: [defaultMixins, line, shift, datetime],
  head() {
    return {
      title: 'Downtime Planning - Machine Vision'
    }
  },
  data() {
    return {
      scrollOptions: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true
        },
        bar: {
          keepShow: true,
          background: 'lightblue',
          opacity: 1,
          minSize: 0.1,
          size: '5px'
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          verticalNativeBarPos: 'right'
        }
      },
      valid: true,
      rules: {
        required: value => !!value || 'Field is required',
        machineFirst: value =>
          !!this.machineSelectedId || 'Machine must be selected first'
      },
      durationMenu: false,
      downtimeDate: null,
      downtimeDuration: null,
      machineSelectedId: null,
      downtimeShiftId: null,
      downtimeReasonId: null,
      lineListSelectedId: null,
      lineFilterId: null,
      machines: [],
      reasons: [],
      downtimes: []
    }
  },
  watch: {
    machineSelectedId(value) {
      this.getListReason()
    },
    lineFilterId() {
      this.getDowntimeList()
    }
  },
  created() {
    this.$axios
      .get(process.env.SERVICE_URL + '/machine', this.token)
      .then(res => {
        this.machines = res.data
      })
    this.lineFilterId = 1
    this.getDowntimeList()
  },
  methods: {
    getListReason() {
      this.reasons = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/downtime-reason-machine/category?machine_id=' +
            this.machineSelectedId +
            '&categori_id=1',
          this.token
        )
        .then(res => {
          this.reasons = res.data
        })
    },
    getDowntimeList() {
      this.downtimes = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/downtime/category/1?line_id=' +
            this.lineFilterId,
          this.token
        )
        .then(res => {
          if (res.data.length == 0) {
            this.alert = {
              status: true,
              message: 'There is no downtime in this line',
              type: 'info'
            }
          }
          this.downtimes = res.data
        })
    },
    submit() {
      if (this.$refs.formPlanDowntime.validate()) {
        this.snackbar = true
        this.$axios
          .post(
            process.env.SERVICE_URL + '/downtime',
            {
              duration: this.convertMinutes(this.downtimeDuration),
              date: this.downtimeDate,
              shiftId: this.downtimeShiftId,
              lineId: this.lineListSelectedId,
              rencanaProduksiId: null,
              machineId: this.machineSelectedId,
              downtimeCategoryId: 1,
              downtimeReasonId: this.downtimeReasonId
            },
            this.token
          )
          .then(res => {
            if (res.status == 201) {
              this.snackbar = {
                status: true,
                color: 'success',
                text: 'Input downtime successfully'
              }
              this.getDowntimeList()
              this.reset()
            } else {
              this.snackbar = {
                status: true,
                color: 'error',
                text: 'Input downtime failed'
              }
            }
          })
      }
    },
    reset() {
      this.$refs.formPlanDowntime.reset()
    },
    convertMinutes(time) {
      const temp = time.split(':')
      const minute =
        parseInt(temp[0]) * 60 + parseInt(temp[1]) + parseInt(temp[2]) / 60
      return minute
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
.wrapper-downtime {
  max-height: 65vh;
}
</style>
