// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(ElementUI)

// router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem('demo-token')
//   if (to.path === '/') {
//     if (token !== 'null' && token !== null) {
//       next('/hospital')
//     }
//     next()
//   } else {
//     if (token !== 'null' && token !== null) {
//       next()
//     } else {
//       next('/')
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
