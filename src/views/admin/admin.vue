<template>
  <div>
    <Header :activeI="activeIndex">
      <template v-slot:SY>
        <el-menu-item
          style="margin-left: 2%;padding:0;font-size:28px;color:black;font-weight:bold"
          >Admin页面</el-menu-item
        >
      </template>
    </Header>
    <div>
      <h1>Admin组件</h1>
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
      activeIndex: '',
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
