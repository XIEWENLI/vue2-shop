<template>
  <div v-loading="loadingStatic" class="AllOrderContainer">
    <!-- 购物车商品为空展示 -->
    <!-- el-table的height属性可固定表头 -->
    <el-empty v-if="isEmpty" description="购物车空空的哦！！！"
      ><router-link to="/"><el-button>去购物</el-button></router-link></el-empty
    >
    <!-- 购物车商品信息展示 -->
    <GoodsCommon v-else v-for="item in goodsList" :key="item.createAt">
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
          <i style="margin-left:20px">单价：￥{{ item.goodsPrice }}</i>
        </h4>
        <p>{{ item.goodsDetail }}</p>
      </template>
      <!-- 数量 -->
      <template v-slot:goodsBuySum>
        <OrderSum
          :buySum2="item.buySum"
          :goodsPrice2="item.goodsPrice"
        ></OrderSum>
      </template>
      <!-- 操作1 -->
      <template v-slot:goodsBtn
        ><el-button
          type="danger"
          @click="
            onDelete(
              item._id,
              item.orderId,
              item.goodsSum,
              item.buySum,
              item.receiveState
            )
          "
          ><b>删除</b></el-button
        ></template
      >
      <!-- 操作2 -->
      <template v-slot:goodsBuy><h2>待发货</h2></template>
    </GoodsCommon>
  </div>
</template>
<script>
import request from '@/utils/request.js'
import GoodsCommon from '@/components/GoodsCommon/GoodsCommon'
import OrderSum from '@/components/GoodsCommon/OrderSum'
import eventBus from '@/utils/eventBus.js'

export default {
  name: 'AllOrder',
  data() {
    return {
      loadingStatic: true,
      // 购物车为空界面显示
      isEmpty: true,
      // 导航栏选中
      activeIndex: '3',
      // 展示商品信息
      goodsList: []
    }
  },
  components: {
    GoodsCommon,
    OrderSum
  },
  created() {
    this.getGoods()
  },
  methods: {
    // 获取全部订单
    async getGoods() {
      eventBus.$emit('cl3', 3)
      const token = JSON.parse(localStorage.getItem('token'))
      // 按用户_id，查订单表
      const { data: res } = await request.get('/getNotDeliverGoodsOrder', {
        params: {
          userId: token.userId,
          payState: true,
          deliverState: false
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
          // 解决order表存在，而goods已经删除出现的报错问题
          if (res2.goods === null) {
            request.get('/deleteOrder', {
              params: {
                orderId: res.goodsData[i]._id
              }
            })
            break
          }
          res2.goods.buySum = res.goodsData[i].buySum
          res2.goods.orderId = res.goodsData[i]._id
          res2.goods.receiveState = res.goodsData[i].receiveState
          this.goodsList.unshift(res2.goods)
        }
      }
      this.isEmpty = res.isEmpty
      this.loadingStatic = false
    },
    // 删除订单
    async onDelete(goodsId, orderId, goodsSum, buySum, receiveState) {
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
          if (receiveState === 'false') {
            request.get('/updateGoodsSum', {
              params: {
                goodsId,
                goodsSum: goodsSum + buySum
              }
            })
          }
          request.get('deleteOrder', {
            params: {
              orderId
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
<style lang="less" scoped>
.AllOrderContainer {
  width: 80%;
  position: relative;
  top: 61px;
}
</style>
