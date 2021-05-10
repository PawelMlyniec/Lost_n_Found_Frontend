'use strict'

export default {
  getLostItem(axios, id) {
    return axios.get(`http://34.98.81.177/lostReports/${id}`)
  },

  getLostItems(axios) {
    return axios.get('http://34.98.81.177/lostReports')
  },

  resolveLostItem(axios, id) {
    return axios.post(`http://34.98.81.177/lostReports/${id}/resolve`)
  },

  deleteLostItem(axios, id) {
    return axios.delete(`http://34.98.81.177/lostReports/${id}`)
  },
  getLostItems(axios, page, size, body){
    return axios.post('http://34.98.81.177/lostReports/searches?page='+page+'&size='+size, body)
  }
}
