import request from '@/utils/request';

// 当天的用户注册量
export const  userCount = date => request('/elm/statis/user/' + date + '/count');

// 当天新增的订单量
export const orderCount = date => request('/elm/statis/order/' + date + '/count');

// 当前注册的管理员
export const adminDayCount = date => request('/elm/statis/admin/' + date + '/count');

// 所有用户数量
export const getUserCount = data => request('/elm/v1/users/count', data);

// 所有订单数量
export const getOrderCount = data => request('/elm/bos/orders/count', data);

// 所有管理员数量
export const adminCount = () => request('/elm/admin/count');
