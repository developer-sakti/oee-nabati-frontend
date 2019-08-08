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
                  />
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
                  />
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
                <v-select label="Line" solo light flat />
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text class="py-0">
            <v-layout>
              <v-flex>
                <v-card flat>
                  <v-card-title class="title font-weight-regular">
                    Active
                  </v-card-title>
                  <v-card-text class="cyan lighten-2 px-3">
                    <v-layout>
                      <v-flex xs2 sm2 md2>
                        Line
                      </v-flex>
                      <v-flex xs1 sm1 md1>
                        :
                      </v-flex>
                      <v-flex xs3 sm3 md3>
                        23
                      </v-flex>
                      <!-- <v-flex xs2 sm2 md2>
                        Line
                      </v-flex>
                      <v-flex xs1 sm1 md1>
                        :
                      </v-flex>
                      <v-flex xs3 sm3 md3>
                        23
                      </v-flex> -->
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
export default {
  mixins: [defaultMixins],
  middleware: ['auth'],
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
    }
  },
  created() {
    this.form.supervisorId = this.user.id
    this.$axios.get(process.env.SERVICE_URL + '/initial-shift').then(res => {
      this.shift = res.data
    })
    this.$axios.get(process.env.SERVICE_URL + '/line').then(res => {
      this.line = res.data
    })
    this.$axios.get(process.env.SERVICE_URL + '/initial-sku').then(res => {
      this.sku = res.data
    })
  },
  methods: {
    setTime(v) {
      return v >= this.limitTime.start && v <= this.limitTime.end
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$axios
          .post(process.env.SERVICE_URL + '/rencana-produksi', this.form)
          .then(res => {
            if (res.data.success) {
              this.resetReworkDialog()
              this.snackbar = {
                status: true,
                text: 'Order berhasil disimpan',
                color: 'success'
              }
            } else {
              this.snackbar = {
                status: true,
                text: 'Order gagal',
                color: 'error'
              }
            }
            this.resetForm()
          })
      }
    },
    resetForm() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
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
