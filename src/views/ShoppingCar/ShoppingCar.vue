<template>
  <div>
    <Header :activeI="activeIndex"></Header>
    <!-- 商品展示列表 -->
    <div class="container" v-loading="loadingStatic">
      <!-- el-table的height属性可固定表头 -->
      <el-empty v-if="isEmpty" description="购物车空空的哦！！！"
        ><router-link to="/"
          ><el-button>去购物</el-button></router-link
        ></el-empty
      >
      <GoodsCommon v-else v-for="item in goodsList" :key="item._id">
        <!-- 图片 -->
        <template v-slot:goodsImg>
          <!-- lazy 开启懒加载 可视才加载 -->
          <el-image
            style="width: 60px; height: 60px"
            :src="item.goodsSRC"
            fit="fit"
            lazy
          ></el-image>
        </template>
        <!-- 商品信息 -->
        <template v-slot:goodsDetail>
          <h4>
            {{ item.goodsName }}
            <i style="margin-left: 30px">单价：{{ item.goodsPrice }}</i>
            <i style="margin-left: 30px">库存：{{ item.goodsSum }}</i>
            <i style="margin-left: 30px">供应商：{{ item.supplierName }}</i>
          </h4>
          <p>{{ item.goodsDetail }}</p>
        </template>
        <!-- 数量 -->
        <template v-slot:goodsBuySum>
          <ShoppingCarSum
            :buySum2="item.buySum"
            :goodsSum2="item.goodsSum"
            :goodsId2="item._id"
          ></ShoppingCarSum>
        </template>
        <!-- 删除 -->
        <template v-slot:goodsBtn
          ><el-button type="danger" @click="onDelete(item.shoppingCarId)"
            ><b>删除</b></el-button
          ></template
        >
        <!-- 购买 -->
        <template v-slot:goodsBuy
          ><el-button
            type="success"
            @click="
              onBuy(
                item._id,
                item.shoppingCarId,
                item.goodsName,
                item.goodsPrice
              )
            "
            ><b>购买</b></el-button
          ></template
        >
      </GoodsCommon>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request.js'
import GoodsCommon from '@/components/GoodsCommon/GoodsCommon'
import ShoppingCarSum from '@/components/GoodsCommon/ShoppingCarSum'

export default {
  name: 'ShoppingCar',
  data() {
    return {
      loadingStatic: true,
      // 购物车为空界面显示
      isEmpty: true,
      // 导航栏选中
      activeIndex: '2',
      // 展示商品信息
      goodsList: []
    }
  },
  components: {
    GoodsCommon,
    ShoppingCarSum
  },
  created() {
    this.getGoods()
  },
  methods: {
    // 获取购物车商品
    async getGoods() {
      const token = JSON.parse(localStorage.getItem('token'))
      // 获取购物车订单
      const { data: res } = await request.get('/getShoppingCar', {
        params: {
          userId: token.userId
        }
      })

      // 用户id查询后，先判断res.goodsData的商品id是否为空
      if (res.goodsData !== '') {
        for (let i = 0; i < res.goodsData.length; i++) {
          const { data: res2 } = await request.get('/getGoodsOne', {
            params: {
              _id: res.goodsData[i].goodsID
            }
          })
          // 加入供应商名
          res2.goods.supplierName = res.goodsData[i].supplierName
          // 解决order表存在，而goods已经删除出现的报错问题
          if (res2.goods === null) {
            request.get('/deleteShoopingCar', {
              params: {
                shoppingCarId: res.goodsData[i]._id
              }
            })
            break
          }
          res2.goods.buySum = res.goodsData[i].buySum
          res2.goods.shoppingCarId = res.goodsData[i]._id
          this.goodsList.push(res2.goods)
        }
      }
      this.isEmpty = res.isEmpty
      if (this.goodsList.length <= 0) {
        this.isEmpty = true
      }
      this.loadingStatic = false
    },
    // 商品购买
    async onBuy(goodsId, shoppingCarId, goodsName, goodsPrice) {
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
      // data={shoppingCarData: Array(...), goodsData: Array(...), isEmpty: false}
      const { data: res } = await request.get('/getShoppingCarOne', {
        params: {
          userId: token.userId,
          goodsId: goodsId
        }
      })
      this.$confirm(
        '商品名称：<h3>' +
          goodsName +
          '</h3>' +
          '商品数量：<h3>' +
          res.buySum +
          '</h3>' +
          '商品总价：<h3>' +
          res.buySum * goodsPrice +
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
              res.buySum * goodsPrice +
              '</h3>',
            '付款界面',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
            }
          )
            .then(async () => {
              // 判断购买数量是否符合库存
              const result = await this.f3(goodsId, res.buySum)
              if (!result.state) {
                this.$alert('库存不足！', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.go(0)
                  }
                })
              } else {
                // order订单添加
                const res2 = await this.f(
                  goodsId,
                  res.buySum,
                  true,
                  res.supplierName
                )
                // 购物车的订单删除
                this.f2(shoppingCarId)
                // 购买后（无论是否付款），修改库存 goodsSum
                this.f4(goodsId, result.goodsSum - res.buySum)
                this.$router.go(0)
                if (res2.state) {
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
              const result = await this.f3(goodsId, res.buySum)
              if (!result.state) {
                this.$alert('库存不足！', '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$router.go(0)
                  }
                })
              } else {
                const res2 = await this.f(
                  goodsId,
                  res.buySum,
                  false,
                  res.supplierName
                )
                // 购物车的订单删除
                this.f2(shoppingCarId)
                // 购买后（无论是否付款），修改库存 goodsSum
                this.f4(goodsId, result.goodsSum - res.buySum)
                this.$router.go(0)
                if (res2.state) {
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
    async f(id, buySum, receiveStateVal, supplierName) {
      const goodsId = id
      const tokenData = JSON.parse(localStorage.getItem('token'))
      const { data: res2 } = await request.get('/addOrder', {
        params: {
          userId: tokenData.userId,
          goodsId,
          buySum,
          supplierVal: supplierName,
          payState: receiveStateVal,
          deliverState: false,
          receiveState: false
        }
      })
      return res2
    },
    // 购买后，购物车订单删除,this.onBuy()调用
    f2(shoppingCarId) {
      request.get('/deleteShoopingCar', {
        params: {
          shoppingCarId
        }
      })
    },
    // 判断商品购买数量是否符合库存
    async f3(goodsId, buySum) {
      const { data: res } = await request.get('/getGoodsOne', {
        params: {
          _id: goodsId
        }
      })
      if (buySum <= res.goods.goodsSum) {
        return { state: true, goodsSum: res.goods.goodsSum }
      } else {
        return false
      }
    },
    // 购买后（无论是否付款），修改库存 goodsSum
    f4(goodsId, goodsSum) {
      request.get('/updateGoodsSum', {
        params: {
          goodsId,
          goodsSum
        }
      })
    },
    // 删除购物车订单
    async onDelete(shoppingCarId) {
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
      this.$confirm(
        '<h4">是否确认</h4>' + '<h3 style="color:red">' + '删除' + '</h3>',
        '确认删除界面',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          request.get('deleteShoopingCar', {
            params: {
              shoppingCarId
            }
          })
          // 刷新当前页面
          this.$router.go(0)
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped></style>
