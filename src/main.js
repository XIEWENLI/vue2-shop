import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// css初始化样式
import './assets/css/base.css'
// css总体布局样式
import './assets/css/container.css'

// 组件
import Header from './components/Header/Header.vue'

Vue.component('Header', Header)

// Vue插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
