import request from '@/utils/request';

// 获取当前城市
export function cityGuess() {
  return fetch('https://elm.cangdu.org/v1/cities?type=guess', {
    method: 'GET',
  }).then((res) => res.json());
}

// 获取餐馆数量
export function getRestaurantCountApi() {
  return request({
    url: '/elm/shopping/restaurants/count',
    method: 'get',
  });
}

// 获取餐馆列表
export function getRestaurantApi({ latitude, longitude, offset, limit }) {
  return request({
    url: `/elm/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}`,
    method: 'get',
  });
}

// 获取搜索地址
export function searchPlace(cityId, keyword) {
  return request({
    url: `/elm/v1/pois?type=search&city_id=${cityId}&keyword=${keyword}`,
    method: 'get',
  });
}

// 店铺食物分类
export function foodCategoryApi(latitude, longitude) {
  return request({
    url: `/elm/shopping/v2/restaurant/category?latitude=${latitude}&longitude=${longitude}`,
    method: 'get',
  });
}

// 更新餐馆信息
export function updateRestaurantApi(data) {
  return request({
    url: '/elm/shopping/updateshop',
    method: 'post',
    data,
  });
}
// 删除餐馆
export function deleteRestaurantApi(restaurant_id) {
  return request({
    url: `/elm/shopping/restaurant/${restaurant_id}`,
    method: 'delete',
  });
}

// 获取食品数量
export function getFoodsCountApi() {
  return request({
    url: '/elm/shopping/v2/foods/count',
    method: 'get',
  });
}

// 食物列表
export function getFoodsApi({ offset, limit }) {
  return request({
    url: `/elm/shopping/v2/foods?offset=${offset}&limit=${limit}`,
    method: 'get',
  });
}

// 获取餐馆详细信息
export function getRestaurantDetail(id) {
  return request({
    url: `/elm/shopping/restaurant/${id}`,
    method: 'get',
  });
}

// 获取当前食品的分类
export function getMenuById(id) {
  return request({
    url: `/elm/shopping/v2/menu/${id}`,
    method: 'get',
  });
}
// 获取所有食品的分类
export function getMenuApi({ restaurant_id, allMenu }) {
  return request({
    url: `/elm/shopping/v2/menu?restaurant_id=${restaurant_id}&allMenu=${allMenu}`,
    method: 'get',
  });
}

// 更新食品信息
export function updateFoodApi(data) {
  return request({
    url: '/elm/shopping/v2/updatefood',
    method: 'post',
    data,
  });
}
// 删除食品
export function deleteFood(food_id) {
  return request({
    url: `/elm/shopping/v2/food/${food_id}`,
    method: 'delete',
  });
}

// 获取订单数量
export function getOrderCountApi(data){
  return request({
    url: '/elm/bos/orders/count',
    method: 'get',
  });
}

// 获取订单列表
export function getOrderListApi(data){
  const {offset,limit} = data;
  return request({
    url: `/elm/bos/orders?offset=${offset}&limit=${limit}`,
    method: 'get',
  });
}

// 获取用户信息
export function getUserInfoApi(user_id) {
  return request({
    url: `/elm/v1/user/${user_id}`,
    method: 'get',
  });
}

// 获取地址信息
export function getAddressByIdApi(address_id) {
  return request({
    url: `/elm/v1/addresse/${address_id}`,
    method: 'get',
  });
}

// 获取用户分布信息
export function getUserCity() {
  return request({
    url: '/elm/v1/user/city/count',
    method: 'get',
  });
}

// 添加商铺
export function addShop(data) {
  return request({
    url: '/elm/shopping/addshop',
    method: 'post',
    data,
  });
}
