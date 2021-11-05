<template>
  <div>
    <div>123</div>
    <ul>
      <li><Aside></Aside></li>
      <li><router-view></router-view></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  data() {
    return {
      // 商品加载判断是否结束
      loading: false,
      activeIndex: '',
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
    // 滑到底部时进行加载
    load() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.goodsList.push({ _id: (this.count += 1) })
        console.log(11111)
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  // display: flex;
  background-color: #fff;
  height: 100%;
  width: 100%;
  min-width: 1200px;
}

ul li {
  float: left;
  height: 100%;
}
</style>
