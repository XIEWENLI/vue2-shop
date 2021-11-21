<template>
  <div class="AdminOrder" v-loading="loading">
    <!-- 头部导航栏 -->
    <HeaderAdmin>
      <template v-slot:search>
        <div style="width:50%">
          <el-input
            style="width:40%;"
            v-model="searchInput"
            placeholder="请输入用户名"
          ></el-input>
        </div>
      </template>
    </HeaderAdmin>
    <div class="AdminContent">
      <el-empty v-if="isEmpty"></el-empty>
      <GoodsCommon v-else v-for="(item, index) in orderList" :key="item._id">
        <!-- 图片 -->
        <template v-slot:goodsImg>
          <!-- lazy 开启懒加载 可视才加载 -->
          {{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}
          <el-image
            style="width: 60px; height: 60px;"
            :src="item.goodsSRC"
            fit="fit"
            lazy
          ></el-image>
        </template>
        <!-- 商品信息 -->
        <template v-slot:goodsDetail>
          <h4>
            用户名：{{ item.username }}
            <i style="margin-left:20px">商品名：{{ item.goodsName }}</i>
            <i style="margin-left:20px">现价：{{ item.goodsPrice }}</i>
          </h4>
          <p>{{ item.goodsDetail }}</p>
        </template>
        <!-- 数量 -->
        <template v-slot:goodsBuySum>
          <ul>
            <li>数量：{{ item.buySum }}</li>
            <li>
              总价：
              <b style="color:red">￥{{ item.buySum * item.goodsPrice }}</b>
            </li>
          </ul>
        </template>
        <!-- 删除 -->
        <template v-slot:goodsBtn
          ><el-button
            type="danger"
            @click="
              dl(
                item.goodsId,
                item._id,
                item.goodsSum,
                item.buySum,
                item.receiveState
              )
            "
            ><b>删除</b></el-button
          ></template
        >
        <!-- 修改 -->
        <template v-slot:goodsBuy>
          <h2
            v-if="
              item.payState === 'false' &&
                item.deliverState === 'false' &&
                item.receiveState === 'false'
            "
          >
            未付款
          </h2>
          <el-button
            type="success"
            v-if="
              item.payState === 'true' &&
                item.deliverState === 'false' &&
                item.receiveState === 'false'
            "
            @click="deliverBtn(item._id)"
            >发货</el-button
          >
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
      </GoodsCommon>
    </div>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="count"
        @current-change="getGoods"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// axios请求
import request from '@/utils/request.js'
import GoodsCommon from '@/components/GoodsCommon/GoodsCommon'

export default {
  data() {
    return {
      name: 'AdminOrder',
      // 搜索关键字
      searchInput: '',
      // 商品总数量
      count: 0,
      // 一页展示12条
      pageSize: 12,
      // 数据跳过几项
      Skip: 0,
      // 解决删除某条数据后，页面刷新还在当前页数请
      pageNum2: 0,
      // 重置页码
      currentPage: 1,
      isEmpty: true,
      loading: true,
      orderList: [],
      orderList2: []
    }
  },
  components: {
    GoodsCommon
  },
  created() {
    this.getGoods()
  },
  watch: {
    // 搜索框内容变化时，实时请求数据回来
    searchInput() {
      // 搜索后跳转到第1页
      this.currentPage = 1
      // 重新定义页码值，用于筛选数据
      this.pageNum2 = 1
      this.searchBtn()
    },
    // 换页时触发，根据页码展示数据
    pageNum2() {
      if (this.searchInput !== '') {
        this.searchBtn()
      }
    }
  },
  methods: {
    // gooodsList商品数据请求
    async getGoods(pageNum, search) {
      if (pageNum === undefined) {
        pageNum = 1
      }
      this.pageNum2 = pageNum
      // 搜索关键字不为空时，不用请求回全部数据
      if (this.searchInput !== '') {
        if (search === true) {
          this.searchBtn()
        }
        return
      }
      this.loading = true
      this.orderList = []
      if (pageNum < this.count / 12 + 1) {
        this.Skip = 12 * (pageNum - 1)
      }
      // order表
      const { data: res } = await request.get('/getOrder', {
        params: {
          count: this.Skip
        }
      })
      // 订单总数
      this.count = res.goodsCount
      this.orderList = res.data
      // orderList添加商品的信息
      for (let i = 0; i < res.data.length; i++) {
        // goods表
        const { data: res2 } = await request.get('/getGoodsOne', {
          params: {
            _id: res.data[i].goodsID
          }
        })
        // 解决order表存在，而goods已经删除出现的报错问题
        if (res2.goods === null) {
          request.get('/deleteOrder', {
            params: {
              orderId: res.data[i]._id
            }
          })
          break
        }
        // users表
        const { data: res3 } = await request.get('/getUserOne', {
          params: {
            userId: res.data[i].userID
          }
        })
        // 解决getGoods的axios未请求完成时，就搜索而报错
        if (this.searchInput === '') {
          this.orderList[i].goodsId = res2.goods._id
          this.orderList[i].goodsName = res2.goods.goodsName
          this.orderList[i].goodsSum = res2.goods.goodsSum
          this.orderList[i].goodsPrice = res2.goods.goodsPrice
          this.orderList[i].goodsDetail = res2.goods.goodsDetail
          this.orderList[i].goodsSRC = res2.goods.goodsSRC
          this.orderList[i].username = res3.data.username
        }
      }
      if (this.orderList.length > 0) {
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
      this.loading = false
    },
    // 搜索
    async searchBtn() {
      this.loading = true
      if (this.searchInput === '') {
        this.getGoods()
        return
      }
      this.orderList = []
      // 查询user表，res用户数组
      const { data: res } = await request.get('/getUserName', {
        params: {
          userName: this.searchInput
        }
      })
      for (let i = 0; i < res.length; i++) {
        // 查询order表，res2订单数组
        const { data: res2 } = await request.get('/getOrderUserID', {
          params: {
            userID: res[i]._id
          }
        })
        for (let j = 0; j < res2.length; j++) {
          // 查询goods表，res3商品数组
          const { data: res3 } = await request.get('/getGoodsOne', {
            params: {
              _id: res2[i].goodsID
            }
          })
          res2[j].goodsId = res3.goods._id
          res2[j].goodsName = res3.goods.goodsName
          res2[j].goodsSum = res3.goods.goodsSum
          res2[j].goodsPrice = res3.goods.goodsPrice
          res2[j].goodsDetail = res3.goods.goodsDetail
          res2[j].goodsSRC = res3.goods.goodsSRC
          res2[j].username = res[i].username
        }
        this.orderList = [...this.orderList, ...res2]
      }
      if (res.isEmpty) {
        this.isEmpty = res.isEmpty
        this.loading = false
        this.count = 0
      } else {
        this.count = this.orderList.length
        this.orderList2 = this.orderList
        // 解决搜索后的结果出现换页问题
        if (this.orderList2.length > 12) {
          const orderLista = this.orderList2
          for (let i = 0; i < (this.pageNum2 - 1) * 12; i++) {
            // 删除当页前的所有数据
            orderLista.shift()
          }
          // 去数组0-11个，一共12个
          this.orderList = orderLista.slice(0, 12)
        }
        this.isEmpty = false
        this.loading = false
      }
    },
    // 删除指定商品
    dl(goodsId, orderId, goodsSum, buySum, receiveState) {
      if (receiveState === 'false') {
        request.get('/updateGoodsSum', {
          params: {
            goodsId,
            goodsSum: goodsSum + buySum
          }
        })
      }
      request.get('/deleteOrder', {
        params: {
          orderId
        }
      })
      alert('删除成功！')
      this.getGoods(this.pageNum2, true)
    },
    // 发货
    async deliverBtn(orderId) {
      const { data: res } = await request.get('/updateState', {
        params: {
          orderId,
          payState: true,
          deliverState: true,
          receiveState: false
        }
      })
      alert(res.data)
      this.getGoods(this.pageNum2)
    }
  }
}
</script>
<style lang="less" scoped>
.AdminContent {
  margin-top: 2px;
  width: 1100px;
  overflow: auto;
}

.block {
  margin: 10px 0 20px 0;
}
</style>
