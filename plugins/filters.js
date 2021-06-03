import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (val) => {
  if (val) {
    return moment(String(val)).format('H:mm DD.MM.YYYY')
  }
})
