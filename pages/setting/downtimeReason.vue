<template>
  <v-container fluid grid-list-md>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.color"
      :timeout="3000"
      bottom
      left
    >
      {{ snackbar.text }}
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title class="primary" dark>
            <span class="headline white--text">Form Input</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="formReason" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="form.reason"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    placeholder="Name"
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    v-model="form.downtimeCategoryId"
                    label="Category"
                    :rules="[rules.required]"
                    solo
                    flat
                    light
                    :items="categories"
                    item-text="category"
                    item-value="id"
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    v-model="form.machineId"
                    label="Machine"
                    :rules="[rules.required]"
                    solo
                    flat
                    light
                    :items="machines"
                    item-text="name"
                    item-value="id"
                  />
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="orange darken-2" dark @click="reset()">
              {{ update ? 'Cancel' : 'Reset' }}
            </v-btn>
            <v-btn color="primary" @click="submit()">{{
              update ? 'Update' : 'save'
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title class="primary">
            <span class="headline white--text">Downtime Reason List</span>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="reasons">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.reason }}</td>
                <td class="text-xs-left">{{ props.item.category }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="align-center">
                  <v-layout row wrap>
                    <v-flex xs6 sm6 md6>
                      <v-icon class="mr-2" @click="editItem(props.item)">
                        edit
                      </v-icon>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                      <v-icon @click="showDelete(props.item)">
                        delete
                      </v-icon>
                    </v-flex>
                  </v-layout>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-text>
          <span class="subheading">
            Are you sure want to delete {{ deletedItem.reason }} ?
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="orange darken-1"
            flat
            class="text-none"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            class="text-none"
            flat
            @click="deleteItem()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import defaultMixins from '~/mixins/default.mixins'
export default {
  middleware: ['auth'],
  mixins: [defaultMixins],
  head() {
    return {
      title: 'Setting Downtime Category - Machine Vision'
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Category',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Machine',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Action',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      categories: [],
      machines: [],
      reasons: [],
      valid: true,
      update: false,
      rules: {
        required: value => !!value || 'Field is required'
      },
      form: {
        id: null,
        reason: null,
        machineId: null,
        downtimeCategoryId: null
      },
      durationMenu: false,
      deleteDialog: false,
      deletedItem: {
        id: null,
        reason: null
      }
    }
  },
  created() {
    this.$axios
      .get(process.env.SERVICE_URL + '/downtime-category')
      .then(res => {
        this.categories = res.data
      })
    this.$axios.get(process.env.SERVICE_URL + '/machine').then(res => {
      this.machines = res.data
    })
    this.getReasonList()
  },
  methods: {
    submit() {
      if (this.$refs.formReason.validate()) {
        this.snackbar = true
        if (!this.update) {
          this.$axios
            .post(
              process.env.SERVICE_URL + '/downtime-reason-machine/create',
              this.form
            )
            .then(res => {
              if (res.status == 201) {
                this.getReasonList()
                this.reset()
                this.snackbar = {
                  status: true,
                  text: 'Reason saved successfully',
                  color: 'success'
                }
              } else {
                this.snackbar = {
                  status: true,
                  text: 'Reason saved failed',
                  color: 'error'
                }
              }
            })
        } else {
          this.$axios
            .patch(
              process.env.SERVICE_URL +
                '/downtime-reason-machine/' +
                this.form.id,
              this.form
            )
            .then(res => {
              if (res.status == 200) {
                this.getReasonList()
                this.reset()
                this.snackbar = {
                  status: true,
                  text: 'Reason updated successfully',
                  color: 'success'
                }
              } else {
                this.snackbar = {
                  status: true,
                  text: 'Reason updated failed',
                  color: 'error'
                }
              }
            })
        }
      }
    },
    getReasonList() {
      this.reasons = []
      this.$axios
        .get(process.env.SERVICE_URL + '/downtime-reason-machine/all')
        .then(res => {
          this.reasons = res.data
        })
    },
    reset() {
      this.$refs.formReason.reset()
      this.update = false
    },
    editItem(item) {
      this.form = { ...item }
      this.update = true
    },
    showDelete(item) {
      this.deleteDialog = true
      this.deletedItem = { ...item }
    },
    deleteItem() {
      this.$axios
        .delete(
          process.env.SERVICE_URL +
            '/downtime-reason-machine/' +
            this.deletedItem.id
        )
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            this.getReasonList()
            this.deleteDialog = false
            this.snackbar = {
              status: true,
              text: 'Reason deleted successfully',
              color: 'success'
            }
          } else {
            this.deleteDialog = false
            this.snackbar = {
              status: true,
              text: 'Reason deleted failed',
              color: 'error'
            }
          }
        })
    }
  }
}
</script>
<style>
.v-input__slot {
  margin-bottom: 0px !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  border: 2px solid #bdbdbd !important;
}
.v-input__control .v-input__slot {
  margin: 0px !important;
}
.v-menu--inline {
  display: inline-block;
  background-color: #ffffff;
  width: 100% !important;
}
</style>
