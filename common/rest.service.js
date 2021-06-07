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
  getFoundItem(axios, id) {
    return axios.get(`/foundReports/${id}`, {
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
  resolveFoundItem(axios, id) {
    return axios.post(
      `/foundReports/${id}/resolve`,
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

  deleteFoundItem(axios, id) {
    return axios.delete(`/foundReports/${id}`, {
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

  getFoundItems(axios, page, size, body) {
    return axios.post(
      '/foundReports/searches?page=' + page + '&size=' + size,
      body
    )
  },
  getMatchingFoundItems(
    axios,
    page,
    size,
    {
      title,
      description,
      category,
      dateFrom,
      dateTo,
      tags,
      city,
      telephoneNumber,
      emailAddress,
    }
  ) {
    return axios.post(
      '/foundReports/matching?page=' + page + '&size=' + size,
      {
        title,
        description,
        category,
        dateFrom,
        dateTo,
        tags,
        city,
        telephoneNumber,
        emailAddress,
      },
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  addLostItemPost(
    axios,
    {
      title,
      description,
      category,
      dateFrom,
      dateTo,
      tags,
      city,
      telephoneNumber,
      emailAddress,
    }
  ) {
    return axios.post(
      '/lostReports',
      {
        title,
        description,
        category,
        dateFrom,
        dateTo,
        tags,
        city,
        telephoneNumber,
        emailAddress,
      },
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  addFoundItemPost(
    axios,
    {
      title,
      description,
      category,
      foundDate,
      telephoneNumber,
      emailAddress,
      city,
    }
  ) {
    return axios.post(
      '/foundReports',
      {
        title,
        description,
        category,
        foundDate,
        telephoneNumber,
        emailAddress,
        city,
      },
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  updateLostItem(
    axios,
    lostReportId,
    {
      title,
      description,
      category,
      dateFrom,
      dateTo,
      city,
      tags,
      emailAddress,
      telephoneNumber,
    }
  ) {
    return axios.put(
      `/lostReports/${lostReportId}`,
      {
        title,
        description,
        category,
        dateFrom,
        dateTo,
        city,
        tags,
        emailAddress,
        telephoneNumber,
      },
      {
        withCredentials: true,
        headers: this.getAuthHeader(),
      }
    )
  },
  updateFoundItem(
    axios,
    id,
    {
      title,
      description,
      category,
      foundDate,
      city,
      emailAddress,
      telephoneNumber,
    }
  ) {
    return axios.put(
      `/foundReports/${id}`,
      {
        title,
        description,
        category,
        foundDate,
        city,
        emailAddress,
        telephoneNumber,
      },
      {
        withCredentials: true,
        headers: this.getAuthHeader(),
      }
    )
  },

  getMessageUnreadCount(axios, id) {
    return axios.get(
      `http://localhost:7070/textMessages/unread?id=${encodeURIComponent(id)}`,
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  getMessages(axios, id) {
    return axios.get(
      `http://localhost:7070/textMessages/chats?id=${encodeURIComponent(id)}`,
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  getChatBetweenUsers(axios, userId, targetUserId) {
    return axios.get(
      `http://localhost:7070/textMessages?firstUserId=${encodeURIComponent(
        userId
      )}&secondUserId=${encodeURIComponent(targetUserId)}`,
      {
        headers: this.getAuthHeader(),
      }
    )
  },

  sendMessage(axios, { sourceUserId, targetUserId, content }) {
    return axios.post(
      `http://localhost:7070/textMessages`,
      {
        sourceUserId,
        targetUserId,
        content,
      },
      {
        headers: this.getAuthHeader(),
      }
    )
  },
}
