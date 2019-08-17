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
            <v-form ref="formSKU" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.code"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    placeholder="Code"
                  />
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="form.name"
                    :rules="[rules.required]"
                    solo
                    light
                    flat
                    placeholder="Name"
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
            <span class="headline white--text">SKU List</span>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="skus">
              <template v-slot:items="props">
                <td>{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="align-center">
                  <v-icon class="mr-2" @click="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon @click="showDelete(props.item)">
                    delete
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-text>
          <span class="subheading">
            Are you sure want to delete {{ deletedItem.code }} ?
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
import line from '~/mixins/line.select'
export default {
  middleware: ['auth'],
  mixins: [defaultMixins, line],
  head() {
    return {
      title: 'Setting SKU - Machine Vision'
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Code',
          align: 'left',
          sortable: false,
          value: 'code'
        },
        {
          text: 'Name',
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
      skus: [],
      valid: true,
      form: {
        id: null,
        code: null,
        name: null
      },
      rules: {
        required: value => !!value || 'Field is required'
      },
      update: false,
      deleteDialog: false,
      deletedItem: {
        code: null,
        name: null
      }
    }
  },
  created() {
    this.getSKUList()
  },
  methods: {
    getSKUList() {
      this.skus = []
      this.$axios
        .get(process.env.SERVICE_URL + '/initial-sku', this.token)
        .then(res => {
          this.skus = res.data
        })
    },
    submit() {
      if (this.$refs.formSKU.validate()) {
        this.snackbar = true
        if (!this.update) {
          this.$axios
            .post(
              process.env.SERVICE_URL + '/initial-sku',
              this.form,
              this.token
            )

            .then(res => {
              if (res.status == 201) {
                this.getSKUList()
                this.reset()
                this.snackbar = {
                  status: true,
                  text: 'SKU saved successfully',
                  color: 'success'
                }
              } else {
                this.snackbar = {
                  status: true,
                  text: 'SKU saved failed',
                  color: 'error'
                }
              }
            })
        } else {
          this.$axios
            .put(
              process.env.SERVICE_URL + '/initial-sku/' + this.form.id,
              this.form,
              this.token
            )
            .then(res => {
              if (res.status == 200) {
                this.getSKUList()
                this.reset()
                this.snackbar = {
                  status: true,
                  text: 'SKU updated successfully',
                  color: 'success'
                }
              } else {
                this.snackbar = {
                  status: true,
                  text: 'SKU updated failed',
                  color: 'error'
                }
              }
            })
        }
      }
    },
    reset() {
      this.$refs.formSKU.reset()
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
          process.env.SERVICE_URL + '/initial-sku/' + this.deletedItem.id,
          this.token
        )
        .then(res => {
          if (res.status == 200) {
            this.getSKUList()
            this.deleteDialog = false
            this.snackbar = {
              status: true,
              text: 'SKU deleted successfully',
              color: 'success'
            }
          } else {
            this.deleteDialog = false
            this.snackbar = {
              status: true,
              text: 'SKU deleted failed',
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
