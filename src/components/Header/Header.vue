<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="jump('/')">首页</el-menu-item>

      <el-menu-item index="2" @click="jump('/jumpShoppingCar')"
        >购物车</el-menu-item
      >
      <el-menu-item index="3" @click="jump('/jumpOrder')">订单</el-menu-item>
      <el-submenu index="4" class="user">
        <template slot="title">我的</template>
        <el-menu-item index="2-1">信息</el-menu-item>
        <el-menu-item index="2-2">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    jump(val) {
      this.$router.replace(val)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu-demo {
  position: relative;
}

a {
  display: inline-block;
  width: 100%;
}

.user {
  position: absolute;
  right: 5%;
}
</style>
