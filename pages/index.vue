<template>
  <v-container grid-list-md fluid class="no-select">
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
            <span class="title">Calculation</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap align-center>
              <v-flex xs6 sm6 md6>
                <v-layout justify-center>
                  <v-progress-circular
                    size="150"
                    width="25"
                    value="80"
                    color="#7CB342"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      80%
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
                    value="80"
                    color="#FFCA28"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      80%
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
                    value="80"
                    color="#FF8A65"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      80%
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
                    value="80"
                    color="#4DD0E1"
                  >
                    <span class="display-2 white--text font-weight-bold">
                      80%
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
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markLine'
export default {
  middleware: ['auth'],
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'roadmap',
      markers: [{ position: { lat: -6.9127778, lng: 107.6205556 } }],
      chartData: {
        tooltip: {},
        xAxis: {
          data: [
            '2019-08-12',
            '2019-08-13',
            '2019-08-14',
            '2019-08-15',
            '2019-08-16',
            '2019-08-17'
          ],
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
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
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
