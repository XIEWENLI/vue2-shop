<template>
  <div class="Order">
    <Header :activeI="activeIndex"></Header>
    <div class="OrderContainer">
      <OrderSide></OrderSide>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import OrderSide from '@/components/Order/OrderSide'

export default {
  name: 'Order',
  data() {
    return {
      activeIndex: '3'
    }
  },
  components: {
    OrderSide
  }
}
</script>
<style lang="less" scoped>
.Order .OrderContainer {
  display: flex;
}
</style>
