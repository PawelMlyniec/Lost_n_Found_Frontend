'use strict'

export default {
  getAuthHeader() {
    const token = localStorage.getItem('access_token')
    const headers = token ? { Authorization: 'Bearer ' + token } : {}
    return headers
  },

  getLostItem(axios, id) {
    return axios.get(`/lostReports/${id}`, {
      withCredentials: true,
      headers: this.getAuthHeader(),
    })
  },

  resolveLostItem(axios, id) {
    return axios.post(
      `/lostReports/${id}/resolve`,
      {},
      {
        withCredentials: true,
        headers: this.getAuthHeader(),
      }
    )
  },

  deleteLostItem(axios, id) {
    return axios.delete(`/lostReports/${id}`, {
      withCredentials: true,
      headers: this.getAuthHeader(),
    })
  },

  getLostItems(axios, page, size, body) {
    return axios.post(
      '/lostReports/searches?page=' + page + '&size=' + size,
      body
    )
  },

  addLostItemPost(axios, { title, description, category, dateFrom, dateTo, tags }) {
    return axios.post(
      '/lostReports',
      {
        title,
        description,
        category,
        dateFrom,
        dateTo,
        tags
      },
      {
        headers: this.getAuthHeader(),
      },
      
    )
  },

  updateLostItem(axios, lostReportId, { title, description, category, dateFrom, dateTo }) {
    return axios.put(
      `/lostReports/${lostReportId}`,
      {
        title,
        description,
        category,
        dateFrom,
        dateTo
      },
      {
        withCredentials: true,
        headers: this.getAuthHeader(),
      }
    )
  },
}
