<template>
  <div class="AdminGoods" v-loading="loading">
    <!-- 头部导航栏 -->
    <HeaderAdmin>
      <template v-slot:search>
        <div style="width:50%;min-width:180px">
          <el-input
            style="width:40%;"
            v-model="searchInput"
            placeholder="请输入用户名"
          ></el-input>
          <el-button
            type="primary"
            style="width:20%;max-width:100px;margin-left:5%"
            @click="DL"
            >{{ isDL ? '禁止登录' : '开启登录' }}</el-button
          >
          <el-button
            type="primary"
            style="width:20%;max-width:100px;margin-left:5%"
            @click="ZC"
            >{{ isZC ? '禁止注册' : '开启注册' }}</el-button
          >
        </div>
      </template>
    </HeaderAdmin>
    <div class="AdminContent">
      <el-empty v-if="isEmpty"></el-empty>
      <GoodsCommon v-else v-for="(item, index) in usersList" :key="item._id">
        <!-- 图片 -->
        <template v-slot:goodsImg>
          <!-- lazy 开启懒加载 可视才加载 -->
          {{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}
        </template>
        <!-- 商品信息 -->
        <template v-slot:goodsDetail>
          <h4>
            <i style="margin-left:20px">用户名：{{ item.username }}</i>
          </h4>
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
          <el-button type="success" @click="prohibit(item._id, item.prohibit)"
            ><b>{{
              item.prohibit === 'false' ? '开启禁止' : '关闭禁止'
            }}</b></el-button
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
        @current-change="getUsers"
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
      // 重置页码
      currentPage: 1,
      // 数据跳过几项
      Skip: 0,
      // 解决删除某条数据后，页面刷新还在当前页数请
      pageNum2: 0,
      // 是否禁止登录
      isDL: true,
      // 是否禁止注册
      isZC: true,
      isEmpty: true,
      loading: true,
      usersList: [],
      // 用户存储全部符合搜索关键字的数据，每当换页时使用
      usersList2: []
    }
  },
  components: {
    GoodsCommon
  },
  created() {
    this.getUsers()
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
    // usersList用户数据请求
    async getUsers(pageNum, search) {
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
      const { data: res } = await request.get('/getUsers', {
        params: {
          count: this.Skip
        }
      })
      this.usersList = []
      this.usersList = res.data
      this.count = res.goodsCount
      // 判断登录功能状态
      const { data: res2 } = await request.get('/getAdminDL')
      switch (res2.data) {
        case 'true':
          this.isDL = true
          break
        case 'false':
          this.isDL = false
          break
      }
      // 判断注册功能状态
      const { data: res3 } = await request.get('/getAdminZC')
      switch (res3.data) {
        case 'true':
          this.isZC = true
          break
        case 'false':
          this.isZC = false
          break
      }
      // 判断userList是否为空时显示
      if (this.usersList.length > 0) {
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
      this.loading = false
    },
    async DL() {
      this.isDL = !this.isDL
      const { data: res } = await request.get('/setAdminDL', {
        params: {
          DL: this.isDL
        }
      })
      alert(res.data)
    },
    async ZC() {
      this.isZC = !this.isZC
      const { data: res } = await request.get('/setAdminZC', {
        params: {
          ZC: this.isZC
        }
      })
      alert(res.data)
    },
    // 搜索
    async searchBtn() {
      this.loading = true
      const { data: res } = await request.get('/getUsersName', {
        params: {
          usersName: this.searchInput
        }
      })
      if (res.isEmpty) {
        this.isEmpty = res.isEmpty
        this.loading = false
        this.count = 0
      } else {
        this.usersList = []
        this.usersList = res
        this.usersList2 = res
        this.count = res.length
        // 解决搜索后的结果出现换页问题
        if (this.usersList2.length > 12) {
          const usersLista = this.usersList2
          // 删除当页前的所有数据
          for (let i = 0; i < (this.pageNum2 - 1) * 12; i++) {
            usersLista.shift()
          }
          // 去数组0-11个，一共12个
          this.usersList = usersLista.slice(0, 12)
        }
        this.isEmpty = false
        this.loading = false
      }
    },
    // 删除指定用户
    dl(userId) {
      request.get('/deleteUser', {
        params: {
          userId
        }
      })
      alert('删除成功！')
      this.getUsers(this.pageNum2, true)
    },
    // 修改 用户账户是否可以正常登录
    async prohibit(userId, prohibit) {
      switch (prohibit) {
        case 'true':
          prohibit = 'false'
          break
        case 'false':
          prohibit = 'true'
          break
      }
      const { data: res } = await request.get('/updateUserLogin', {
        params: {
          userId,
          prohibit: prohibit
        }
      })
      alert(res.data)
      this.getUsers(this.pageNum2)
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
