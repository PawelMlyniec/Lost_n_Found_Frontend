export const state = {
  pageName: '',
}

export const mutations = {
  SET_PAGE_NAME(state, payload) {
    state.pageName = payload
  },
}

export const actions = {
  setPageName({ commit }, payload) {
    commit('SET_PAGE_NAME', payload)
  },
}

export const getters = {
  pageName: (state) => {
    return state.pageName
  },
}
