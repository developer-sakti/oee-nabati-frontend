export default {
  data() {
    return {
      currentTime: null,
      currentDate: null,
      currentDateTime: null,
      currentDayDateTime: null,
      month: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ],
      day: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  },
  created() {
    const date = new Date()
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    this.currentDate = date.getFullYear() + '-' + month + '-' + date.getDate()

    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    const second =
      date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    this.currentTime = hour + ':' + minute + ':' + second

    this.currentDateTime =
      this.formatDate(this.currentDate) + ' ' + this.currentTime

    this.currentDayDateTime = this.day[date.getDay] + ', ' + this.currentDate
  },
  methods: {
    formatDate(date) {
      const temp = date.split('-')
      return temp[2] + ' ' + this.month[parseInt(temp[1]) - 1] + ' ' + temp[0]
    },
    formatTime(param) {
      const temp = parseInt(param % 60)
      const hour =
        parseInt(param / 60) > 9
          ? parseInt(param / 60)
          : '0' + parseInt(param / 60)
      const minute = temp > 9 ? temp : '0' + temp
      const second = this.getValueComma(param)

      return hour + ':' + minute + ':' + second
    },
    getValueComma(param) {
      const stringValue = param.toString()
      const comma = stringValue.includes('.')
      if (comma) {
        return parseInt((param % 1) * 60)
      } else {
        return '00'
      }
    }
  }
}
