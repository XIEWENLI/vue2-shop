<template>
  <div>
    <el-button @click="reduce">-</el-button>
    <el-input
      style="width:100px;margin-left:10px;margin-right:10px"
      type="number"
      v-model="buySum"
    />
    <el-button @click="add">+</el-button>
  </div>
</template>
<script>
import request from '@/utils/request.js'

export default {
  props: ['buySum2', 'goodsSum2', 'goodsId2'],
  data() {
    return {
      name: 'ShoppingCarSum',
      buySum: this.buySum2,
      goodsSum: this.goodsSum2
    }
  },
  watch: {
    // 侦听商品购买数量，不能<1或>总数
    buySum(newVal, oldVal) {
      // 排除数量有e或E
      const buySum = this.buySum.toString()
      var arr = newVal.toString()
      // 排除数量开头不是1-9
      arr = arr.charAt(0)
      if (newVal !== '') {
        if (newVal > this.goodsSum) {
          this.buySum = this.goodsSum
        } else if (buySum.indexOf('e') === 1 || buySum.indexOf('E') === 1) {
          this.$message({
            type: 'error',
            showClose: true,
            duration: '1000',
            message: '商品数量不合法！！！'
          })
          this.buySum = 1
        } else if (arr.charCodeAt() <= 48 || arr.charCodeAt() > 57) {
          this.$message({
            type: 'error',
            showClose: true,
            duration: '1000',
            message: '商品数量不合法！！！'
          })
          this.buySum = 1
        } else {
          this.setShoppingCarSum()
        }
      } else {
        this.$message({
          type: 'error',
          showClose: true,
          duration: '1000',
          message: '商品数量不合法！！！'
        })
      }
    }
  },
  created() {},
  methods: {
    // 商品购买数+1
    add() {
      const buySum = this.buySum.toString()
      // +和-在buySum为空
      if (buySum === '') {
        this.buySum = 1
      } else if (this.buySum < this.goodsSum) {
        this.buySum = parseInt(this.buySum)
        this.buySum += 1
      }
      this.$emit('priceSumVal', this.buySum)
    },
    // 商品购买数-1
    reduce() {
      const buySum = this.buySum.toString()
      // +和-在buySum为空
      if (buySum === '') {
        this.buySum = 1
      } else if (this.buySum > 1) {
        this.buySum = parseInt(this.buySum)
        this.buySum -= 1
      }
    },
    // 购物车商品数量修改,侦听器的buySum()调用,修改数据库中的数据
    async setShoppingCarSum() {
      const token = JSON.parse(localStorage.getItem('token'))
      const { data: res } = await request.get('/updataShoopingCar', {
        params: {
          userId: token.userId,
          goodsId: this.goodsId2,
          buySum: this.buySum
        }
      })
      this.$message({
        type: 'success',
        showClose: true,
        duration: '1000',
        message: res.news
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
