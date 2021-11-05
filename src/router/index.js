import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由组件
import Goods from '@/views/Goods/Goods.vue'
import Detail from '@/views/Goods/Detail.vue'
import ShoppingCar from '@/views/ShoppingCar/ShoppingCar.vue'
import Order from '@/views/Order/Order.vue'
import jumpUsers from '@/views/Users/Users.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
// Order侧边栏的路由
import AllOrder from '@/components/Order/AllOrder.vue'
import NoPayOrder from '@/components/Order/NoPayOrder.vue'
import NotDeliverGoodsOrder from '@/components/Order/NotDeliverGoodsOrder.vue'
import NotReceiveGoodsOrder from '@/components/Order/NotReceiveGoodsOrder.vue'
// 路由组件：admin
import Admin from '@/views/admin/admin.vue'
import AdminUser from '@/views/admin/AdminUser.vue'
import AdminGoods from '@/views/admin/AdminGoods.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Goods },
  { path: '/jumpDetail', component: Detail },
  { path: '/jumpShoppingCar', component: ShoppingCar },
  { path: '/jumpUsers', component: jumpUsers },
  { path: '/jumpLogin', component: Login },
  { path: '/jumpRegister', component: Register },
  {
    path: '/jumpOrder',
    component: Order,
    redirect: '/jumpOrder/jumpAllOrder',
    children: [
      { path: 'jumpAllOrder', component: AllOrder },
      { path: 'jumpNoPayOrder', component: NoPayOrder },
      { path: 'jumpNotDeliverGoodsOrder', component: NotDeliverGoodsOrder },
      { path: 'jumpNotReceiveGoodsOrder', component: NotReceiveGoodsOrder }
    ]
  },
  // admin组件
  {
    path: '/jumpAdmin',
    component: Admin,
    redirect: '/jumpAdmin/jumpAdminGoods',
    children: [
      { path: 'jumpAdminGoods', component: AdminGoods },
      { path: 'jumpAdminUser', component: AdminUser }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenData = localStorage.getItem('token')
  if (
    to.path === '/' ||
    to.path === '/jumpLogin' ||
    to.path === '/jumpRegister'
  ) {
    next()
  } else if (tokenData) {
    next()
  } else {
    next('/jumpLogin') // 跳转了一样执行后面的语句
  }
})

export default router
