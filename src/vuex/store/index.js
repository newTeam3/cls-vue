import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
      token:window.sessionStorage.getItem('token' || '[]')==null ? '' :window.sessionStorage.getItem('token' || '[]')
  },
  mutations:{
    login(state,token){
      state.token=token
      window.sessionStorage.setItem('token',token)
    }

  }
})
export default store
