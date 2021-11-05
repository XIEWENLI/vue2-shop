<template>
  <div v-loading="loadingStatic" class="AllOrderContainer">
    <!-- 购物车商品为空展示 -->
    <!-- el-table的height属性可固定表头 -->
    <el-empty v-if="isEmpty" description="购物车空空的哦！！！"
      ><router-link to="/"><el-button>去购物</el-button></router-link></el-empty
    >
    <!-- 购物车商品信息展示 -->
    <goodsCommon v-else v-for="item in goodsList" :key="item.createAt">
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
        ><el-button type="danger" @click="onDelete(item.orderId)"
          ><b>删除</b></el-button
        ></template
      >
      <!-- 操作2  v-if=true,表示插入元素-->
      <template v-slot:goodsBuy
        ><el-button
          v-if="
            item.payState === 'false' &&
              item.deliverState === 'false' &&
              item.receiveState === 'false'
          "
          type="success"
          @click="onBuy(item.orderId, item.buySum, item.goodsPrice)"
          ><b>付款</b></el-button
        >
        <h2
          v-if="
            item.payState === 'true' &&
              item.deliverState === 'false' &&
              item.receiveState === 'false'
          "
        >
          待发货
        </h2>
        <h2
          v-if="
            item.payState === 'true' &&
              item.deliverState === 'true' &&
              item.receiveState === 'false'
          "
        >
          待签收
        </h2>
        <h2
          v-if="
            item.payState === 'true' &&
              item.deliverState === 'true' &&
              item.receiveState === 'true'
          "
        >
          已签收
        </h2>
      </template>
    </goodsCommon>
  </div>
</template>
<script>
import request from '@/utils/request.js'
import goodsCommon from '@/components/goodsCommon/goodsCommon'
import OrderSum from '@/components/goodsCommon/OrderSum'
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
    goodsCommon,
    OrderSum
  },
  created() {
    this.getGoods()
  },
  methods: {
    // 获取全部订单
    async getGoods() {
      eventBus.$emit('cl1', 1)
      const token = JSON.parse(localStorage.getItem('token'))
      // 工具用户_id，查订单表
      const { data: res } = await request.get('/getAllOrder', {
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
          res2.goods.orderId = res.goodsData[i]._id
          res2.goods.payState = res.goodsData[i].payState
          res2.goods.deliverState = res.goodsData[i].deliverState
          res2.goods.receiveState = res.goodsData[i].receiveState
          this.goodsList.unshift(res2.goods)
        }
      }
      this.isEmpty = res.isEmpty
      this.loadingStatic = false
    },
    // 订单付款，修改payState值为true
    onBuy(orderId, buySum, goodsPrice) {
      this.$confirm(
        '<h4">请付款:</h4>' +
          '<h3 style="color:red">' +
          '￥' +
          buySum * goodsPrice +
          '</h3>',
        '付款界面',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }
      )
        .then(async () => {
          const { data: res } = await request.get('/updataBuyStateOrder', {
            params: {
              orderId,
              payState: true
            }
          })
          console.log(res)
          this.$message({
            type: 'success',
            showClose: true,
            duration: '1000',
            message: '支付成功！'
          })
          // 刷新当前页面
          this.$router.go(0)
        })
        .catch(async () => {})
    },
    // 删除订单
    onDelete(orderId) {
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
}
</style>
