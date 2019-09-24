<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md8>
        <span class="display-1 font-weight-bold orange--text">Line List</span>
      </v-flex>
      <v-flex xs6 sm6 md2>
        <v-menu full-width>
          <template slot="activator">
            <v-text-field
              solo
              class="hidden-details"
              dark
              readonly
              :value="formatDate(dateFilter)"
              background-color="indigo"
            />
          </template>
          <v-date-picker v-model="dateFilter" reactive />
        </v-menu>
      </v-flex>
      <v-flex xs6 sm6 md2>
        <v-select
          v-model="shiftFilterId"
          class="hidden-details"
          label="Shift"
          solo
          dark
          background-color="primary"
          :items="shift"
          item-text="shift_name"
          item-value="id"
        />
      </v-flex>
    </v-layout>
    <v-layout class="mt-3" row wrap>
      <v-flex v-for="item in oee" :key="item.line.name" xs12 sm12 md12>
        <v-card
          color="primary"
          dark
          :to="{
            path: '/production/' + item.lineId,
            params: { line: { shift: 1, date: dateFilter } }
          }"
        >
          <v-card-title class="card-header mx-3">
            <span class="headline white--text font-weight-bold">{{
              item.line.name
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4>
                <v-layout row wrap align-center>
                  <v-flex xs6 sm6 md6>
                    <v-layout justify-center>
                      <v-progress-circular
                        size="150"
                        width="13"
                        :value="item.line_oee"
                        color="blue lighten-3"
                      >
                        <span class="display-2 font-weight-bold white--text">
                          {{ parseInt(item.line_oee) }}%
                        </span>
                      </v-progress-circular>
                    </v-layout>
                    <v-layout justify-center class="mt-1">
                      <span class="subheading font-weight-bold">OEE</span>
                    </v-layout>
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="pr-5">
                    <v-layout row wrap class="text-xs-center">
                      <v-flex xs12 sm12 md12>
                        <v-layout justify-center>
                          <v-progress-circular
                            size="40"
                            width="5"
                            :value="item.availablity"
                            color="warning"
                          >
                            <span class="caption white--text">
                              {{ parseInt(item.availablity) }}%
                            </span>
                          </v-progress-circular>
                        </v-layout>
                        <v-layout justify-center class="mt-1">
                          <span class="caption font-weight-bold">
                            Availability
                          </span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-layout justify-center class="mt-3">
                          <v-progress-circular
                            size="40"
                            width="5"
                            :value="item.performance_rate"
                            color="error"
                          >
                            <span class="caption white--text">
                              {{ parseInt(item.performance_rate) }}%
                            </span>
                          </v-progress-circular>
                        </v-layout>
                        <v-layout justify-center class="mt-1">
                          <span class="caption font-weight-bold">
                            Performance
                          </span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-layout justify-center class="mt-3">
                          <v-progress-circular
                            size="40"
                            color="success"
                            width="5"
                            :value="item.quality_product_rate"
                          >
                            <span class="caption white--text">
                              {{ parseInt(item.quality_product_rate) }}%
                            </span>
                          </v-progress-circular>
                        </v-layout>
                        <v-layout justify-center class="mt-1">
                          <span class="caption font-weight-bold">Quality</span>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <span class="title font-weight-bold white--text">
                  Information
                </span>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Shift
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.shift.shift_name }}
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    PO Number
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.po.length > 0 ? item.po[0].po_number : '-' }}
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    SKU
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.po.length > 0 ? item.po[0].sku.name : '-' }}
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Target
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.total_target_produksi }} Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Standart CT
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.total_standart_ct }} Minutes
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Bottle Neck CT
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.total_bottleneck_ct }} Minutes
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex id="production" xs12 sm12 md4>
                <span class="title font-weight-bold white--text">
                  Production
                </span>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Total Finish Good
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.b_finishgood_shift }} Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Total Defect
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.d_total_defect_qty_karton }} Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Pieces to Target
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    {{ item.total_pieces_to_target }}
                    Carton
                  </v-flex>
                </v-layout>
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
import datetime from '~/mixins/datetime'
import defaultMixins from '~/mixins/default.mixins'
export default {
  mixins: [shift, datetime, defaultMixins],
  middleware: ['auth'],
  head() {
    return {
      title: 'Production - Machine Vision'
    }
  },
  data() {
    return {
      dateFilter: null,
      shiftFilterId: 1,
      oee: [],
      po: [],
      dummy: {
        availablity: 0,
        b_finishgood_shift: 0,
        c_total_qty_shift: 0,
        d_total_defect_qty_karton: 0,
        e_total_rework_qty_karton: 0,
        id: 0,
        k_total_planned_dt_losses: 0,
        l_loading_hours: 0,
        l_total_production_time: 0,
        line: {
          id: 0,
          name: ''
        },
        lineId: 0,
        line_oee: 0,
        m_total_unplanned_dt: 0,
        mtbf_x1: 0,
        mttf_z1: 0,
        mttr_y1: 0,
        n_operating_hours: 0,
        o_total_performance_losses: 0,
        p_running_time: 0,
        performance_rate: 0,
        po: 0,
        q_total_defect_losses: 0,
        q_total_quality_losses: 0,
        q_total_rework_losses: 0,
        quality_product_rate: 0,
        r_value_added_hours: 0,
        shift: 0,
        shiftId: 0,
        total_bottleneck_ct: 0,
        total_pieces_to_target: 0,
        total_standart_ct: 0,
        total_target_produksi: 0,
        updated_at: 0,
        w2_total_downtime: 0,
        w3_number_of_breakdown: 0,
        w4_up_time: 0
      }
    }
  },
  watch: {
    dateFilter() {
      this.getProduction()
    },
    shiftFilterId() {
      this.getProduction()
    }
  },
  created() {
    this.dateFilter = this.currentDate
  },
  methods: {
    getProduction() {
      this.oee = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/oee/shift/bydate?shiftId=' +
            this.shiftFilterId +
            '&date=' +
            this.dateFilter,
          this.token
        )
        .then(res => {
          if (res.status == 200) {
            if (
              res.data.oee_shift.find(item => item.lineId == 1) === undefined
            ) {
              this.oee.push({
                ...this.dummy,
                line: { id: 1, name: 'Line 13' },
                lineId: 1
              })
            } else {
              this.oee.push(res.data.oee_shift.find(item => item.lineId == 1))
            }
            if (
              res.data.oee_shift.find(item => item.lineId == 2) === undefined
            ) {
              this.oee.push({
                ...this.dummy,
                line: { id: 2, name: 'Line 14' },
                lineId: 2
              })
            } else {
              this.oee.push(res.data.oee_shift.find(item => item.lineId == 1))
            }
            if (
              res.data.oee_shift.find(item => item.lineId == 3) === undefined
            ) {
              this.oee.push({
                ...this.dummy,
                line: { id: 3, name: 'Line 15' },
                lineId: 3
              })
            } else {
              this.oee.push(res.data.oee_shift.find(item => item.lineId == 1))
            }
            if (
              res.data.oee_shift.find(item => item.lineId == 4) === undefined
            ) {
              this.oee.push({
                ...this.dummy,
                line: { id: 4, name: 'Line 16' },
                lineId: 4
              })
            } else {
              this.oee.push(res.data.oee_shift.find(item => item.lineId == 1))
            }
            this.po = res.data.po
          }
        })
      if (this.oee.length == 0) {
        this.alert = {
          status: true,
          type: 'info',
          message: 'There is no data'
        }
      }
    }
  }
}
</script>
<style>
.v-input__slot {
  margin-bottom: 0px !important;
}
#production {
  border-left: 2px solid white;
  padding-left: 15px;
}
</style>
