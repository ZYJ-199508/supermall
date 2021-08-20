import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FaskClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(Toast)

//图片懒加载
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FaskClick.attach(document.body)

new Vue({
  render: h => h(App),
  router:Router,
  store
  //直接写router的话上面import的router就要小写
}).$mount('#app')
