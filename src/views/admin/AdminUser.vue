<template>
  <div class="AdminGoodsContainer">
    <div class="search">123</div>
    <div style="overflow:auto;" class="infinite-list-wrapper">
      <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <li v-for="i in count" :key="i">
          <div>{{ i }}</div>
        </li>
      </ul>
      <p v-if="loading" style="color:red">加载中...</p>
      <p v-if="noMore" style="color:red">没有更多了</p>
    </div>
    <p v-if="noMore" style="height:20px;">已经加载完啦！</p>
    <p v-if="!noMore" style="height:20px;">
      下拉更新加载更多！
    </p>
  </div>
</template>

<script>
export default {
  name: 'AdminGoods',
  data() {
    return {
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 40
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
        console.log(111)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.AdminGoodsContainer {
  width: 100%;
  height: 100%;
}

.search {
  height: 50px;
}

.infinite-list-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 580px;
  border: 2px solid #e0e0e0;
}
ul {
  padding-left: 20px;
}

ul li div {
  width: 800px;
  height: 30px;
}
</style>
