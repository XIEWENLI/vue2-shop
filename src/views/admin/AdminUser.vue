<template>
  <div class="AdminGoodsContainer">
    <!-- 搜索 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="search"
        clearable
        class="search_input"
      >
      </el-input>
      <el-button class="search_button" type="primary">搜索</el-button>
      <el-button
        class="search_button"
        type="success"
        style="margin-left:36%"
        @click="addGoods = true"
        >添加</el-button
      >
    </div>
    <!-- 商品列表标题 -->
    <div class="bt">
      <h3>1</h3>
      <h3>2</h3>
      <h3>3</h3>
    </div>
    <!-- 添加商品页面 -->
    <div class="addGoods" v-if="addGoods">
      <form action="" method="post">
        <el-input
          style="width:350px"
          placeholder="请输入名称"
          v-model="username"
          clearable
        >
        </el-input
        ><br />
        <el-button type="primary" style="margin-top:30px">确认</el-button>
        <el-button @click="addGoods = false">取消</el-button>
      </form>
    </div>
    <!-- 商品列表 -->
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
      search: '',
      drawer: false,
      addGoods: false,
      username: '',
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

/* 搜索 */
.search {
  position: relative;
  height: 50px;
}

.search_input {
  width: 40%;
  height: 100%;
  margin-left: 20px;
  margin-top: 5px;
}

.search_button {
  margin-left: 25px;
  margin-top: 5px;
}

/* 商品列表标题 */
.bt {
  display: flex;
  width: 80%;
}

.bt h3 {
  display: inline-block;
  width: 40px;
  height: 10px;
  text-align: center;
}

/* 添加商品页面 */
.addGoods {
  position: absolute;
  width: 80%;
  height: 580px;
  z-index: 99;
  background-color: red;
}

.addGoods form {
  margin-top: 20px;
  margin-left: 20px;
}

/* 商品列表 */
.infinite-list-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 540px;
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
