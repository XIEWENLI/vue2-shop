<template>
  <div class="AdminSupplier" v-loading="loading">
    <!-- 头部导航栏 -->
    <HeaderAdmin>
      <template v-slot:search>
        <div style="width: 50%">
          <el-input
            style="width: 40%"
            v-model="searchInput"
            placeholder="请输入供应商名称"
          ></el-input>
          <el-button
            type="primary"
            style="width: 20%; max-width: 80px; margin-left: 10%"
            @click="add()"
            >添加</el-button
          >
        </div>
      </template>
    </HeaderAdmin>
    <div class="AdminContent">
      <el-empty v-if="isEmpty"></el-empty>
      <GoodsCommon v-else v-for="(item, index) in supplierList" :key="item._id">
        <!-- 编号 -->
        <template v-slot:goodsImg>
          {{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}
        </template>
        <!-- 供应商名字 -->
        <template v-slot:goodsDetail>
          <h4>
            {{ item.supplierName }}
          </h4>
        </template>
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
  </div>
</template>
<script>
// axios请求
import request from '@/utils/request.js'
import GoodsCommon from '@/components/GoodsCommon/GoodsCommon'

export default {
  data() {
    return {
      name: 'AdminSupplier',
      // 搜索关键字
      searchInput: '',
      loading: true,
      isEmpty: true,
      supplierList: []
    }
  },
  components: {
    GoodsCommon
  },
  created() {
    this.getSupplier()
  },
  watch: {
    // 搜索框内容变化时，实时请求数据回来
    searchInput() {
      this.searchBtn()
    }
  },
  methods: {
    // 获取全部供应商
    async getSupplier() {
      const { data: res } = await request.get('/getSuppliers')
      this.supplierList = [...res.reverse()]
      if (this.supplierList.length > 0) {
        this.isEmpty = false
      }
      this.loading = false
    },
    // 搜索
    async searchBtn() {
      if (this.searchInput !== '') {
        const { data: res } = await request.get('/getSupplierName', {
          params: {
            supplierName: this.searchInput
          }
        })
        this.supplierList = res.reverse()
      } else {
        this.getSupplier()
      }
    },
    // 添加
    add() {
      this.$router.push('/jumpAdminAddSupplier')
    },
    // 删除
    dl(id) {
      request.get('/deleteSupplier', {
        params: {
          id
        }
      })
      alert('删除成功！')
      this.getSupplier()
    },
    // 修改
    up(id) {
      this.$router.replace('/jumpAdminUpdateSupplier?id=' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.AdminSupplier {
  margin-top: 2px;
  width: 1100px;
  overflow: auto;
}

.block {
  margin: 10px 0 20px 0;
}
</style>
