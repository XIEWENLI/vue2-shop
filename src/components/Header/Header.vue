<template>
  <div class="Header">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <!-- 首页 -->
      <el-menu-item index="1" style="margin-left: 1%;padding:0"
        ><router-link
          style="display:block;height:100%;width:100%;padding:0 20px 0 20px;font-weight: bold;"
          to="/"
          >首页</router-link
        ></el-menu-item
      >
      <!-- 购物车 -->
      <el-menu-item index="2" style="padding:0"
        ><router-link
          style="display:block;height:100%;width:100%;padding:0 20px 0 20px;font-weight: bold;"
          to="/jumpShoppingCar"
          >购物车</router-link
        ></el-menu-item
      >
      <!-- 订单 -->
      <el-menu-item index="3" style="padding:0"
        ><router-link
          style="display:block;height:100%;width:100%;padding:0 20px 0 20px;font-weight: bold;"
          to="/jumpOrder"
          >订单</router-link
        ></el-menu-item
      >
      <!-- 用户 -->
      <el-submenu class="yhdw" index="4">
        <template slot="title"
          ><h3 class="yh">用户名：{{ username }}</h3>
        </template>
        <div v-if="!tokenStatic">
          <el-menu-item index="4-1"
            ><router-link style="display:block;width:100%" to="/jumpLogin"
              >登录</router-link
            ></el-menu-item
          >
          <el-menu-item
            ><router-link style="display:block;width:100%" to="/jumpRegister"
              >注册</router-link
            ></el-menu-item
          >
        </div>
        <div v-else>
          <el-menu-item index="4-1"
            ><router-link style="display:block;width:100%" to="/jumpUsers"
              >个人信息</router-link
            ></el-menu-item
          >
          <el-menu-item style="display:block;width:100%" @click="out"
            >退出</el-menu-item
          >
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import request from '@/utils/request.js'

export default {
  name: 'Header',
  props: ['activeI'],
  data() {
    return {
      activeIndex: this.activeI,
      username: '未登录',
      // Header导航栏需要用
      tokenStatic: false
    }
  },
  created() {
    this.login()
  },
  methods: {
    async login() {
      // 判断登录状态
      const { data: DLSatate } = await request.get('/getAdminDL')
      if (DLSatate.data === 'false') {
        localStorage.removeItem('token')
      }
      // 登录
      const userData = JSON.parse(localStorage.getItem('token'))
      if (userData) {
        this.username = userData.username
        this.tokenStatic = true
      } else {
        // 解决删除token后，页面不能及时刷新问题，减少每个页面都添加的工作量
        const url = location.hash
        if (url !== '#/') {
          this.$router.replace('/jumpLogin')
        }
      }
    },
    // 退出
    out() {
      localStorage.removeItem('token')
      this.username = '未登录'
      this.tokenStatic = false
      if (location.hash !== '#/') {
        this.$router.replace('/')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.Header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.yhdw {
  position: absolute;
  right: 6%;
}

.yh {
  display: inline-block;
  color: red;
}

.yh i {
  color: red;
}
</style>
