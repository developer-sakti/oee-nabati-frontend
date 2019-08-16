<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline">
            Filter
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md3>
                <v-select
                  v-model="lineFilterId"
                  label="Line"
                  class="hidden-details"
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
                  v-model="periodFilterId"
                  label="Periodicity"
                  class="hidden-details"
                  solo
                  dark
                  background-color="primary darken-1"
                  :items="periods"
                  item-text="name"
                  item-value="id"
                />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-menu>
                  <template slot="activator">
                    <v-text-field
                      v-model="fromdate"
                      light
                      class="hidden-details"
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
                      class="hidden-details"
                      readonly
                      light
                      placeholder="To Date"
                    />
                  </template>
                  <v-date-picker v-model="todate" reactive />
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="px-3">
            <v-spacer />
            <v-btn color="primary">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline font-weight-bold">
            Production
          </v-card-title>
          <v-card-text>
            <v-layout row wrap align-center>
              <v-flex xs12 sm12 md9 class="chart-wrapper">
                <v-chart :options="productionData" />
              </v-flex>
              <v-flex xs12 sm12 md3 class="text-xs-center">
                <span class="headline">Percentage Success</span>
                <br />
                <span class="display-4 font-weight-medium orange--text">
                  80%
                </span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline font-weight-bold">
            OEE
          </v-card-title>
          <v-card-text>
            <v-layout row wrap align-center>
              <v-flex xs12 sm12 md9 class="chart-wrapper">
                <v-chart :options="oeeGraph ? oeeLineData : oeeBarData" />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-layout row wrap>
                  <v-flex xs8 sm8 md8 class="headline">OEE Average</v-flex>
                  <v-flex xs4 sm4 md4 class="display-1 orange--text">
                    60%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="headline">Highest</v-flex>
                  <v-flex xs4 sm4 md4 class="display-1 green--text">
                    60%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="headline">Lowest</v-flex>
                  <v-flex xs4 sm4 md4 class="display-1 red--text">
                    60%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="headline">
                    Total Production Time
                  </v-flex>
                  <v-flex xs4 sm4 md4 class="display-1 black--text">
                    60%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="headline">
                    Total Loss in Time
                  </v-flex>
                  <v-flex xs4 sm4 md4 class="display-1 blue--text">
                    60%
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-switch
              v-model="oeeGraph"
              label="OEE"
              class="ml-3"
              color="primary"
            />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline">
            Pareto Availability Loss
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md9 class="chart-wrapper" align-center>
                <v-chart :options="paretoAvailabilityData" />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Total Downtime Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    60
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Total Downtime Time Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    60 <span class="title">Hours</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline">
            Pareto Performance Loss
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md9 class="chart-wrapper" align-center>
                <v-chart :options="paretoAvailabilityData" />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Total Performance Loss Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    60
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Total Performance Loss Accumulation in Time
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    60 <span class="title">Hours</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline">
            Pareto Quality Loss
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md9 class="chart-wrapper" align-center>
                <v-chart :options="paretoAvailabilityData" />
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Quality Loss Accumulation in Carton
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    60
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Quality Loss Accumulation in Time
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    60 <span class="title">Hours</span>
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
import ECharts from 'vue-echarts'
import line from '~/mixins/line.select'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
export default {
  components: {
    'v-chart': ECharts
  },
  middleware: ['auth'],
  mixins: [line],
  data() {
    return {
      oeeGraph: false,
      periods: [
        { id: 1, name: 'Daily' },
        { id: 2, name: 'Weekly' },
        { id: 3, name: 'Monthly' },
        { id: 4, name: 'Yearly' }
      ],
      productionData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
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
              color: 'grey'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'black'
            }
          }
        },
        series: [
          {
            name: 'Target',
            type: 'bar',
            itemStyle: {
              normal: { color: '#FFEE58' }
            },
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: 'Finish Good',
            type: 'bar',
            itemStyle: {
              normal: { color: '#42A5F5' }
            },
            data: [10, 20, 36, 10, 10, 20]
          }
        ]
      },
      oeeBarData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
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
              color: 'grey'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'black'
            }
          }
        },
        series: [
          {
            name: 'OEE',
            type: 'bar',
            itemStyle: {
              normal: { color: '#8BC34A' }
            },
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: 'Availability Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#EF5350' }
            },
            data: [10, 20, 36, 10, 10, 20]
          },
          {
            name: 'Performance Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#29B6F6' }
            },
            data: [10, 20, 36, 10, 10, 20]
          },
          {
            name: 'Quality Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#9575CD' }
            },
            data: [10, 20, 36, 10, 10, 20]
          }
        ]
      },
      oeeLineData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
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
              color: 'grey'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'black'
            }
          }
        },
        series: [
          {
            name: 'OEE',
            type: 'line',
            itemStyle: {
              normal: { color: '#1976D2' }
            },
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      paretoAvailabilityData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: {
          data: [
            'Reason 2',
            'Reason 3',
            'Reason 4',
            'Reason 5',
            'Reason 6',
            'Reason 7'
          ],
          axisLabel: {
            textStyle: {
              color: 'grey'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'black'
            }
          }
        },
        series: [
          {
            name: 'OEE',
            type: 'bar',
            itemStyle: {
              normal: { color: '#1E88E5' }
            },
            data: [60, 50, 40, 30, 20, 10]
          }
        ]
      }
    }
  }
}
</script>
<style>
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  border: 2px solid #bdbdbd !important;
}
.v-menu--inline {
  display: inline-block;
  background-color: #ffffff;
  width: 100% !important;
}
.vertical-text {
  text-orientation: upright;
}
.chart-wrapper {
  width: 100%;
  height: 400px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
