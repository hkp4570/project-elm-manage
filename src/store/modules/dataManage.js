import Vue from 'vue';
import {
  cityGuess,
  deleteRestaurantApi,
  foodCategoryApi, getAddressByIdApi, getCategory,
  getFoodsApi,
  getFoodsCountApi,
  getMenuApi, getOrderCountApi, getOrderListApi,
  getRestaurantApi,
  getRestaurantCountApi, getRestaurantDetail, getUserInfoApi, updateFoodApi,
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
    orderListCount: 0,
    orderList: [],
  },
  mutations: {
    setState(state, data) {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        state[key] = data[key];
      });
    },
    setOrderList(state, data) {
      Vue.set(state.orderList, data.index, {...state.orderList[data.index], ...data})
    }
  },
  actions: {
    getCity({commit}) {
      return new Promise((resolve, reject) => {
        cityGuess().then((resp) => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', {city: resp});
            resolve(resp);
          }
        });
      });
    },
    getRestaurantCount({commit}) {
      return new Promise((resolve, reject) => {
        getRestaurantCountApi().then((resp) => {
          if (resp.message) {
            reject(resp.message);
          } else {
            commit('setState', {restaurantCount: resp.count});
          }
        });
      });
    },
    async getRestaurantList({commit}, data) {
      const {offset, limit} = data;
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
            commit('setState', {restaurantList: resp});
          }
        });
      });
    },
    async getFoodCategory({commit}) {
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
        commit('setState', {categoryOptions: _options});
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
    async getFoodsCount({commit}) {
      const response = await getFoodsCountApi();
      if (response.status === 1) {
        commit('setState', {foodListCount: response.count});
      } else {
        throw new Error(response.message);
      }
    },
    async getFoods({commit}, {offset, limit}) {
      const response = await getFoodsApi({offset, limit});
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
        commit('setState', {foodList: data});
      }
    },
    async getMenu({commit}, data) {
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
        commit('setState', {menuOptions: menuOptions});
      }
    },
    async updateFood(_, data) {
      const response = await updateFoodApi(data);
      return response.status === 1;
    },
    async getOrderList({commit}, data) {
      const respCount = await getOrderCountApi();
      if (respCount.status === 1) {
        commit('setState', {orderListCount: respCount.count});
      }
      const respList = await getOrderListApi(data);
      if (!respList.message) {
        const data = [];
        respList.forEach((item, index) => {
          const tableData = {};
          tableData.id = item.id;
          tableData.total_amount = item.total_amount;
          tableData.status = item.status_bar.title;
          tableData.user_id = item.user_id;
          tableData.restaurant_id = item.restaurant_id;
          tableData.address_id = item.address_id;
          tableData.index = index;
          data.push(tableData);
        })
        commit('setState', {orderList: data});
      } else {
        throw new Error(respList.message);
      }
    },
    async getOrderDetail({commit}, data) {
      const {restaurant_id, address_id, user_id, index} = data;
      const [restaurant, addressInfo, userInfo] = await Promise.all([getRestaurantDetail(restaurant_id), getAddressByIdApi(address_id), getUserInfoApi(user_id)])
      const expandData = {
        restaurant_name: restaurant.name,
        restaurant_address: restaurant.address,
        address: addressInfo.address,
        user_name: userInfo.username,
        index
      };
      commit('setOrderList', expandData);
    },
    async getRestaurantCategory({commit}, {restaurant_id}) {
      const response = await getCategory(restaurant_id);
      if (response.status === 1) {
        response.category_list.map((item, index) => {
          item.value = index;
          item.label = item.name;
        })
        return response.category_list;
      } else {
        throw new Error(response.message);
      }
    }
  },
};
