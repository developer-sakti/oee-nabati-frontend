export default {
  data() {
    return {
      snackbar: {
        status: false,
        text: '',
        color: ''
      },
      alert: {
        status: false,
        message: '',
        type: 'info'
      },
      valid: true,
      rules: {
        required: value => !!value || 'Field is required'
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    token() {
      return {
        headers: { Authorization: 'Bearer ' + this.$store.getters.auth }
      }
    }
  },
  methods: {
    showSnackbar(snackbar) {
      this.snackbar = snackbar
    },
    onDismissed() {
      this.alert = {
        status: false,
        message: '',
        type: 'info'
      }
    }
  }
}
