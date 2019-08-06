<template>
  <v-app>
    <v-navigation-drawer
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
    </v-navigation-drawer>
    <v-toolbar color="primary" dark class="hidden-md-and-up">
      <v-toolbar-title>OEE Nabati</v-toolbar-title>
      <v-spacer />
      <v-btn icon to="/profile">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn icon @click="logoutDialog = true">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="logoutDialog" max-width="300">
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
    <v-content>
      <nuxt />
    </v-content>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      color="primary"
      fixed
      app
      class="hidden-md-and-up"
    >
      <v-btn dark to="/home" flat>
        <!-- <span class="caption">Home</span> -->
        <v-icon size="22">mdi-home-outline</v-icon>
      </v-btn>
      <v-btn dark flat value="plan" to="/plan">
        <!-- <span class="caption">Planning</span> -->
        <v-icon size="22">mdi-table-edit</v-icon>
      </v-btn>
      <v-btn dark flat value="production" to="/production">
        <!-- <span class="caption">Production</span> -->
        <v-icon size="22">mdi-cube-send</v-icon>
      </v-btn>
      <v-btn dark flat value="analysis" to="/analysis">
        <!-- <span class="caption">Analysis</span> -->
        <v-icon size="22">mdi-chart-line</v-icon>
      </v-btn>
      <v-btn dark flat value="report" to="/report">
        <!-- <span class="caption">Report</span> -->
        <v-icon size="22">mdi-cloud-print-outline</v-icon>
      </v-btn>
    </v-bottom-nav>
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
