import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    value: 'ahoifwhaoif',
    age: '19'
  },
  mutations: mutations,
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
