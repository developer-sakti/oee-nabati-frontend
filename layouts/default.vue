<template>
  <v-app>
    <!-- <v-navigation-drawer
      mini-variant
      app
      clipped
      fixed
      class="hidden-sm-and-down"
    >
      <v-list>
        <v-list-tile
          v-for="(menu, i) in menus"
          :key="i"
          exact
          router
          :to="menu.route"
          class="py-2"
        >
          <v-list-tile-action>
            <v-icon size="26">{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="menu.text" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="py-2" @click="logoutDialog = true">
          <v-list-tile-action>
            <v-icon size="26" color="#E57373">mdi-logout-variant</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar color="white" app>
      <v-btn icon class="hidden-md-and-up">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        <v-img src="/logo.png" width="80" height="45" />
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-5">
        <v-btn flat class="text-none subheading" to="/home">Home</v-btn>
        <v-menu offset-y>
          <template slot="activator">
            <v-btn flat class="text-none subheading">
              Planning <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/plan/product">
              <v-list-tile-title>Production</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/plan/downtime">
              <v-list-tile-title>Downtime</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat class="text-none subheading" to="/production">
          Production
        </v-btn>
        <v-btn flat class="text-none subheading" to="/analysis">Analysis</v-btn>
        <v-btn flat class="text-none subheading" to="/report">Report</v-btn>
        <v-menu offset-y>
          <template slot="activator">
            <v-btn flat class="text-none subheading">
              Setting <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/setting/downtimeCategory">
              <v-list-tile-title>Downtime Category</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/setting/downtimeReason">
              <v-list-tile-title>Downtime Reason</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-spacer />
      <v-btn icon to="/profile">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn icon @click="logoutDialog = true">
        <v-icon color="orange darken-3">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="logoutDialog" max-width="400">
      <v-card>
        <v-card-text>
          <span class="subheading">
            Are you sure want to logout ?
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="orange darken-1"
            flat
            class="text-none"
            @click="logoutDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            class="text-none"
            flat
            @click="logout()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content class="pb-0">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      logoutDialog: false,
      bottomNav: 'home',
      menus: [
        { icon: 'mdi-home-outline', text: 'Home', route: 'home' },
        { icon: 'mdi-table-edit', text: 'Planning', route: 'plan' },
        { icon: 'mdi-cube-send', text: 'Production', route: 'production' },
        { icon: 'mdi-chart-line', text: 'Analysis', route: 'analysis' },
        { icon: 'mdi-cloud-print-outline', text: 'Report', route: 'report' },
        { icon: 'mdi-account-outline', text: 'Profile', route: 'profile' }
      ]
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>
