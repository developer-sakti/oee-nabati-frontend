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
              <span class="headline white--text">Production Planning</span>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-menu>
                    <template slot="activator">
                      <v-text-field
                        v-model="form.date"
                        :rules="[rules.required]"
                        solo
                        light
                        readonly
                        flat
                        placeholder="Tanggal"
                      />
                    </template>
                    <v-date-picker v-model="form.date" reactive />
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.po_number"
                    label="PO Number"
                    :rules="[rules.required]"
                    type="text"
                    solo
                    flat
                    required
                  />
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-select
                    v-model="form.lineId"
                    :rules="[rules.required]"
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
                    v-model="shiftSelected"
                    :rules="[rules.required]"
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
                    v-model="form.skuId"
                    :rules="[rules.required]"
                    label="SKU"
                    solo
                    light
                    flat
                    :items="sku"
                    item-text="name"
                    item-value="id"
                  />
                </v-flex>

                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.target_produksi"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    type="number"
                    placeholder="Target"
                  />
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-menu
                    ref="menu1"
                    v-model="startTime"
                    :close-on-content-click="false"
                    :return-value.sync="form.start_sku"
                  >
                    <template slot="activator">
                      <v-text-field
                        v-model="form.start_sku"
                        :rules="[rules.shiftFirst, rules.required]"
                        solo
                        light
                        flat
                        readonly
                        placeholder="Start"
                      />
                    </template>
                    <v-time-picker
                      v-if="startTime"
                      v-model="form.start_sku"
                      :allowed-hours="setTime"
                      format="24hr"
                      @click:minute="$refs.menu1.save(form.start_sku)"
                    />
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-menu
                    ref="menu2"
                    v-model="endTime"
                    :close-on-content-click="false"
                    :return-value.sync="form.end_sku"
                  >
                    <template slot="activator">
                      <v-text-field
                        v-model="form.end_sku"
                        :rules="[rules.shiftFirst, rules.required]"
                        solo
                        light
                        flat
                        readonly
                        placeholder="End"
                      />
                    </template>
                    <v-time-picker
                      v-if="endTime"
                      v-model="form.end_sku"
                      :allowed-hours="setTime"
                      format="24hr"
                      @click:minute="$refs.menu2.save(form.end_sku)"
                    />
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.standart_ct"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    placeholder="Standart CT"
                    type="number"
                  >
                    <template v-slot:append>
                      <span class="black--text mr-3">menit</span>
                    </template>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.bottleneck_ct"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    placeholder="Bottle Neck CT"
                    type="number"
                  >
                    <template v-slot:append>
                      <span class="black--text mr-3">menit</span>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="pr-5">
              <v-spacer />
              <v-btn color="orange darken-2" dark @click="resetForm">
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
                <span class="headline white--text">PO List</span>
              </v-flex>
              <v-flex xs4 sm4 md4 class="pa-0">
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
            </v-layout>
          </v-card-title>
          <v-card-text class="py-0">
            <v-layout column>
              <v-flex xs12 sm12 md12 class="mt-3">
                <span class="title font-weight-regular">
                  Active
                </span>
              </v-flex>
              <v-flex>
                <po-list :title="polist.title1" :po="polist.active" />
              </v-flex>
              <v-flex v-if="polist.active.length == 0">
                <v-alert v-model="alert.status" :type="alert.type">
                  {{ alert.message }}
                </v-alert>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <span class="title font-weight-regular">
                  Waiting
                </span>
              </v-flex>
              <v-flex class="wrapper" xs12 sm12 md12>
                <vue-scroll>
                  <po-list :title="polist.title2" :po="polist.waiting" />
                </vue-scroll>
              </v-flex>
              <v-flex v-if="polist.waiting.length == 0" xs12 sm12 md12>
                <v-alert
                  v-model="alertWaiting.status"
                  :type="alertWaiting.type"
                >
                  {{ alertWaiting.message }}
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
export default {
  mixins: [defaultMixins, datetime],
  middleware: ['auth'],
  head() {
    return {
      title: 'Production Planning - Machine Vision'
    }
  },
  data() {
    return {
      startTime: false,
      endTime: false,
      limitTime: {
        start: null,
        end: null
      },
      shift: [],
      shiftSelected: null,
      line: [],
      sku: [],
      valid: true,
      rules: {
        required: value => !!value || 'Field is required',
        shiftFirst: value =>
          !!this.shiftSelected || 'Shift must be selected first'
      },
      lineListSelectedId: null,
      form: {
        po_number: null,
        standart_ct: null,
        bottleneck_ct: null,
        target_produksi: null,
        date: null,
        start_sku: null,
        end_sku: null,
        shiftId: null,
        lineId: null,
        skuId: null,
        supervisorId: null
      },
      polist: {
        title1: 'Active',
        active: [],
        title2: 'Waiting List',
        waiting: []
      },
      alertWaiting: {
        status: false,
        type: 'info',
        message: null
      }
    }
  },
  watch: {
    shiftSelected(value) {
      let temp
      this.setTime()
      this.form.shiftId = value
      for (let i = 0; i < this.shift.length; i++) {
        if (this.shiftSelected == this.shift[i].id) {
          temp = this.shift[i].start_time.split(':')
          this.limitTime.start = parseInt(temp[0])
          temp = this.shift[i].end_time.split(':')
          this.limitTime.end = parseInt(temp[0] - 1)
        }
      }
    },
    lineListSelectedId() {
      this.getPOActive()
      this.getPOWaiting()
    }
  },
  created() {
    this.form.supervisorId = this.user.id
    this.$axios
      .get(process.env.SERVICE_URL + '/initial-shift', this.token)
      .then(res => {
        this.shift = res.data
      })
    this.$axios.get(process.env.SERVICE_URL + '/line', this.token).then(res => {
      this.line = res.data
      this.lineListSelectedId = res.data[0].id
      this.getPOActive()
    })
    this.$axios
      .get(process.env.SERVICE_URL + '/initial-sku', this.token)
      .then(res => {
        this.sku = res.data
      })
  },
  mounted() {
    setInterval(() => {
      if (this.hmi !== null) {
        this.getPOActive()
      }
    }, 5000)
  },
  methods: {
    setTime(v) {
      return v >= this.limitTime.start && v <= this.limitTime.end
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$axios
          .post(
            process.env.SERVICE_URL + '/rencana-produksi',
            this.form,
            this.token
          )
          .then(res => {
            if (res.data.success) {
              this.resetForm()
              this.snackbar = {
                status: true,
                text: 'Production Order saved successfully',
                color: 'success'
              }
            } else {
              console.log(res)
              this.snackbar = {
                status: true,
                text: 'Production Order saved fail',
                color: 'error'
              }
            }
            this.resetForm()
          })
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
    getPOActive() {
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/rencana-produksi/active?date=' +
            this.currentDate +
            '&time=' +
            this.currentTime +
            '+&line_id=' +
            this.lineListSelectedId,
          this.token
        )
        .then(res => {
          if (res.status == 200) {
            this.polist.active = []
            if (res.data === '') {
              this.alert = {
                status: true,
                message: 'There is no active production order',
                type: 'info'
              }
            } else {
              this.polist.active.push(res.data)
            }
          }
          this.getPOWaiting()
        })
    },
    getPOWaiting() {
      this.waiting = []
      if (this.polist.active.length > 0) {
        this.$axios
          .get(
            process.env.SERVICE_URL +
              '/rencana-produksi/waiting-list?datetime=' +
              this.currentDate +
              ' ' +
              this.currentTime +
              '&lineId=' +
              this.lineListSelectedId,
            this.token
          )
          .then(res => {
            if (res.status == 200) {
              this.polist.waiting = []
              if (res.data.length == 0) {
                this.alertWaiting = {
                  status: true,
                  message: 'There is no waiting production order ',
                  type: 'info'
                }
              } else {
                this.polist.waiting = res.data
              }
            }
          })
      } else {
        this.alertWaiting = {
          status: true,
          message: 'There is no waiting production order ',
          type: 'info'
        }
      }
    }
  }
}
</script>

<style lang="css">
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
.wrapper{
  max-height: 40vh;
}
</style>
