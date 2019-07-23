<template>
  <v-container grid-list-md fill-height fluid>
    <v-toolbar app flat class="transparent pt-3 px-5">
      <v-card class="round-right" width="15vw" color="primary" dark>
        <v-card-title class="pa-2 no-select">
          <v-icon size="35">
            mdi-account
          </v-icon>
          <span class="title ml-3">Operator</span>
        </v-card-title>
      </v-card>
      <v-toolbar-title class="font-weight-bold">
        <span class="ml-5 no-select">{{ hmi === null ? '' : hmi.name }}</span>
      </v-toolbar-title>
      <v-select
        v-model="lineSelected"
        class="ml-5 select-line title font-weight-regular no-select"
        :items="lines"
        item-text="text"
        item-value="value"
        solo
      />
      <v-btn
        large
        round
        color="yellow"
        class="ml-5"
        @click="showReworkDialog()"
      >
        <span class="title font-weight-regular no-select">rework</span>
      </v-btn>
      <v-spacer />
      <span class="title mr-5 no-select">
        {{ dateTime }}
      </span>
      <v-icon size="40" class="transparent" color="red">
        mdi-signal
      </v-icon>
    </v-toolbar>
    <v-layout row class="px-5 pt-3">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card class="card-rounded mx-3">
          <v-card-text class="pa-0 ma-0">
            <v-toolbar flat dark color="primary" class="round-top px-3">
              <v-layout row class="text-xs-center no-select">
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>settings</v-icon>
                  <span class="title ml-1">Mesin</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-pulse</v-icon>
                  <span class="title ml-1">Aksi</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-history</v-icon>
                  <span class="title ml-1">Histori</span>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-card-text>
          <v-card-text>
            <v-layout row class="text-xs-center">
              <v-flex xs8 sm8 md8 lg8 xl8>
                <v-layout
                  v-for="mechine in mechines"
                  :key="mechine.id"
                  row
                  class="text-xs-center no-select"
                  align-center
                >
                  <v-flex xs6 sm6 md6>
                    <span class="title ml-3">{{ mechine.name }}</span>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-btn
                      large
                      round
                      color="primary"
                      class="no-select"
                      @click="showDowntimeDialog(mechine)"
                    >
                      downtime
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs4 sm4 md4 class="pr-3 history-wrapper">
                <vue-scroll :ops="scrollOptions">
                  <v-layout
                    v-for="(histori, index) in histories"
                    :key="index"
                    column
                    :class="
                      (index + 1) % 2 == 0
                        ? ' text-xs-left subheading grey-background no-select'
                        : 'text-xs-left subheading no-select'
                    "
                  >
                    <v-flex class="pl-5 pb-0 mt-1">
                      <span>{{ index + 1 }}. </span>
                      <span class="ml-2">{{ histori.type }} |</span>
                      <span class="red--text title">{{ histori.mechine }}</span>
                    </v-flex>
                    <v-flex class="ml-4 pl-5 py-0">
                      <span>
                        {{ histori.reason }}
                        {{ '{ ' + histori.duration + ' }' }}
                      </span>
                    </v-flex>
                    <v-flex class="ml-4 pl-5 pt-0">
                      <span>{{ histori.date }} | {{ histori.time }}</span>
                    </v-flex>
                  </v-layout>
                </vue-scroll>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="hmiTypeDialog" max-width="30vw" persistent>
      <v-card>
        <v-card-title class="pa-0 ma-0">
          <v-toolbar color="primary" dark>
            <v-spacer />
            <span class="title no-select">Setup HMI</span>
            <v-spacer />
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-list class="text-xs-center">
            <v-list-tile
              v-for="(item, index) in hmis"
              :key="index"
              @click="setupHMI(item)"
            >
              <v-layout>
                <v-flex>
                  <span class="no-select">{{ item.name }}</span>
                </v-flex>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="downtimeDialog" max-width="50vw" persistent>
      <v-card color="primary" dark flat>
        <v-card-title class="round-top py-0">
          <v-spacer />
          <div class="title-wrapper px-3 pb-2">
            <v-layout column class="text-xs-center">
              <v-flex>
                <span class="headline font-weight-bold no-select">
                  Downtime
                </span>
              </v-flex>
            </v-layout>
          </div>
          <v-spacer />
          <v-btn icon class="mb-5" @click="resetDowntimeDialog()">
            <v-icon size="30">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-3">
          <v-layout row justify-center class="no-select">
            <v-flex xs12 sm10 md8>
              <v-layout row>
                <v-flex xs2 sm2 md2>
                  <span class="subheading font-weight-regular">
                    Mesin
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <span class="subheading font-weight-bold">{{
                    downtimeMechine === null ? '' : downtimeMechine.name
                  }}</span>
                </v-flex>
              </v-layout>
              <v-layout row align-center class="mt-3">
                <v-flex xs2 sm2 md2>
                  <span class="subheading font-weight-regular">Kategori</span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs9 sm9 md9>
                  <v-select
                    v-model="downtimeCategorySelected"
                    class="select-downtime-category subheading"
                    :items="downtimeCategories"
                    item-text="name"
                    item-value="id"
                    label="Pilih"
                    solo
                    light
                  />
                </v-flex>
              </v-layout>
              <v-layout row class="my-3" align-center>
                <v-flex xs2 sm2 md2>
                  <span class="subheading font-weight-regular">Alasan</span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs9 sm9 md9>
                  <v-select
                    v-model="downtimeReasonSelected"
                    class="select-downtime-category subheading"
                    :items="downtimeReasons"
                    label="Pilih"
                    solo
                    light
                  />
                </v-flex>
              </v-layout>
              <v-layout row align-center>
                <v-flex xs2 sm2 md2>
                  <span class="subheading font-weight-regular">Durasi</span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs9 sm9 md9>
                  <v-text-field
                    solo
                    class="round-text-field"
                    light
                    type="number"
                  >
                    <template v-slot:append>
                      <span class="black--text mr-3">menit</span>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            block
            color="green"
            large
            round
            class="mx-5 no-select"
            @click="resetDowntimeDialog()"
          >
            simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reworkDialog" max-width="60vw" persistent>
      <v-card color="primary" dark flat>
        <v-card-title class="round-top py-0">
          <v-spacer />
          <div class="title-wrapper px-3 pb-2">
            <v-layout column class="text-xs-center">
              <v-flex>
                <span class="headline font-weight-bold no-select">
                  Rework
                </span>
              </v-flex>
            </v-layout>
          </div>
          <v-spacer />
          <v-btn icon class="mb-5" @click="resetReworkDialog()">
            <v-icon size="30">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-3">
          <v-layout row justify-center class="no-select">
            <v-flex xs12 sm12 md10>
              <v-layout row>
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Adonan Mixing
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row align-center class="mt-3">
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bubble Baking
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row align-center class="mt-3">
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Sheet Baking
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row align-center class="mt-3">
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Kue Packaging
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row class="mt-3" align-center>
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Kue Creaming
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row class="mt-3" align-center>
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Kue Cooling
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row class="mt-3" align-center>
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Kue Cutting
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row class="my-3" align-center>
                <v-flex xs5 sm5 md5>
                  <span class="subheading font-weight-regular">
                    Bad Stock Toll Packaging
                  </span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field
                    solo
                    class="round-text-field .rework-input"
                    light
                    type="number"
                  >
                    <template v-slot:prepend class="ma-0 pa-0">
                      <v-btn fab dark color="warning" class="ma-0 pa-0" small>
                        <v-icon dark>
                          remove
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <span class="black--text mr-3">carton</span>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn fab dark color="indigo" class="ma-0 pa-0" small>
                        <v-icon dark>
                          add
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            block
            color="green"
            large
            round
            class="mx-5 no-select"
            @click="resetDowntimeDialog()"
          >
            simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Default from '~/mixins/default.mixins'
