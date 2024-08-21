import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import dashboard from './modules/dashboard'
import dataManage from './modules/dataManage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    dashboard,
    dataManage,
  },
  getters
})

export default store
