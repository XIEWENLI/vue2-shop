import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由组件
import Goods from '../views/Goods/Goods.vue'
import Detail from '../views/Goods/Detail.vue'
import ShoppingCar from '../views/ShoppingCar/ShoppingCar.vue'
import Order from '../views/Order/Order.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Goods },
  { path: '/jumpDetail', component: Detail },
  { path: '/jumpShoppingCar', component: ShoppingCar },
  { path: '/jumpOrder', component: Order }
]

const router = new VueRouter({
  routes
})

export default router
