<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap class="mt-3">
      <v-flex md3 class="text-xs-left">
        <span class="display-2 line-style pa-3">Line 13</span>
      </v-flex>
      <v-flex md6 class="text-xs-center no-select">
        <span class="display-2 yellow-text  font-weight-bold">
          PO#1124 | Wafer 100 gr
        </span>
      </v-flex>
      <v-flex md3 class="text-xs-right">
        <span class="display-2 clock-style pa-3">{{ clock }}</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex md12>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Target</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="target"
                        light
                        solo
                        class="pa-0 display-1"
                      >
                        <template v-slot:append>
                          <span class="orange-text mr-3 display-1">
                            Karton
                          </span>
                        </template>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">OEE</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="oee"
                        light
                        solo
                        class="pa-0 display-1 green-text-input"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt-3">
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Good</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="good"
                        light
                        solo
                        class="pa-0 display-1"
                      >
                        <template v-slot:append>
                          <span class="orange-text mr-3 display-1">
                            Karton
                          </span>
                        </template>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Avail</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="avail"
                        light
                        solo
                        class="pa-0 display-1 green-text-input"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt-3">
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Loss</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="loss"
                        light
                        solo
                        class="pa-0 display-1 brown-text-input"
                      >
                        <template v-slot:append>
                          <span class="orange-text mr-3 display-1">
                            Karton
                          </span>
                        </template>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Perf</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="perf"
                        light
                        solo
                        class="pa-0 display-1 green-text-input"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt-3">
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">MTTF</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="mttf"
                        light
                        solo
                        class="pa-0 text-xs-center display-1"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">Qual</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="qual"
                        light
                        solo
                        class="pa-0 display-1 green-text-input"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt-3">
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">MTTR</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="mttr"
                        light
                        solo
                        class="pa-0 display-1"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-text class="py-0">
                  <v-layout row wrap align-center>
                    <v-flex md6>
                      <span class="display-1">MTBF</span>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="mtbf"
                        light
                        solo
                        class="pa-0 display-1 green--text"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="ma-0">
      <v-flex md12 class="text-xs-center downtime py-3">
        <span class="display-2">DOWNTIME (00:20:15)</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import defaultMixins from '~/mixins/default.mixins'
export default {
  layout: 'tv',
  mixins: [defaultMixins],
  data() {
    return {
      target: 11500,
      oee: '100,00%',
      good: 1250,
      avail: '100,00%',
      loss: 1370,
      perf: '100,00%',
      mttf: '00:10:00',
      qual: '100,00%',
      mttr: '00:10:00',
      mtbf: '00:10:00'
    }
  }
}
</script>
<style>
.downtime {
  width: 100vw;
  bottom: 0px;
  position: absolute;
  background: #ff1744;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
.v-input input {
  text-align: center;
}
.green-text-input .v-input__control .v-input__slot .v-text-field__slot input {
  color: #00c853 !important;
}
.red-text-input .v-input__control .v-input__slot .v-text-field__slot input {
  color: #ff1744 !important;
}
.brown-text-input .v-input__control .v-input__slot .v-text-field__slot input {
  color: #4e342e !important;
}
.orange-text {
  color: #d84315 !important;
}
.yellow-text {
  color: #ffca28 !important;
}
.line-style {
  color: #00c853 !important;
  border-right: 3px solid white;
  border-bottom: 3px solid white;
}
.clock-style {
  color: #ff1744;
  border-bottom: 3px solid white;
  border-left: 3px solid white;
}
</style>
