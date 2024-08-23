import Vue from 'vue';
import {
  cityGuess,
  deleteRestaurantApi,
  foodCategoryApi,
  getFoodsApi,
  getFoodsCountApi,
  getMenuApi,
  getRestaurantApi,
  getRestaurantCountApi, updateFoodApi,
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
    foodList: [],
    menuOptions: [],
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
    async getFoods({ commit }, { offset, limit }) {
      const response = await getFoodsApi({ offset, limit });
      if (response.message) {
        throw new Error(response.message);
      } else {
        const data = [];
        response.forEach((item, index) => {
          const tableData = {};
          tableData.name = item.name;
          tableData.item_id = item.item_id;
          tableData.description = item.description;
          tableData.rating = item.rating;
          tableData.month_sales = item.month_sales;
          tableData.restaurant_id = item.restaurant_id;
          tableData.category_id = item.category_id;
          tableData.image_path = item.image_path;
          tableData.specfoods = item.specfoods;
          tableData.index = index;
          data.push(tableData);
        });
        commit('setState', { foodList: data });
      }
    },
    async getMenu({ commit }, data) {
      const response = await getMenuApi(data);
      if (response.message) {
        throw new Error(response.message);
      } else {
        const menuOptions = [];
        response.forEach((item, index) => {
          menuOptions.push({
            label: item.name,
            value: item.id,
            index,
          });
        });
        commit('setState', { menuOptions: menuOptions });
      }
    },
    async updateFood(_,data){
      const response = await updateFoodApi(data);
      return response.status === 1;
    }
  },
};
