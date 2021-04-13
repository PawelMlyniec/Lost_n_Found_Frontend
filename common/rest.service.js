'use strict'

export default {
  getItem(axios) {
    return axios.get('/item')
  },
  getLostItem(axios) {
    return axios.get('/lost_tem')
  },
}
