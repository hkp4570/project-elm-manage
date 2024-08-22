import request from "@/utils/request";

// 获取当前城市
export function cityGuess(){
  return fetch('https://elm.cangdu.org/v1/cities?type=guess',{
    method:'GET'
  }).then(res => res.json());
}

// 获取餐馆数量
export function getRestaurantCountApi(){
  return request({
    url: '/elm/shopping/restaurants/count',
    method: 'get',
  })
}

// 获取餐馆列表
export function getRestaurantApi({latitude,longitude,offset,limit}){
  return request({
    url: `/elm/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}`,
    method: 'get',
  })
}

// 获取搜索地址
export function searchPlace(cityId, keyword){
  return request({
    url: `/elm/v1/pois?type=search&city_id=${cityId}&keyword=${keyword}`,
    method: 'get',
  })
}

// 店铺食物分类
export function foodCategoryApi(latitude, longitude){
  return request({
    url: `/elm/shopping/v2/restaurant/category?latitude=${latitude}&longitude=${longitude}`,
    method: 'get',
  })
}

// 更新餐馆信息
export function updateRestaurantApi(data){
  return request({
    url: '/elm/shopping/updateshop',
    method: 'post',
    data,
  })
}
// 删除餐馆
export function deleteRestaurantApi(restaurant_id){
  return request({
    url: `/elm/shopping/restaurant/${restaurant_id}`,
    method: 'delete',
  })
}
