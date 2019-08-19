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
      <v-flex>
        <v-card>
          <v-card-title class="grey lighten-3 headline">
            Filter
          </v-card-title>
          <v-card-text>
            <v-form ref="formAnalysis" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md3>
                  <v-select
                    v-model="filter.line_id"
                    :rules="[rules.required]"
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
                    v-model="filter.time_periodic"
                    :rules="[rules.required]"
                    label="Periodicity"
                    class="hidden-details"
                    solo
                    dark
                    background-color="primary darken-1"
                    :items="periods"
                    item-text="name"
                    item-value="value"
                  />
                </v-flex>
                <v-flex xs12 sm12 md3>
                  <v-menu>
                    <template slot="activator">
                      <v-text-field
                        v-model="filter.from_date"
                        :rules="[rules.required]"
                        light
                        class="hidden-details"
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
                        class="hidden-details"
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
          </v-card-text>
          <v-card-actions class="px-3">
            <v-spacer />
            <v-btn color="primary" @click="submit()">submit</v-btn>
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
                <span class="display-3 font-weight-medium orange--text">
                  {{
                    data === null
                      ? ''
                      : data.production.statistic[0].percentage_success
                  }}%
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
                  <v-flex xs8 sm8 md8 class="title">OEE Average</v-flex>
                  <v-flex xs4 sm4 md4 class="headline orange--text">
                    {{ data === null ? '' : data.oee.statistic[0].oee_avg }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="title">Highest</v-flex>
                  <v-flex xs4 sm4 md4 class="headline green--text">
                    {{
                      data === null ? '' : data.oee.statistic[0].oee_highest
                    }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="title">Lowest</v-flex>
                  <v-flex xs4 sm4 md4 class="headline red--text">
                    {{ data === null ? '' : data.oee.statistic[0].oee_lowest }}%
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="title">
                    Total Production Time
                  </v-flex>
                  <v-flex xs4 sm4 md4 class="headline black--text">
                    {{
                      data === null
                        ? ''
                        : formatTime(
                            data.oee.statistic[0].total_production_time
                          )
                    }}
                  </v-flex>
                  <v-flex xs8 sm8 md8 class="title">
                    Total Loss in Time
                  </v-flex>
                  <v-flex xs4 sm4 md4 class="headline blue--text">
                    {{
                      data === null
                        ? ''
                        : formatTime(data.oee.statistic[0].total_loss_in_time)
                    }}
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
              <v-flex xs12 sm12 md7 class="chart-wrapper" align-center>
                <v-chart :options="paretoAvailabilityData" />
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Total Downtime Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    {{
                      data === null
                        ? ''
                        : data.availability_loss.statistic[0].total_accumulation
                    }}
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Total Downtime Time Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    {{
                      data === null
                        ? ''
                        : parseFloat(
                            data.availability_loss.statistic[0]
                              .total_time_accumulation / 60
                          ).toFixed(2)
                    }}
                    <span class="title">Hours</span>
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
              <v-flex xs12 sm12 md7 class="chart-wrapper" align-center>
                <v-chart :options="paretoPerformanceData" />
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Total Performance Loss Accumulation
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    {{
                      data === null
                        ? ''
                        : data.performance_loss.statistic[0].total_accumulation
                    }}
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Total Performance Loss Accumulation in Time
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    {{
                      data === null
                        ? ''
                        : parseFloat(
                            data.performance_loss.statistic[0]
                              .total_time_accumulation / 60
                          ).toFixed(2)
                    }}
                    <span class="title">Hours</span>
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
              <v-flex xs12 sm12 md7 class="chart-wrapper" align-center>
                <v-chart :options="paretoQualityData" />
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-layout row wrap align-start>
                  <v-flex xs6 sm6 md6 class="headline">
                    Quality Loss Accumulation in Carton
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 orange--text">
                    {{
                      data === null
                        ? ''
                        : data.quality_loss.statistic[0].accumulation
                    }}
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="headline mt-5">
                    Quality Loss Accumulation in Time
                  </v-flex>
                  <v-flex xs6 sm6 md6 class="display-3 green--text mt-5">
                    {{
                      data === null
                        ? ''
                        : data.quality_loss.statistic[0].karton === null
                        ? '0'
                        : data.quality_loss.statistic[0].karton
                    }}
                    <span class="title">Hours</span>
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
import datetime from '~/mixins/datetime'
import defaultMixins from '~/mixins/default.mixins'
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
  mixins: [line, defaultMixins, datetime],
  data() {
    return {
      data: null,
      filter: {
        line_id: null,
        from_date: null,
        to_date: null,
        time_periodic: null
      },
      oeeGraph: false,
      periods: [
        { value: 'daily', name: 'Daily' },
        { value: 'weekly', name: 'Weekly' },
        { value: 'monthly', name: 'Monthly' },
        { value: 'yearly', name: 'Yearly' }
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
          data: [],
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
            data: []
          },
          {
            name: 'Finish Good',
            type: 'bar',
            itemStyle: {
              normal: { color: '#42A5F5' }
            },
            data: []
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
          data: [],
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
            data: []
          },
          {
            name: 'Availability Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#EF5350' }
            },
            data: []
          },
          {
            name: 'Performance Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#29B6F6' }
            },
            data: []
          },
          {
            name: 'Quality Loss',
            type: 'bar',
            itemStyle: {
              normal: { color: '#9575CD' }
            },
            data: []
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
          data: [],
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
            data: []
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
          data: [],
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
            name: 'Duration',
            type: 'bar',
            itemStyle: {
              normal: { color: '#1E88E5' }
            },
            data: []
          }
        ]
      },
      paretoPerformanceData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: {
          data: [],
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
            name: 'Duration',
            type: 'bar',
            itemStyle: {
              normal: { color: '#1E88E5' }
            },
            data: []
          }
        ]
      },
      paretoQualityData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        xAxis: {
          data: [],
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
            name: 'Duration',
            type: 'bar',
            itemStyle: {
              normal: { color: '#1E88E5' }
            },
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.filter = {
      line_id: 1,
      from_date: this.currentDate,
      to_date: this.currentDate,
      time_periodic: 'daily'
    }
    this.getAnalysis()
  },
  methods: {
    submit() {
      if (this.$refs.formAnalysis.validate()) {
        this.getAnalysis()
      } else {
        this.snackbar = {
          status: true,
          color: 'indigo',
          text: 'Filter should be filled'
        }
      }
    },
    getAnalysis() {
      this.productionData.xAxis.data = []
      this.productionData.series[0].data = []
      this.productionData.series[1].data = []
      this.oeeBarData.xAxis.data = []
      this.oeeLineData.xAxis.data = []
      this.oeeBarData.series[0].data = []
      this.oeeLineData.series[0].data = []
      this.oeeBarData.series[1].data = []
      this.oeeBarData.series[2].data = []
      this.oeeBarData.series[3].data = []
      this.paretoAvailabilityData.xAxis.data = []
      this.paretoAvailabilityData.series[0].data = []
      this.paretoPerformanceData.xAxis.data = []
      this.paretoPerformanceData.series[0].data = []
      this.paretoQualityData.xAxis.data = []
      this.paretoQualityData.series[0].data = []

      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/analysis/production?line_id=' +
            this.filter.line_id +
            '&from_date=' +
            this.filter.from_date +
            '&to_date=' +
            this.filter.to_date +
            '&time_periodic=' +
            this.filter.time_periodic,
          this.token
        )
        .then(res => {
          this.data = res.data
          // production
          for (let i = 0; i < res.data.production.data.length; i++) {
            if (this.filter.time_periodic === 'weekly') {
              this.productionData.xAxis.data.push(
                'Week ' + res.data.production.data[i].week
              )
            } else if (this.filter.time_periodic === 'daily') {
              this.productionData.xAxis.data.push(
                res.data.production.data[i].date
              )
            } else if (this.filter.time_periodic === 'monthly') {
              this.productionData.xAxis.data.push(
                this.month[parseInt(res.data.production.data[i].month) - 1]
              )
            } else {
              this.productionData.xAxis.data.push(
                res.data.production.data[i].year
              )
            }
            this.productionData.series[0].data.push(
              res.data.production.data[i].target_produksi
            )
            this.productionData.series[1].data.push(
              res.data.production.data[i].finish_good
            )
          }
          // oee
          for (let i = 0; i < res.data.oee.data.length; i++) {
            if (this.filter.time_periodic === 'weekly') {
              this.oeeBarData.xAxis.data.push(
                'Week ' + res.data.oee.data[i].week
              )
            } else if (this.filter.time_periodic === 'daily') {
              this.oeeBarData.xAxis.data.push(res.data.oee.data[i].date)
            } else if (this.filter.time_periodic === 'monthly') {
              this.oeeBarData.xAxis.data.push(
                this.month[parseInt(res.data.oee.data[i].month) - 1]
              )
            } else {
              this.oeeBarData.xAxis.data.push(res.data.oee.data[i].year)
            }
            if (this.filter.time_periodic === 'weekly') {
              this.oeeLineData.xAxis.data.push(
                'Week ' + res.data.oee.data[i].week
              )
            } else if (this.filter.time_periodic === 'daily') {
              this.oeeLineData.xAxis.data.push(res.data.oee.data[i].date)
            } else if (this.filter.time_periodic === 'monthly') {
              this.oeeLineData.xAxis.data.push(
                this.month[parseInt(res.data.oee.data[i].month) - 1]
              )
            } else {
              this.oeeLineData.xAxis.data.push(res.data.oee.data[i].year)
            }

            this.oeeBarData.series[0].data.push(
              parseFloat(res.data.oee.data[i].line_oee).toFixed(2)
            )
            this.oeeLineData.series[0].data.push(
              parseFloat(res.data.oee.data[i].line_oee).toFixed(2)
            )
            this.oeeBarData.series[1].data.push(
              parseFloat(res.data.oee.data[i].availablity).toFixed(2)
            )
            this.oeeBarData.series[2].data.push(
              parseFloat(res.data.oee.data[i].performance_rate).toFixed(2)
            )
            this.oeeBarData.series[3].data.push(
              parseFloat(res.data.oee.data[i].quality_product_rate).toFixed(2)
            )
          }
          // Pareto Availability Loss
          for (let i = 0; i < res.data.availability_loss.data.length; i++) {
            this.paretoAvailabilityData.xAxis.data.push(
              res.data.availability_loss.data[i].reason
            )
            this.paretoAvailabilityData.series[0].data.push(
              res.data.availability_loss.data[i].duration
            )
          }
          // Pareto Performance Loss
          for (let i = 0; i < res.data.performance_loss.data.length; i++) {
            this.paretoPerformanceData.xAxis.data.push(
              res.data.performance_loss.data[i].reason
            )
            this.paretoPerformanceData.series[0].data.push(
              res.data.performance_loss.data[i].duration
            )
          }
          // Pareto Quality Loss
          for (let i = 0; i < res.data.quality_loss.data.length; i++) {
            this.paretoQualityData.xAxis.data.push(
              res.data.quality_loss.data[i].reason
            )
            this.paretoQualityData.series[0].data.push(
              res.data.quality_loss.data[i].duration
            )
          }
        })
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
