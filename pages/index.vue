<template>
  <v-container grid-list-md fluid class="no-select">
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
      <v-flex xs12 sm12 md6>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-card height="60vh">
              <v-card-title class="pb-0">
                <span class="title">Productivity</span>
              </v-card-title>
              <v-card-text class="pa-0 ma-0">
                <v-layout class="chart-wrapper">
                  <v-chart :options="chartData" />
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-card height="20vh">
              <v-card-title class="title">
                PT Kaldu Sari Nabati Indonesia
              </v-card-title>
              <v-card-text class="pt-0">
                <v-layout>
                  <v-icon color="primary">place</v-icon>
                  <span class="ml-3">
                    Sukadana, Cimanggung, Sukadana, Kec. Cimanggung, Kabupaten
                    Sumedang, Jawa Barat 45364
                  </span>
                </v-layout>
                <v-layout>
                  <v-icon color="primary">mdi-google-circles-extended</v-icon>
                  <span class="ml-3">
                    2RP4+4G Rancaekek, Bandung, Jawa Barat
                  </span>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card color="blue darken-1" dark height="80vh">
          <v-card-title class="pb-0">
            <span class="title">OEE Sector</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap align-center>
              <v-flex xs6 sm6 md6>
                <v-layout justify-center>
                  <v-progress-circular
                    size="150"
                    width="25"
                    :value="oee === null ? 0 : parseInt(oee.sector_oee)"
                    color="#7CB342"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      {{ oee === null ? 0 : parseInt(oee.sector_oee) }}%
                    </span>
                  </v-progress-circular>
                </v-layout>
                <v-layout justify-center class="mt-1">
                  <span class="headline font-weight-bold">OEE</span>
                </v-layout>
              </v-flex>
              <v-flex xs6 sm6 md6>
                <v-layout justify-center>
                  <v-progress-circular
                    size="150"
                    width="25"
                    :value="oee === null ? 0 : parseInt(oee.sector_availablity)"
                    color="#FFCA28"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      {{ oee === null ? 0 : parseInt(oee.sector_availablity) }}%
                    </span>
                  </v-progress-circular>
                </v-layout>
                <v-layout justify-center class="mt-1">
                  <span class="headline font-weight-bold">Availability</span>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row wrap align-center class="mt-5">
              <v-flex xs12 sm12 md6>
                <v-layout justify-center>
                  <v-progress-circular
                    size="150"
                    width="25"
                    :value="
                      oee === null ? 0 : parseInt(oee.sector_performance_rate)
                    "
                    color="#FF8A65"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      {{
                        oee === null
                          ? 0
                          : parseInt(oee.sector_performance_rate)
                      }}%
                    </span>
                  </v-progress-circular>
                </v-layout>
                <v-layout justify-center class="mt-1">
                  <span class="headline font-weight-bold">Performance</span>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-layout justify-center>
                  <v-progress-circular
                    size="150"
                    width="25"
                    :value="oee === null ? 0 : parseInt(oee.sector_quality)"
                    color="#4DD0E1"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      {{ oee === null ? 0 : parseInt(oee.sector_quality) }}%
                    </span>
                  </v-progress-circular>
                </v-layout>
                <v-layout justify-center class="mt-1">
                  <span class="headline font-weight-bold">Quality</span>
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
import ECharts from 'vue-echarts'
import datetime from '~/mixins/datetime'
import defaultMixins from '~/mixins/default.mixins'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
export default {
  middleware: ['auth'],
  components: {
    'v-chart': ECharts
  },
  mixins: [datetime, defaultMixins],
  data() {
    return {
      oee: null,
      chartData: {
        tooltip: {},
        xAxis: {
          data: [],
          axisLabel: {
            textStyle: {
              color: '#37474F'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#37474F'
            }
          }
        },
        series: [
          {
            name: 'Total Produksi',
            type: 'bar',
            itemStyle: {
              normal: { color: '#29B6F6' }
            },
            data: []
          }
        ]
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.getOEE()
      if (this.oee === null) {
        this.snackbar = {
          status: true,
          text: 'There is no Shift Active',
          color: 'indigo'
        }
      }
    }, 5000)
  },
  created() {
    this.getOEE()
    this.getProductivity()
  },
  methods: {
    getOEE() {
      const date = this.isHourUnderSix ? this.yesterdayDate : this.currentDate
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/oee/sector?date=' +
            date +
            '&time=' +
            this.currentTime,
          this.token
        )
        .then(res => {
          if (res.data !== '') {
            this.oee = res.data
          } else {
            this.oee = null
          }
        })
    },
    getProductivity() {
      this.chartData.xAxis.data = []
      this.chartData.series[0].data = []
      this.$axios
        .get(
          process.env.SERVICE_URL + '/rencana-produksi/productivity',
          this.token
        )
        .then(res => {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            this.chartData.xAxis.data.push(res.data[i].date)
            this.chartData.series[0].data.push(
              res.data[i].total_target_produksi
            )
          }
        })
    }
  }
}
</script>

<style>
#map {
  height: 60vh !important;
}
.vue-map-container {
  height: 85vh;
  width: 100%;
}
.chart-wrapper {
  width: 100%;
  height: 55vh;
}
.echarts {
  width: 100%;
  height: 100%;
}
#home .v-speed-dial {
  position: absolute;
}

#home .v-btn--floating {
  position: relative;
}
</style>
