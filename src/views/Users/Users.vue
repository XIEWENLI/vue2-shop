<template>
  <div>
    <Header :activeI="activeIndex"></Header>
    <!-- 商品展示列表 -->
    <div class="container">
      <h1>user组件</h1>
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
      activeIndex: '4-1',
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
