<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- 首页 -->
      <slot name="SY"></slot>
      <!-- 购物车插槽 -->
      <slot name="SC"></slot>
      <!-- 订单插槽 -->
      <slot name="OD"></slot>
      <!-- 操作 -->
      <slot name="CZ"></slot>
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
