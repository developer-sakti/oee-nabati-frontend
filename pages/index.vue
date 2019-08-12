<template>
  <v-container grid-list-md fluid class="no-select">
    <v-layout row wrap>
      <v-flex xs12 sm12 md5>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-card color="blue darken-3" dark>
              <v-card-title class="pb-0">
                <span class="title">Productivity</span>
              </v-card-title>
              <v-card-text>
                <span>Detail</span>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-card color="indigo darken-3" dark>
              <v-card-title class="pb-0">
                <span class="title">Calculation</span>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap align-center>
                  <v-flex xs6 sm6 md6>
                    <v-layout justify-center>
                      <v-progress-circular
                        size="100"
                        width="15"
                        value="80"
                        color="primary lighten-2"
                      >
                        <span class="headline white--text">80%</span>
                      </v-progress-circular>
                    </v-layout>
                    <v-layout justify-center class="mt-1">
                      <span class="subheading font-weight-bold">OEE</span>
                    </v-layout>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-layout row wrap class="text-xs-center">
                      <v-flex xs12 sm12 md6>
                        <v-layout justify-center>
                          <v-progress-circular
                            size="45"
                            width="5"
                            value="80"
                            color="warning lighten-2"
                          >
                            <span class="body-1 white--text">80%</span>
                          </v-progress-circular>
                        </v-layout>
                        <v-layout justify-center class="mt-1">
                          <span class="caption font-weight-bold">
                            Availability
                          </span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm12 md6>
                        <v-layout justify-center>
                          <v-progress-circular
                            size="45"
                            width="5"
                            value="80"
                            color="error lighten-2"
                          >
                            <span class="body-1 white--text">80%</span>
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
                            size="45"
                            width="5"
                            value="80"
                            color="success lighten-2"
                          >
                            <span class="body-1 white--text">80%</span>
                          </v-progress-circular>
                        </v-layout>
                        <v-layout justify-center class="mt-1">
                          <span class="caption font-weight-bold">Quality</span>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md7>
        <v-card color="success" dark height="85vh">
          <v-card-text class="pa-0">
            <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="5">
              <gmap-marker
                v-for="(item, index) in markers"
                :key="index"
                :position="item.position"
                @click="center = item.position"
              />
            </gmap-map>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      center: { lat: -3.350235, lng: 111.995865 },
      mapTypeId: 'roadmap',
      markers: [{ position: { lat: -6.9127778, lng: 107.6205556 } }]
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
</style>
