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
