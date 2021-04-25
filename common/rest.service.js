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
  getLostItemSingle(axios,lostItemId) {
  //async getLostItemSingle(lostItemId) {
    return axios.get('http://localhost:8080/lostReports/'+lostItemId, {crossdomain: true ,
    proxy: {
      host: '127.0.0.1',
      port: 8080
    }
    })
  }
}
