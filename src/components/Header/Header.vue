<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" style="margin-left: 1%;padding:0"
        ><router-link
          style="display:block;height:100%;width:100%;padding:0 20px 0 20px"
          to="/"
          >首页</router-link
        ></el-menu-item
      >
      <!-- 购物车插槽 -->
      <slot name="SC"></slot>
      <!-- 订单插槽 -->
      <slot name="OD"></slot>
      <el-submenu style="margin-left: 69%;" index="4">
        <template slot="title">我的工作台</template>
        <el-menu-item index="4-1"
          ><router-link to="/jumpUsers">个人信息</router-link></el-menu-item
        >
        <el-menu-item><router-link to="/">退出</router-link></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
// import eventBus from '../../utils/eventBus'

export default {
  name: 'Header',
  props: ['activeI'],
  data() {
    return {
      activeIndex: this.activeI
    }
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped></style>
