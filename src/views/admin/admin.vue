<template>
  <div>
    <Header :activeI="activeIndex">
      <template v-slot:SY>
        <el-menu-item
          style="margin-left: 2%;padding:0;font-size:28px;color:black;font-weight:bold"
          >Admin页面</el-menu-item
        >
      </template>
      <!-- 操作 -->
      <template v-slot:CZ>
        <el-submenu style="margin-left: 70%;" index="4">
          <template slot="title">我的工作台</template>
          <el-menu-item
            ><router-link style="display:block;width:100%" to="/"
              >退出</router-link
            ></el-menu-item
          >
        </el-submenu>
      </template>
    </Header>
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
