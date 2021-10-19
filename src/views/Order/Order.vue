<template>
  <div>
    <Header :activeI="activeIndex">
      <!-- 首页 -->
      <template v-slot:SY>
        <el-menu-item index="1" style="margin-left: 1%;padding:0"
          ><router-link
            style="display:block;height:100%;width:100%;padding:0 20px 0 20px"
            to="/"
            >首页</router-link
          ></el-menu-item
        >
      </template>
      <!-- 购物车 -->
      <template v-slot:SC>
        <el-menu-item index="2" style="padding:0"
          ><router-link
            style="display:block;height:100%;width:100%;padding:0 20px 0 20px"
            to="/jumpShoppingCar"
            >购物车</router-link
          ></el-menu-item
        >
      </template>
      <!-- 订单 -->
      <template v-slot:OD>
        <el-menu-item index="3" style="padding:0"
          ><router-link
            style="display:block;height:100%;width:100%;padding:0 20px 0 20px"
            to="/jumpOrder"
            >订单</router-link
          ></el-menu-item
        >
      </template>
    </Header>
    <div class="container">
      <!-- 商品展示列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-badge :value="200" :max="99">
            <el-button type="text">订单</el-button>
          </el-badge>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="goodsList"
            height="600"
            style="width: 100%"
          >
            <el-table-column prop="_id" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="_id" label="地址"> </el-table-column>
            <el-table-column label="操作"
              ><el-button>取消订单</el-button></el-table-column
            >
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShoppingCar',
  data() {
    return {
      // 商品加载判断是否结束
      loading: false,
      activeIndex: '3',
      count: 6,
      goodsList: [],
      // 选中的数组
      multipleSelection: []
    }
  },
  computed: {
    noMore() {
      return this.goodsList.length >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    jumpDetail() {
      this.$router.push('/jumpDetail')
    }
  }
}
</script>
<style lang="less" scoped></style>
