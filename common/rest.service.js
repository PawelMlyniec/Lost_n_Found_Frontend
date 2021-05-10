'use strict'

export default {
  getLostItem(axios, id) {
    return axios.get(`/lostReports/${id}`)
  },

  // getLostItems(axios) {
  //   return axios.get('/lostReports')
  // },

  resolveLostItem(axios, id) {
    return axios.post(`/lostReports/${id}/resolve`)
  },

  deleteLostItem(axios, id) {
    return axios.delete(`/lostReports/${id}`)
  },

  getLostItems(axios, page, size, body) {
    return axios.post(
      '/lostReports/searches?page=' + page + '&size=' + size,
      body
    )
  },
}
