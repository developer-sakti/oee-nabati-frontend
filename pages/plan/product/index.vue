<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title class="primary" dark>
            <span class="headline white--text">Production Planning</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="Tanggal" />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="PO Number"
                  type="text"
                  solo
                  flat
                  required
                />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select label="Line" solo light flat />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select label="Shift" solo light flat />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-select label="SKU" solo light flat />
              </v-flex>

              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="Target" />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="Start" />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="End" />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="Standart CT" />
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field solo light flat placeholder="Bottle Neck CT" />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="pr-5">
            <v-spacer />
            <v-btn color="orange darken-2" dark>Reset</v-btn>
            <v-btn color="primary">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title class="primary">
            <v-layout row wrap>
              <v-flex xs8 sm8 md8>
                <span class="headline white--text">PO List</span>
              </v-flex>
              <v-flex xs4 sm4 md4 class="pa-0">
                <v-select label="Line" solo light flat />
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text class="py-0">
            <v-layout>
              <v-flex>
                <v-card flat>
                  <v-card-title class="title font-weight-regular">
                    Active
                  </v-card-title>
                  <v-card-text class="cyan lighten-2 px-3">
                    <v-layout>
                      <v-flex xs2 sm2 md2>
                        Line
                      </v-flex>
                      <v-flex xs1 sm1 md1>
                        :
                      </v-flex>
                      <v-flex xs3 sm3 md3>
                        23
                      </v-flex>
                      <!-- <v-flex xs2 sm2 md2>
                        Line
                      </v-flex>
                      <v-flex xs1 sm1 md1>
                        :
                      </v-flex>
                      <v-flex xs3 sm3 md3>
                        23
                      </v-flex> -->
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style>
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  border: 2px solid #bdbdbd;
}
.v-input__control .v-input__slot {
  margin: 0px;
}
</style>
