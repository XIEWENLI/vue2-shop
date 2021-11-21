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
import AllOrder from '@/views/Order/AllOrder.vue'
import NoPayOrder from '@/views/Order/NoPayOrder.vue'
import NotDeliverGoodsOrder from '@/views/Order/NotDeliverGoodsOrder.vue'
import NotReceiveGoodsOrder from '@/views/Order/NotReceiveGoodsOrder.vue'
// 路由组件：Admin
import Admin from '@/views/Admin/Admin.vue'
import AdminUser from '@/views/Admin/AdminUser.vue'
import AdminGoods from '@/views/Admin/AdminGoods.vue'
import AdminLogin from '@/views/Admin/AdminLogin.vue'
import AdminOrder from '@/views/Admin/AdminOrder.vue'
import AdminUpdateGoods from '@/views/Admin/AdminUpdateGoods.vue'
import AdminAddGoods from '@/views/Admin/AdminAddGoods.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Goods },
  { path: '/jumpDetail', component: Detail },
  { path: '/jumpShoppingCar', component: ShoppingCar },
  { path: '/jumpUsers', component: jumpUsers },
  { path: '/jumpLogin', component: Login },
  { path: '/jumpRegister', component: Register },
  // order路由
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
  // Admin路由
  { path: '/jumpAdminLogin', component: AdminLogin },
  { path: '/jumpAdminUpdateGoods', component: AdminUpdateGoods },
  { path: '/jumpAdminAddGoods', component: AdminAddGoods },
  {
    path: '/jumpAdmin',
    component: Admin,
    redirect: '/jumpAdmin/jumpAdminGoods',
    children: [
      { path: 'jumpAdminGoods', component: AdminGoods },
      { path: 'jumpAdminUser', component: AdminUser },
      { path: 'jumpAdminOrder', component: AdminOrder }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenData = localStorage.getItem('token')
  const tokenAminData = localStorage.getItem('tokenAdmin')
  if (
    to.path === '/' ||
    to.path === '/jumpDetail' ||
    to.path === '/jumpLogin' ||
    to.path === '/jumpRegister' ||
    to.path === '/jumpAdminLogin'
  ) {
    next()
  } else if (
    to.path === '/jumpAdmin' ||
    to.path === '/jumpAdmin/jumpAdminGoods' ||
    to.path === '/jumpAdmin/jumpAdminUser' ||
    to.path === '/jumpAdmin/jumpAdminOrder' ||
    to.path === '/jumpAdminUpdateGoods' ||
    to.path === '/jumpAdminAddGoods'
  ) {
    if (tokenAminData) {
      next()
    } else {
      next('/jumpAdminLogin')
    }
  } else if (tokenData) {
    next()
  } else {
    next('/jumpLogin') // 跳转了一样执行后面的语句
  }
})

export default router
