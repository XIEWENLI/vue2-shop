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
      <!-- 操作 -->
      <template v-slot:CZ>
        <el-submenu style="margin-left: 69%;" index="4">
          <template slot="title">我的工作台</template>
          <el-menu-item index="4-1"
            ><router-link style="display:block;width:100%" to="/jumpUsers"
              >个人信息</router-link
            ></el-menu-item
          >
          <el-menu-item
            ><router-link style="display:block;width:100%" to="/"
              >退出</router-link
            ></el-menu-item
          >
        </el-submenu>
      </template>
    </Header>
    <div class="container">
      <!-- 商品展示列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-badge :value="200" :max="99">
            <el-button type="text">购物车</el-button>
          </el-badge>
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><p @click="toggleSelection()">取消选择</p></el-dropdown-item
                >
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="goodsList"
            height="600"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="_id" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="_id" label="地址"> </el-table-column>
            <el-table-column label="DELETE"
              ><el-button>删除</el-button></el-table-column
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
      activeIndex: '2',
      count: 6,
      goodsList: [
        { _id: 1 },
        { _id: 2 },
        { _id: 3 },
        { _id: 4 },
        { _id: 5 },
        { _id: 6 }
      ],
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
    },
    // 多选
    toggleSelection() {
      this.$refs.multipleTable.clearSelection()
      console.log(this.multipleSelection)
      console.log(11111111)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    }
  }
}
</script>
<style lang="less" scoped></style>
