import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
vue.use(vuex)

export default new vuex.Store({
    state:{
      cartList:[]
    },
    //mutations目的是修改state的状态
    mutations,
    actions,
    getters
})
