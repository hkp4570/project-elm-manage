import Vue from 'vue';
import {
  cityGuess,
  deleteRestaurantApi,
  foodCategoryApi,
  getFoodsCountApi,
  getRestaurantApi,
  getRestaurantCountApi,
  updateRestaurantApi,
} from '@/api/services';

export default {
  namespaced: true,
  state: {
    restaurantCount: 0,
    restaurantList: [],
    city: {},
    categoryOptions: [],
    foodListCount: 0,
  },
  mutations: {
    setState(state, data) {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        state[key] = data[key];
      });
    },
  },
  actions: {
    getCity({ commit }) {
      return new Promise((resolve, reject) => {
        cityGuess().then((resp) => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', { city: resp });
            resolve(resp);
          }
        });
      });
    },
    getRestaurantCount({ commit }) {
      return new Promise((resolve, reject) => {
        getRestaurantCountApi().then((resp) => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', { restaurantCount: resp.count });
          }
        });
      });
    },
    async getRestaurantList({ commit }, data) {
      const { offset, limit } = data;
      const city = await this.dispatch('dataManage/getCity');
      return new Promise((resolve, reject) => {
        getRestaurantApi({
          latitude: city?.latitude,
          longitude: city?.longitude,
          offset,
          limit,
        }).then((resp) => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', { restaurantList: resp });
          }
        });
      });
    },
    async getFoodCategory({ commit }) {
      const response = await foodCategoryApi();
      if (response.message) {
        throw new Error(response.message);
      } else {
        const _options = [];
        response.forEach((item) => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: [],
            };
            item.sub_categories.forEach((subitem, index) => {
              if (index === 0) {
                return;
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name,
              });
            });
            _options.push(addnew);
          }
        });
        commit('setState', { categoryOptions: _options });
      }
    },
    async updateRestaurant(_, data) {
      const response = await updateRestaurantApi(data);
      if (response.message) {
        return response.message;
      }
      return '修改成功';
    },
    async deleteRestaurant(_, id) {
      const response = await deleteRestaurantApi(id);
      if (response.status === 0) {
        return {
          message: response.message,
          status: 0,
        };
      } else {
        return {
          status: 1,
          message: '删除成功',
        };
      }
    },
    async getFoodsCount({ commit }) {
      const response = await getFoodsCountApi();
      if (response.status === 1) {
        commit('setState', { foodListCount: response.count });
      } else {
        throw new Error(response.message);
      }
    },
  },
};
