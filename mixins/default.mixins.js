export default {
  data() {
    return {
      dateTime: null,
      timeInterval: ''
    }
  },
  methods: {
    setDateTime() {
      const date = new Date()
      const currentDate =
        this.days[date.getDay()] +
        ', ' +
        date.getDate() +
        '-' +
        this.month[date.getMonth()] +
        '-' +
        date.getFullYear()
      const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      const minute =
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      const second =
        date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      const currentTime = hour + ':' + minute + ':' + second
      this.dateTime = currentDate + ' ' + currentTime
    }
  }
}