import Hmi from '~/mixins/hmi.mixins'
export default {
  layout: 'hmi',
  middleware: ['initHmi'],
  mixins: [Default, Hmi],
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
          size: '20px'
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          verticalNativeBarPos: 'right'
        }
      },
      downtimeDialog: false,
      hmiTypeDialog: false,
      reworkDialog: false,
      lines: [{ text: '', value: null }],
      lineSelected: null,
      downtimeCategories: [],
      downtimeCategorySelected: null,
      downtimeMechine: null,
      downtimeReasons: [],
      downtimeReasonSelected: null,
      mechines: [],
      histories: [
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        },
        {
          type: 'UPDT',
          mechine: 'Baking',
          reason: 'Lampu Mati',
          duration: '00:20:00',
          date: '12-03-2019',
          time: '08:11:12'
        }
      ]
    }
  },
  computed: {
    hmi() {
      return this.$store.getters.hmi
    }
  },
  watch: {
    lineSelected(value) {
      this.mechines = this.hmi.lines[value].machines
    },
    downtimeCategorySelected(value) {
      if (value !== null) {
        for (let i = 0; i < this.downtime.length; i++) {
          if (this.downtimeMechine.id == this.downtime[i].mechineId) {
            for (let j = 0; j < this.downtime[i].reasons.length; j++) {
              if (value == this.downtime[i].reasons[j].typeId) {
                this.downtimeReasons = this.downtime[i].reasons[j].reason
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.setDateTime()
    }, 1000)
    this.setDateTime()
  },
  created() {
    if (this.hmi === null) {
      this.hmiTypeDialog = true
    } else {
      this.setup()
    }
  },
  methods: {
    setup() {
      const lines = []
      for (let i = 0; i < this.hmi.lines.length; i++) {
        lines.push({
          text: this.hmi.lines[i].name,
          value: i
        })
      }
      this.lines = lines
      this.lineSelected = 0
    },
    setupHMI(hmi) {
      this.$store.dispatch('setHmi', hmi)
      this.hmiTypeDialog = false
      this.setup()
    },
    showDowntimeDialog(mechine) {
      this.downtimeMechine = mechine
      for (let i = 0; i < this.downtime.length; i++) {
        if (mechine.id == this.downtime[i].mechineId) {
          this.downtimeCategories = this.downtime[i].types
        }
      }
      this.downtimeDialog = true
    },
    resetDowntimeDialog() {
      this.downtimeMechine = null
      this.downtimeDialog = false
      this.downtimeCategories = []
      this.downtimeCategorySelected = null
      this.downtimeReasons = []
      this.downtimeReasonSelected = null
    },
    showReworkDialog() {
      this.reworkDialog = true
    },
    resetReworkDialog() {
      this.reworkDialog = false
      console.log(process.env.SERVICE_URL)
    }
  }
}
</script>
<style>
.select-line {
  max-width: 12vw;
}

.select-line .v-input__control .v-input__slot {
  margin: 0px;
  border-radius: 20px !important;
  background-color: yellow !important;
}

.select-line .v-input__control .v-input__sl smallot .v-select__slot {
  padding-left: 2vw;
}

.select-downtime-category .v-input__control .v-input__slot {
  margin: 0px;
  border-radius: 20px !important;
  background-color: #e5e5e5 !important;
}
.select-downtime-category .v-input__control .v-text-field__details {
  display: none;
}

.__bar-wrap-is-vertical {
  right: 14px !important;
}
.history-wrapper {
  max-height: 60vh;
  border-left: 2px solid grey;
}
.title-wrapper {
  border-bottom: 3px solid white;
}
.downtime-dialog {
  border-radius: 10px;
}
.v-text-field.v-text-field--solo .v-input__prepend-outer {
  margin: 0px 5px 0px 0px !important;
}
.v-text-field.v-text-field--solo .v-input__append-outer {
  margin: 0px 0px 0px 5px !important;
}
</style>
