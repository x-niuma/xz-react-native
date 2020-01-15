import http from '../util/Request';

export const key = 'e5de255b311126d40cf4e810c666ae38';

export default {
  inputTip({location, city = '', keywords='肯德基'}) {
    const uri = 'https://restapi.amap.com/v3/assistant/inputtips';
    return http.get({
      url: `${uri}?key=${key}&keywords=${keywords}&type=050301&location=${location}&city=${city}&datatype=all`
    }, {
      auth: false
    })
  },

  decodeAddress({ location, radius = 1000 }) {
    const url = 'https://restapi.amap.com/v3/geocode/regeo';
    return http.get({
      url: `${url}?key=${key}&location=${location}&&radius=${radius}&extensions=all&batch=false&roadlevel=0`
    }, {
      auth: false
    })
  }
}