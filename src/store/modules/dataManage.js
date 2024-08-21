import {cityGuess, getRestaurantApi, getRestaurantCountApi} from '@/api/services';

export default {
  namespaced: true,
  state: {
    restaurantCount: 0,
    restaurantList: [],
    city: {},
  },
  mutations: {
    setState(state, data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        state[key] = data[key];
      })
    }
  },
  actions: {
    getCity({commit}) {
      return new Promise((resolve, reject) => {
        cityGuess().then(resp => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', {city: resp})
            resolve(resp);
          }
        })
      })
    },
    getRestaurantCount({commit}) {
      return new Promise((resolve, reject) => {
        getRestaurantCountApi().then(resp => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', {restaurantCount: resp.count})
          }
        })
      })
    },
    async getRestaurantList({commit},data) {
      const { offset, limit } = data;
      const city = await this.dispatch('dataManage/getCity');
      return new Promise((resolve, reject) => {
        getRestaurantApi({
          latitude: city?.latitude, longitude: city?.longitude, offset, limit,
        }).then(resp => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', {restaurantList: resp})
          }
        })
      })
    }
  }
}
