import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Hospital from '@/components/hospital/Hospital'
import ProcessDemo from '@/components/processDemo/ProcessDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: Hospital
    }
    // },
    // {
    //   path: '*',
    //   name: 'else',
    //   redirect: '/'
    // }
  ]
})
