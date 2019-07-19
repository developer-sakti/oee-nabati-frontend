<template>
  <v-container grid-list-md fill-height fluid>
    <v-toolbar app flat class="transparent pt-3 px-5">
      <v-card class="round-right" width="15vw" color="primary" dark>
        <v-card-title class="pa-2">
          <v-icon size="35">
            mdi-account
          </v-icon>
          <span class="title ml-3">Operator</span>
        </v-card-title>
      </v-card>
      <v-toolbar-title class="font-weight-bold">
        <span class="ml-5">{{ hmi }}</span>
      </v-toolbar-title>
      <v-select
        v-model="lineSelected"
        class="ml-5 select-line title font-weight-regular"
        :items="lines"
        item-text="text"
        item-value="value"
        solo
      />
      <v-btn large round color="yellow" class="ml-5">
        <span class="title font-weight-regular">rework</span>
      </v-btn>
      <v-spacer />
      <v-icon size="40" class="transparent" color="red">
        mdi-signal
      </v-icon>
    </v-toolbar>
    <v-layout row class="px-5 pt-3">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card class="card-rounded mx-3">
          <v-card-text class="pa-0 ma-0">
            <v-toolbar flat dark color="primary" class="round-top px-3">
              <v-layout row class="text-xs-center">
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
                  :key="mechine"
                  row
                  class="text-xs-center"
                  align-center
                >
                  <v-flex xs6 sm6 md6>
                    <span class="title ml-3">{{ mechine }}</span>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-btn
                      large
                      round
                      color="primary"
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
                        ? ' text-xs-left subheading grey-background'
                        : 'text-xs-left subheading'
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
    <v-dialog v-model="downtimeDialog" max-width="50vw" persistent>
      <v-card color="primary" dark flat>
        <v-card-title class="round-top">
          <v-spacer />
          <div class="title-wrapper px-3 pb-2">
            <v-layout column class="text-xs-center">
              <v-flex>
                <span class="headline font-weight-bold">Downtime</span>
              </v-flex>
              <v-flex>
                <span>{{ currentDate }} | {{ currentTime }}</span>
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
        <v-card-text class="px-5">
          <v-layout row justify-center>
            <v-flex xs12 sm10 md8>
              <v-layout row>
                <v-flex xs2 sm2 md2>
                  <span class="subheading font-weight-regular">Mesin</span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <span class="subheading black--text font-weight-bold">{{
                    downtimeMechine
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
                    v-model="downtimeCategory"
                    class="select-downtime-category subheading"
                    :items="downtimeCategories"
                    item-text="text"
                    item-value="value"
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
                  <v-text-field solo class="round-text-field" light />
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
                  <v-text-field solo class="round-text-field" light />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn block color="green" large round class="mx-5">
            simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'hmi',
  data() {
    return {
      date: new Date(),
      lines: [{ value: 34, text: 'Line 34' }, { value: 36, text: 'Line 36' }],
      downtimeCategories: [
        { value: 1, text: 'Planned Downtime' },
        { value: 2, text: 'Unplanned Downtime' }
      ],
      downtimeCategory: 1,
      lineSelected: null,
      downtimeDialog: false,
      downtimeMechine: null,
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
          size: '15px'
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          verticalNativeBarPos: 'right'
        }
      },
      hmi: 'HMI A',
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
    currentDate() {
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nop',
        'Des'
      ]
      return (
        this.date.getDate() +
        '-' +
        month[this.date.getMonth()] +
        '-' +
        this.date.getFullYear()
      )
    },
    currentTime() {
      const hour =
        this.date.getHours() > 9
          ? this.date.getHours()
          : '0' + this.date.getHours()
      const minute =
        this.date.getMinutes() > 9
          ? this.date.getMinutes()
          : '0' + this.date.getMinutes()
      const second =
        this.date.getSeconds() > 9
          ? this.date.getSeconds()
          : '0' + this.date.getSeconds()
      return hour + ':' + minute + ':' + second
    }
  },
  watch: {
    lineSelected(value) {
      switch (value) {
        case 34:
          this.mechines = ['Baking', 'Creaming', 'Mixing']
          break
        case 36:
          this.mechines = ['Baking', 'Mixing']
          break
      }
    }
  },
  created() {
    this.lineSelected = 34
  },
  methods: {
    showDowntimeDialog(mechine) {
      this.downtimeMechine = mechine
      this.downtimeDialog = true
    },
    resetDowntimeDialog() {
      this.downtimeMechine = null
      this.downtimeDialog = false
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

.select-line .v-input__control .v-input__slot .v-select__slot {
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
  right: 8px !important;
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
</style>
