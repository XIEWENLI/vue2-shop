<template>
  <div class="DetailContainer">
    <ul>
      <li>
        <div class="image">
          <img :src="goods.goodsSRC" alt="加载错误！！！" />
        </div>
      </li>
      <li>
        <el-form label-width="100px">
          <el-form-item label="商品名字：">
            <h2>{{ goods.goodsName }}</h2>
          </el-form-item>
          <el-form-item label="商品价格：">
            <h2 style="color:red">￥{{ goods.goodsPrice }}</h2>
          </el-form-item>
          <el-form-item label="商品详情：">
            <p style="word-wrap:break-word; ">{{ goods.goodsDetail }}</p>
          </el-form-item>
          <el-form-item label="商品库存：">
            <p>{{ goods.goodsSum }}</p>
          </el-form-item>
          <el-form-item style="margin-left:-10px" label="购买数量:">
            <el-row>
              <el-button @click="reduce">-</el-button>
              <el-input
                style="width:100px;margin-left:10px;margin-right:10px"
                type="number"
                v-model="buySum"
              />
              <el-button @click="add">+</el-button>
            </el-row>
          </el-form-item>
          <el-form-item label-width="30px">
            <el-button type="primary" @click="onBuy">立即购买</el-button>
            <el-button type="danger" @click="addShoppingCar"
              >加入购物车</el-button
            >
            <el-button style="margin-left:80px" @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </li>
    </ul>
  </div>
</template>
<script>
import request from '../../utils/request'

