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
    <v-layout>
      <v-flex v-if="oee.length == 0" xs12 sm12 md12>
        <v-card color="primary" dark>
          <v-card-title class="card-header mx-3">
            <span class="headline white--text font-weight-bold">Line -</span>
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
                        :value="0"
                        color="blue lighten-3"
                      >
                        <span class="display-2 font-weight-bold white--text">
                          0%
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
                            :value="0"
                            color="warning"
                          >
                            <span class="caption white--text">
                              0%
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
                            :value="0"
                            color="error"
                          >
                            <span class="caption white--text">
                              0%
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
                            :value="0"
                          >
                            <span class="caption white--text">
                              0%
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
                    Shift -
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    PO Number
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    #
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    SKU
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    #
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Target
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    0 Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Standart CT
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    0 Minutes
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Bottle Neck CT
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    0 Minutes
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
                    0 Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Total Defect
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    0 Carton
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md5>
                    Pieces to Target
                  </v-flex>
                  <v-flex xs6 sm6 md7>
                    0 Carton
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3" row wrap>
      <v-flex v-for="item in oee" :key="item.id" xs12 sm12 md12>
        <v-card
          color="primary"
          dark
          :to="{ path: '/production/' + item.lineId, param: { shift: 1 } }"
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
      po: []
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
            this.oee = res.data.oee_shift
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
