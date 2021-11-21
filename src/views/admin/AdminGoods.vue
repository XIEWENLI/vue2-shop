<template>
  <div class="AdminGoods" v-loading="loading">
    <!-- 头部导航栏 -->
    <HeaderAdmin>
      <template v-slot:search>
        <div style="width:50%">
          <el-input
            style="width:40%;"
            v-model="searchInput"
            placeholder="请输入商品名称"
          ></el-input>
          <el-button
            type="primary"
            style="width:20%;max-width:80px;margin-left:10%"
            @click="add"
            >添加</el-button
          >
        </div>
      </template>
    </HeaderAdmin>
    <div class="AdminContent">
      <el-empty v-if="isEmpty"></el-empty>
      <GoodsCommon v-else v-for="(item, index) in goodsList" :key="item._id">
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
            {{ item.goodsName }}
            <i style="margin-left:20px">现价：{{ item.goodsPrice }}</i>
            <i style="margin-left:20px">原价：{{ item.goodsOldPrice }}</i>
            <i style="margin-left:20px">库存：{{ item.goodsSum }}</i>
          </h4>
          <p>{{ item.goodsDetail }}</p>
        </template>
        <!-- 数量 -->
        <template v-slot:goodsBuySum> </template>
        <!-- 删除 -->
        <template v-slot:goodsBtn
          ><el-button type="danger" @click="dl(item._id)"
            ><b>删除</b></el-button
          ></template
        >
        <!-- 修改 -->
        <template v-slot:goodsBuy>
          <el-button type="success" @click="up(item._id)"
            ><b>修改</b></el-button
          >
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
      name: 'AdminGoods',
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
      goodsList: [],
      // 用户存储全部符合搜索关键字的数据，每当换页时使用
      goodsList2: []
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
      if (pageNum < this.count / 12 + 1) {
        this.Skip = 12 * (pageNum - 1)
      }
      const { data: res } = await request.get('/getGoods', {
        params: {
          count: this.Skip
        }
      })
      this.goodsList = []
      this.goodsList = res.data
      this.count = res.goodsCount
      if (this.goodsList.length > 0) {
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
      this.loading = false
    },
    // 搜索
    async searchBtn() {
      this.loading = true
      const { data: res } = await request.get('/getGoodsName', {
        params: {
          goodsName: this.searchInput
        }
      })
      if (res.isEmpty) {
        this.isEmpty = res.isEmpty
        this.loading = false
        this.count = 0
      } else {
        this.goodsList = []
        this.goodsList = res
        this.goodsList2 = res
        this.count = res.length
        // 解决搜索后的结果出现换页问题
        if (this.goodsList2.length > 12) {
          const goodsLista = this.goodsList2
          for (let i = 0; i < (this.pageNum2 - 1) * 12; i++) {
            // 删除当页前的所有数据
            goodsLista.shift()
          }
          // 去数组0-11个，一共12个
          this.goodsList = goodsLista.slice(0, 12)
        }
        this.isEmpty = false
        this.loading = false
      }
    },
    // 商品添加
    add() {
      this.$router.replace('/jumpAdminAddGoods')
    },
    // 删除指定商品
    dl(goodsId) {
      request.get('/deleteGoods', {
        params: {
          goodsId
        }
      })
      alert('删除成功！')
      this.getGoods(this.pageNum2, true)
    },
    // 修改商品信息
    up(goodsId) {
      this.$router.replace('/jumpAdminUpdateGoods?goodsId=' + goodsId)
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
