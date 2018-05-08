import Vue from 'vue'
import Router from 'vue-router'
import Draw from '@/views/Draw'
import Home from '@/views/Home'
import LuckyMoney from '@/views/LuckyMoney'
import MyView from '@/views/My'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Home'}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/luckyMoney/:id',
      name: 'LuckyMoney',
      component: LuckyMoney
    },
    {
      path: '/my',
      name: 'MyView',
      component: MyView
    }
  ]
})
