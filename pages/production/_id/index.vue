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
                    100%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Availability
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    100%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Performance
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    100%
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Quality
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    100%
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
                    30
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Total Waktu Defect
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    01:20:15
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
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Planned Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Operating Time
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Unplanned Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Net Operating Time
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Performance Losses
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Value Adding
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
                  </v-flex>
                  <v-flex xs8 sm8 md4>
                    Quality Losses
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    480 minutes
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
                    1000
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Finish Good
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    980
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Pieces to Target
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    20
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
                    00:30:12
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Total Banyak Downtime
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    20
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time to Repair (MTTR)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    00:05:20
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time to Failure (MTTF)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    00:05:20
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    Mean Time Between Failure (MTBF)
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    00:05:20
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
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 1</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 2</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text class="pb-0">
                <v-layout class="subheading font-weight-bold">
                  <v-flex xs8 sm8 md8>
                    Unplanned Downtime
                  </v-flex>
                  <v-flex xs8 sm8 md4>Time</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 1</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 2</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout class="subheading font-weight-bold">
                  <v-flex xs8 sm8 md8>
                    Performance Losses/ Minorstopage
                  </v-flex>
                  <v-flex xs8 sm8 md4>Time</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 1</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs8 sm8 md8>Reason 2</v-flex>
                  <v-flex xs8 sm8 md4>10:05:12</v-flex>
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
                      <v-layout v-for="item in 5" :key="item" row wrap>
                        <v-flex xs3 sm3 md3>Cleaning Baking Plate</v-flex>
                        <v-flex xs3 sm3 md3>Baking</v-flex>
                        <v-flex xs3 sm3 md3>10</v-flex>
                        <v-flex xs3 sm3 md3>01:10:12</v-flex>
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
export default {
  mixins: [shift, datetime, line],
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
      lineFilterId: 1
    }
  },
  created() {
    this.dateFilter = this.currentDate
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
