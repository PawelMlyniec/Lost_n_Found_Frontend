'use strict'

export default {
  getItem(axios) {
    return axios.get('/item')
  },
  getLostItems() {
  //async getLostItems() {
    let res =[] 
    //await axios.get("/events");
    return res.data;
  },
  getLostItemSingle(lostItemId) {
  //async getLostItemSingle(lostItemId) {
    let res = []
      //await axios.get("/events/" + lostItemId, {
    //});]
    return res.data;
  }
}
