<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md6>
        <span class="display-1 font-weight-bold orange--text">Line Detail</span>
      </v-flex>
      <v-flex xs6 sm6 md2>
        <v-menu full-width>
          <template slot="activator">
            <v-text-field
              solo
              dark
              readonly
              :value="formatDate(dateFilter)"
              background-color="primary darken-3"
            />
          </template>
          <v-date-picker v-model="dateFilter" reactive />
        </v-menu>
      </v-flex>
      <v-flex xs6 sm6 md2>
        <v-select
          v-model="shiftFilterId"
          label="Shift"
          solo
          dark
          background-color="primary lighten-2"
          :items="shift"
          item-text="shift_name"
          item-value="id"
        />
      </v-flex>
      <v-flex xs6 sm6 md2>
        <v-select
          v-model="lineFilterId"
          label="Line"
          solo
          dark
          background-color="primary"
          :items="line"
          item-text="name"
          item-value="id"
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                OEE
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md8>
                    OEE
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? data.oee_shift !== undefined
                          ? data.oee_shift.line_oee
                          : ''
                        : ''
                    }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Availability
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? data.oee_shift !== undefined
                          ? data.oee_shift.availablity
                          : ''
                        : ''
                    }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Performance
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? data.oee_shift !== undefined
                          ? data.oee_shift.performance_rate
                          : ''
                        : ''
                    }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Quality
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? data.oee_shift !== undefined
                          ? data.oee_shift.quality_product_rate
                          : ''
                        : ''
                    }}%
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md6 d-flex>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Loss Time
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md8>
                    Total Defect
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? data.oee_shift !== undefined
                          ? data.oee_shift.d_total_defect_qty_karton
                          : ''
                        : ''
                    }}
                    Carton
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Total Waktu Defect
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? formatTime(data.oee_shift.q_total_defect_losses)
                        : ''
                    }}
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Production Time
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md4>
                    Available Time
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md4>
                    Loading Time
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{ data !== null ? data.oee_shift.l_loading_hours : '' }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Planned Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{
                      data !== null
                        ? data.oee_shift.k_total_planned_dt_losses
                        : ''
                    }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Operating Time
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{ data !== null ? data.oee_shift.n_operating_hours : '' }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Unplanned Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{
                      data !== null ? data.oee_shift.m_total_unplanned_dt : ''
                    }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Net Operating Time (Running Time)
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{ data !== null ? data.oee_shift.p_running_time : '' }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Performance Losses
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{
                      data !== null
                        ? data.oee_shift.o_total_performance_losses
                        : ''
                    }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Value Adding
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{
                      data !== null ? data.oee_shift.r_value_added_hours : ''
                    }}
                    minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Quality Losses
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    {{
                      data !== null ? data.oee_shift.q_total_quality_losses : ''
                    }}
                    minutes
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md6 d-flex>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Production Per PO
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md8>
                    Production Target
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? data.oee_shift.total_target_produksi : ''
                    }}
                    Carton
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Finish Good
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{ data !== null ? data.oee_shift.b_finishgood_shift : '' }}
                    Carton
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Pieces to Target
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? data.oee_shift.total_pieces_to_target : ''
                    }}
                    Carton
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Mean Time
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md8>
                    Total Waktu Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null
                        ? formatTime(data.oee_shift.w2_total_downtime)
                        : ''
                    }}
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Total Banyak Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? data.oee_shift.w3_number_of_breakdown : ''
                    }}
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time to Repair (MTTR)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? formatTime(data.oee_shift.mttr_y1) : ''
                    }}
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time to Failure (MTTF)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? formatTime(data.oee_shift.mttf_z1) : ''
                    }}
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time Between Failure (MTBF)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    {{
                      data !== null ? formatTime(data.oee_shift.mtbf_x1) : ''
                    }}
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-card color="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Six Big Loss
              </v-card-title>
              <v-card-text class="pb-0">
                <v-layout class="subheading font-weight-bold">
                  <v-flex xs8 sm8 md8>
                    Planned Downtime
                  </v-flex>
                  <v-flex xs8 sm8 md4>Time</v-flex>
                </v-layout>
                <v-layout
                  v-for="item in data === null
                    ? []
                    : data.six_big_loss.planned_downtime"
                  :key="item.id + item.duration"
                >
                  <v-flex xs8 sm8 md8>{{ item.downtime_reason.reason }}</v-flex>
                  <v-flex xs8 sm8 md4>{{ formatTime(item.duration) }}</v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text class="pb-0">
                <v-layout class="subheading font-weight-bold">
                  <v-flex xs8 sm8 md8>
                    Unplanned Downtime
                  </v-flex>
                  <v-flex xs8 sm8 md4>Time</v-flex>
                </v-layout>
                <v-layout
                  v-for="item in data === null
                    ? []
                    : data.six_big_loss.unplanned_downtime"
                  :key="item.id + item.duration"
                >
                  <v-flex xs8 sm8 md8>{{ item.downtime_reason.reason }}</v-flex>
                  <v-flex xs8 sm8 md4>{{ formatTime(item.duration) }}</v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout class="subheading font-weight-bold">
                  <v-flex xs8 sm8 md8>
                    Performance Losses/ Minorstopage
                  </v-flex>
                  <v-flex xs8 sm8 md4>Time</v-flex>
                </v-layout>
                <v-layout
                  v-for="item in data === null
                    ? []
                    : data.six_big_loss.performance_loss"
                  :key="item.id + item.duration"
                >
                  <v-flex xs8 sm8 md8>{{ item.downtime_reason.reason }}</v-flex>
                  <v-flex xs8 sm8 md4>{{ formatTime(item.duration) }}</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-card class="primary" dark>
              <v-card-title class="title font-weight-bold underline mx-3 px-0">
                Event
              </v-card-title>
              <v-card-text>
                <v-layout row wrap class="font-weight-bold">
                  <v-flex xs3 sm3 md3>Reason</v-flex>
                  <v-flex xs3 sm3 md3>Machine</v-flex>
                  <v-flex xs3 sm3 md3>Frequency</v-flex>
                  <v-flex xs3 sm3 md3>Time</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="card-event">
                    <vue-scroll :ops="scrollOptions">
                      <v-layout
                        v-for="item in data === null ? [] : data.event"
                        :key="item.reason + item.duration"
                        row
                        wrap
                      >
                        <v-flex xs3 sm3 md3>{{ item.reason }}</v-flex>
                        <v-flex xs3 sm3 md3>{{ item.machine }}</v-flex>
                        <v-flex xs3 sm3 md3>{{ item.frequency }}</v-flex>
                        <v-flex xs3 sm3 md3>{{
                          formatTime(item.duration)
                        }}</v-flex>
                      </v-layout>
                    </vue-scroll>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
  mixins: [shift, datetime, line, defaultMixins],
  middleware: ['auth'],
  head() {
    return {
      title: 'Production Detail - Machine Vision'
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
      dateFilter: null,
      shiftFilterId: 1,
      lineFilterId: null,
      data: null
    }
  },
  watch: {
    dateFilter() {
      this.getDetail()
    },
    shiftFilterId() {
      this.getDetail()
    },
    lineFilterId() {
      this.getDetail()
    }
  },
  created() {
    this.dateFilter = this.currentDate
    this.lineFilterId = parseInt(this.$route.params.id)
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/oee/shift/bydate/' +
            this.lineFilterId +
            '?shiftId=' +
            this.shiftFilterId +
            '&date=',
          this.dateFilter,
          this.token
        )
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            this.data = res.data
          }
        })
    }
  }
}
</script>
<style>
.v-input__slot {
  margin-bottom: 0px !important;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px important;
  display: none !important;
}
.underline {
  border-bottom: 2px solid white;
}
.card-event {
  max-height: 23vh;
}
</style>
