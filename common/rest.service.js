'use strict'

export default {
  getLostItem(axios, id) {
    return axios.get(`/lostReports/${id}`)
  },

  getLostItems(axios) {
    return axios.get('/lostReports')
  },

  resolveLostItem(axios, id) {
    return axios.post(`/lostReports/${id}/resolve`)
  },

  deleteLostItem(axios, id) {
    return axios.delete(`/lostReports/${id}`)
  },
}
