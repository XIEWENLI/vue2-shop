<template>
  <div>
    <Header :activeI="activeIndex"> </Header>
    <div class="container">
      <!-- 商品展示列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-badge :value="200" :max="99">
            <el-button type="text">用户信息</el-button>
          </el-badge>
        </div>
        <div>
          <h1>Users组件</h1>
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
      activeIndex: '1',
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