export default {
  name: 'Detail',
  data() {
    return {
      buySum: 1,
      goods: {}
    }
  },
  created() {
    this.getGoodsDetail()
  },
  watch: {
    // 侦听商品购买数量，不能<1或>总数
    buySum(newVal, oldVal) {
      if (this.goods.goodsSum > 0) {
        // 排除数量有e或E
        const buySum = this.buySum.toString()
        var arr = newVal.toString()
        // 排除数量开头不是1-9
        arr = arr.charAt(0)
        if (newVal !== '') {
          if (Number(newVal) > this.goods.goodsSum) {
            this.buySum = this.goods.goodsSum
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
          }
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            duration: '1000',
            message: '商品数量不合法！！！'
          })
        }
      } else {
        this.$alert('已无库存！', '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  methods: {
    // 获取商品信息
    async getGoodsDetail() {
      const _id = location.hash.split('?')[1].split('=')[1]
      const { data: res } = await request.get('/getGoodsOne', {
        params: {
          _id: _id
        }
      })
      this.goods = res.goods
    },

    // 商品购买数+1
    add() {
      const buySum = this.buySum.toString()
      // +和-在buySum为空
      if (buySum === '') {
        this.buySum = 1
      } else if (this.buySum < this.goods.goodsSum) {
        this.buySum = parseInt(this.buySum)
        this.buySum += 1
      }
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
    // 商品购买
    async onBuy() {
      // 判断登录状态
      const { data: DLSatate } = await request.get('/getAdminDL')
      if (DLSatate.data === 'false') {
        localStorage.removeItem('token')
      }
      const token = JSON.parse(localStorage.getItem('token'))
      if (!token) {
        this.$router.replace('/jumpLogin')
        return
      }
      const buySum = this.buySum.toString()
      if (buySum === '') {
        this.$message({
          type: 'error',
          showClose: true,
          duration: '1000',
          message: '商品数量不合法！！！'
        })
        this.buySum = 1
        return
      }
      this.$confirm(
        '商品名称：<h3>' +
          this.goods.goodsName +
          '</h3>' +
          '商品数量：<h3>' +
          this.buySum +
          '</h3>' +
          '商品总价：<h3>' +
          this.buySum * this.goods.goodsPrice +
          '</h3>',
        '商品信息',
        {
          confirmButtonText: '购买',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          // 内嵌
          this.$confirm(
            '<h4">请付款:</h4>' +
              '<h3 style="color:red">' +
              this.buySum * this.goods.goodsPrice +
              '</h3>',
            '付款界面',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
            }
          )
            .then(async () => {
              // 判断购买数量是否符合库存
              const result = await this.f2()
              if (!result.state) {
                this.$alert('库存不足！', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.go(0)
                  }
                })
              } else {
                // 订单添加
                const res = await this.f(true)
                // 购买后（无论是否付款），修改库存 goodsSum
                this.f3(result.goodsSum - this.buySum)
                this.$router.go(0)
                if (res.state) {
                  this.$message({
                    type: 'success',
                    showClose: true,
                    duration: '1000',
                    message: '支付成功！'
                  })
                }
              }
            })
            .catch(async () => {
              // 判断购买数量是否符合库存
              const result = await this.f2()
              if (!result.state) {
                this.$alert('库存不足！', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.go(0)
                  }
                })
              } else {
                // 订单添加
                const res = await this.f(false)
                // 购买后（无论是否付款），修改库存 goodsSum
                this.f3(result.goodsSum - this.buySum)
                this.$router.go(0)
                if (res.state) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    duration: '1000',
                    message: '支付失败！'
                  })
                }
              }
            })
        })
        .catch(() => {})
    },
    // order订单添加,this.onBuy()调用
    async f(receiveStateVal) {
      const goodsId = location.hash.split('?')[1].split('=')[1]
      const tokenData = JSON.parse(localStorage.getItem('token'))
      const { data: res } = await request.get('/addOrder', {
        params: {
          userId: tokenData.userId,
          goodsId,
          buySum: this.buySum,
          payState: receiveStateVal,
          deliverState: false,
          receiveState: false
        }
      })
      return res
    },
    // 判断商品购买数量是否符合库存
    async f2() {
      const goodsId = location.hash.split('?')[1].split('=')[1]
      const { data: res } = await request.get('/getGoodsOne', {
        params: {
          _id: goodsId
        }
      })
      if (this.buySum <= res.goods.goodsSum) {
        return { state: true, goodsSum: res.goods.goodsSum }
      } else {
        return false
      }
    },
    // 购买后（无论是否付款），修改库存 goodsSum
    f3(goodsSum) {
      const goodsId = location.hash.split('?')[1].split('=')[1]
      request.get('/updateGoodsSum', {
        params: {
          goodsId,
          goodsSum
        }
      })
    },
    // 商品加入购物车
    async addShoppingCar() {
      // 判断登录状态
      const { data: DLSatate } = await request.get('/getAdminDL')
      if (DLSatate.data === 'false') {
        localStorage.removeItem('token')
      }
      const token = JSON.parse(localStorage.getItem('token'))
      if (!token) {
        this.$router.replace('/jumpLogin')
        return
      }
      if (this.goods.goodsSum <= 0) {
        this.$alert('已无库存！', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      const buySum = this.buySum.toString()
      if (buySum === '') {
        this.$message({
          type: 'error',
          showClose: true,
          duration: '1000',
          message: '商品数量不合法！！！'
        })
        this.buySum = 1
        return
      }
      // goods.vue传过来的location.hash值
      const goodsId = location.hash.split('?')[1].split('=')[1]
      const tokenData = JSON.parse(localStorage.getItem('token'))
      const { data: res } = await request.get('/addShoppingCar', {
        params: {
          userId: tokenData.userId,
          goodsId,
          buySum: this.buySum,
          goodsSum: this.goods.goodsSum
        }
      })
      if (res.static) {
        this.$message({
          type: 'success',
          showClose: true,
          duration: '1000',
          message: res.news
        })
      }
    },
    // 跳转首页
    goBack() {
      this.$router.replace('/')
    }
  }
}
</script>
<style lang="less" scoped>
.DetailContainer {
  width: 80%;
  margin: 20px auto;
}

ul li {
  float: left;
  width: 50%;
}

.el-form {
  margin-top: 30px;
}

img {
  width: 80%;
  margin-left: 10%;
}
</style>
