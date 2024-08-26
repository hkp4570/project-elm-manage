import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/dataManage',
    component: Layout,
    redirect: '/dataManage/userList',
    name: '数据管理',
    meta: { title: '数据管理' },
    children: [
      {
        path: 'userList',
        name: '用户列表',
        component: () => import('@/views/dataManage/userList.vue'),
        meta: { title: '用户列表' },
      },
      {
        path: 'merchant',
        name: '商家列表',
        component: () => import('@/views/dataManage/merchant.vue'),
        meta: { title: '商家列表' },
      },
      {
        path: 'foodList',
        name: '食品列表',
        component: () => import('@/views/dataManage/foodList.vue'),
        meta: { title: '食品列表' },
      },
      {
        path: 'orderList',
        name: '订单列表',
        component: () => import('@/views/dataManage/orderList.vue'),
        meta: {title: '订单列表'}
      }
    ],
  },
  {
    path: '/addData',
    component: Layout,
    redirect: '/addData/addShop',
    name: '添加数据',
    meta: {title: '添加数据'},
    children: [
      {
        path: 'addShop',
        name: '添加商铺',
        component: () => import('@/views/addData/addShop.vue'),
        meta: {title: '添加商铺'}
      },
      // {
      //   path: 'addFood',
      //   name: '添加食品',
      //   component: () => import('@/views/addData/addFood.vue'),
      //   meta: {title: '添加食品'}
      // }
    ]
  },

  {
    path: '/visitor',
    component: Layout,
    children: [
      {
        path: 'visitor',
        name: '用户分布',
        component: () => import('@/views/visitor.vue'),
        meta: {title: '用户分布'}
      }
    ]
  },

  {
    path: '/adminset',
    component: Layout,
    children: [
      {
        path: 'adminset',
        name: '管理员设置',
        component: () => import('@/views/adminSet.vue'),
        meta: { title: '管理员设置'},
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
