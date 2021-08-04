import Vue from 'vue'
import App from './App.vue'
import Router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router:Router
  //直接写router的话上面import的router就要小写
}).$mount('#app')
