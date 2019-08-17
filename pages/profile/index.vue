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
      <v-flex xs12 sm12 md4>
        <v-card class="py-3">
          <v-card-text>
            <v-layout column align-center justify-center>
              <v-flex>
                <v-avatar size="100" color="green lighten-2">
                  <span class="display-2 white--text">B</span>
                </v-avatar>
              </v-flex>
              <v-flex>
                <span class="headline">{{
                  user.firstname === undefined ? '' : user.firstname
                }}</span>
                <span class="headline">{{
                  user.lastname === undefined ? '' : user.lastname
                }}</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="justify-center pb-5">
            <v-btn
              :color="profileWindow == 0 ? 'primary lighten-2' : ''"
              @click="profileWindow = 0"
            >
              Account Details
            </v-btn>
            <v-btn
              :color="profileWindow == 1 ? 'primary lighten-2' : ''"
              @click="profileWindow = 1"
            >
              Change Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title class="headline primary white--text">
            Account Details
          </v-card-title>
          <v-window v-model="profileWindow">
            <v-window-item :value="0">
              <v-card-text>
                <v-form ref="formUpdateProfile" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="formProfile.username"
                    label="Username"
                    disabled
                  />
                  <v-text-field
                    v-model="formProfile.firstname"
                    label="First Name"
                    :rules="[rules.required]"
                    clearable
                  />
                  <v-text-field
                    v-model="formProfile.lastname"
                    label="Last Name"
                    :rules="[rules.required]"
                    clearable
                  />
                </v-form>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="1">
              <v-card-text>
                <v-form
                  ref="formUpdatePassword"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="formPassword.oldPassword"
                    label="Old Password"
                    type="password"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="formPassword.newPassword"
                    label="New Password"
                    type="password"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="formPassword.confirmPassword"
                    label="Confirm Password"
                    type="password"
                    :rules="[rules.required, rules.notmatch]"
                  />
                </v-form>
              </v-card-text>
            </v-window-item>
          </v-window>
          <v-card-actions class="pa-3">
            <v-spacer />
            <v-btn class="primary" @click="update()">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import defaultMixins from '~/mixins/default.mixins'
export default {
  middleware: ['auth'],
  mixins: [defaultMixins],
  data() {
    return {
      profileWindow: 0,
      valid: true,
      formProfile: {
        username: null,
        firstname: null,
        lastname: null
      },
      formPassword: {
        username: null,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      },
      rules: {
        required: value => !!value || 'Field is required',
        notmatch: value =>
          value === this.formPassword.newPassword || 'Password not match'
      }
    }
  },
  created() {
    this.formProfile = { ...this.user }
  },
  methods: {
    update() {
      if (this.profileWindow == 0) {
        // update profile
        if (this.$refs.formUpdateProfile.validate()) {
          this.snackbar = true
          this.$axios
            .put(
              process.env.SERVICE + '/user/' + this.user.id,
              this.formProfile
            )
            .then(res => {
              if (res.status == 200) {
                this.$store.dispatch('updateUser', {
                  ...this.user,
                  ...this.formProfile
                })
                this.snackbar = {
                  status: true,
                  color: 'success',
                  text: 'Profile updated successfully'
                }
              } else {
                this.snackbar = {
                  status: true,
                  color: 'error',
                  text: 'Profile updated failed'
                }
              }
            })
        }
      } else {
        // update password
        // eslint-disable-next-line no-lonely-if
        if (this.$refs.formUpdatePassword.validate()) {
          this.snackbar = true
          this.$axios
            .patch(process.env.SERVICE_URL + '/auth/password', {
              username: this.user.username,
              oldPassword: this.formPassword.oldPassword,
              newPassword: this.formPassword.newPassword
            })
            .then(res => {
              if (res.status == 200) {
                this.snackbar = {
                  status: true,
                  color: 'success',
                  text: 'Password updated successfully'
                }
              }
            })
            .catch(e => {
              this.snackbar = {
                status: true,
                color: 'error',
                text: 'Password updated failed'
              }
            })
        }
      }
    }
  }
}
</script>
