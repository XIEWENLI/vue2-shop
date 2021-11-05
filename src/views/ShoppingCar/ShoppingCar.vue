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
      <goodsCommon v-else v-for="item in goodsList" :key="item._id">
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
            <i style="margin-left:30px">单价：{{ item.goodsPrice }}</i>
            <i style="margin-left:30px">库存：{{ item.goodsSum }}</i>
          </h4>
          <p>{{ item.goodsDetail }}</p>
        </template>
        <!-- 数量 -->
        <template v-slot:goodsBuySum>
          <!-- @buySumComponent="onBuy" 接受Sum.vue的更新值buySum -->
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
      </goodsCommon>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request.js'
import goodsCommon from '@/components/goodsCommon/goodsCommon'
import ShoppingCarSum from '@/components/goodsCommon/ShoppingCarSum'

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
    goodsCommon,
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
          res2.goods.buySum = res.goodsData[i].buySum
          res2.goods.shoppingCarId = res.goodsData[i]._id
          this.goodsList.push(res2.goods)
        }
      }
      this.isEmpty = res.isEmpty
      this.loadingStatic = false
    },
    // 商品购买
    async onBuy(goodsId, shoppingCarId, goodsName, goodsPrice) {
      const token = JSON.parse(localStorage.getItem('token'))
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
              const res2 = await this.f(goodsId, res.buySum, true)
              this.f2(shoppingCarId)
              if (res2.state) {
                this.$message({
                  type: 'success',
                  showClose: true,
                  duration: '1000',
                  message: '支付成功！'
                })
              }
              // 刷新当前页面
              this.$router.go(0)
            })
            .catch(async () => {
              const res2 = await this.f(goodsId, res.buySum, false)
              this.f2(shoppingCarId)
              if (res2.state) {
                this.$message({
                  type: 'error',
                  showClose: true,
                  duration: '1000',
                  message: '支付失败！'
                })
              }
              // 刷新当前页面
              this.$router.go(0)
            })
        })
        .catch(() => {})
    },
    // order订单添加,this.onBuy()调用
    async f(id, buySum, receiveStateVal) {
      const goodsId = id
      const tokenData = JSON.parse(localStorage.getItem('token'))
      const { data: res2 } = await request.get('/addOrder', {
        params: {
          userId: tokenData.userId,
          goodsId,
          buySum,
          payState: receiveStateVal,
          deliverState: false,
          receiveState: false
        }
      })
      return res2
    },
    // 购买后，购物车订单删除,this.onBuy()调用
    async f2(shoppingCarId) {
      const { data: res } = await request.get('/deleteShoopingCar', {
        params: {
          shoppingCarId
        }
      })
      console.log(res)
    },
    // 删除购物车订单
    onDelete(shoppingCarId) {
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
