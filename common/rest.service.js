'use strict'

export default {
  getLostItem(axios, id) {
    // return axios.get(`/lostReports/${id}`)
    return axios.get(`/lostReports/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
  },

  // getLostItems(axios) {
  //   return axios.get('/lostReports')
  // },

  resolveLostItem(axios, id) {
    return axios.post(`/lostReports/${id}/resolve`)
  },

  deleteLostItem(axios, id) {
    return axios.delete(`/lostReports/${id}/delete`)
  },

  getLostItems(axios, page, size, body) {
    return axios.post(
      '/lostReports/searches?page=' + page + '&size=' + size,
      body
    )
  },

  addLostItemPost(axios, { title, description, category }) {
    return axios.post('/lostReports', {
      title,
      description,
      category,
    })
  },

  updateLostItem(axios, { lostReportId, title, description, category }) {
    return axios.put(`/lostReports/${lostReportId}/edit`, {
      title,
      description,
      category,
    })
  },
}
