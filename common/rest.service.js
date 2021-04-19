'use strict'

export default {

  getItem(axios) {
    return axios.get('/item')
  },
  getLostItems() {
    let lostItems= [
      {
        id: 1,
        title: 'Dlugopis',
        category: 'Akcesoria biurowe',
        description: 'Zgubiony dlugopis wczoraj',
        location: '1234 Fancy Ave',
        date: '12-25-2019'
      },
      {
        id: 2,
        title: 'Szalik',
        category: 'Odzież',
        description: 'Zgubiony szalik wczoraj',
        location: 'Gdańsk',
        date: '12-25-2019'
      }
    ] ;
  //async getLostItems() {
    //let res =[] 
    //await axios.get("/events");
    //return res.data;
    return lostItems.data;
  },
  getLostItemSingle(lostItemId) {
    let lostItems= [
      {
        id: 1,
        title: 'Dlugopis',
        category: 'Akcesoria biurowe',
        description: 'Zgubiony dlugopis wczoraj',
        location: '1234 Fancy Ave',
        date: '12-25-2019'
      },
      {
        id: 2,
        title: 'Szalik',
        category: 'Odzież',
        description: 'Zgubiony szalik wczoraj',
        location: 'Gdańsk',
        date: '12-25-2019'
      }
    ] ;
  //async getLostItemSingle(lostItemId) {
    //let res = []
      //await axios.get("/events/" + lostItemId, {
    //});]
    const lostItem = lostItems.find(lostItem => lostItem.id === id);
    //return res.data;
    return lostItem.data;
  }
}
