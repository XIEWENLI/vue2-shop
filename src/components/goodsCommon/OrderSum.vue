<template>
  <div>
    <ul>
      <li>数量：{{ buySum }}</li>
      <li>
        总价：
        <b style="color:red">￥{{ buySum * goodsPrice }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['buySum2', 'goodsPrice2'],
  data() {
    return {
      name: 'OrderSum',
      buySum: this.buySum2,
      goodsPrice: this.goodsPrice2
    }
  }
}
</script>
<style lang="less" scoped></style>
