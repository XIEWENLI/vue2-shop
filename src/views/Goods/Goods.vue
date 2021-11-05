<template>
  <div>
    <!-- 导航栏 -->
    <Header :activeI="activeIndex"></Header>
    <div class="container" v-loading="loadingStatic">
      <!-- 首页轮播图 -->
      <el-card class="box-card">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img :src="item" alt="加载错误！！！" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <!-- 商品展示列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>商品展示区域</h3>
        </div>
        <div style="overflow:auto;height: 640px;margin-bottom: 20px;">
          <ul
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            infinite-scroll-immediate="false"
          >
            <li v-for="item in goodsList" :key="item._id">
              <router-link :to="'/jumpDetail?_id=' + item._id">
                <div class="image">
                  <img :src="item.goodsSRC" alt="加载错误！！！" />
                </div>
                <div class="title">
                  <h2>{{ item.goodsName }}</h2>
                </div>
                <div class="price">
                  <p>
                    <del>原价：{{ item.goodsOldPrice }}</del>
                  </p>
                  <p>现价：{{ item.goodsPrice }}</p>
                  <p>数量：{{ item.goodsSum }}</p>
                </div>
              </router-link>
            </li>
          </ul>
          <p v-if="loading" style="color:red">加载中...</p>
          <p v-if="noMore" style="color:red">没有更多了</p>
        </div>
        <p v-if="!noMore">下拉更新加载更多！</p>
      </el-card>
    </div>
  </div>
</template>
<script>
// axios请求
import request from '../../utils/request'

export default {
  name: 'Goods',
  data() {
    return {
      loadingStatic: true,
      // 商品下拉加载判断是否结束
      loading: false,
      // 导航栏选中
      activeIndex: '1',
      // 数据库查询跳过前面 Skip 项
      Skip: 0,
      // 数据库中商品的总数
      count: 0,
      goodsList: [],
      // 轮播图
      imgs: [
        'https://img11.360buyimg.com/n1/jfs/t1/179770/17/12742/145428/60e2ec6bE197a8dd5/fc13551194e20ba0.jpg',
        'https://img11.360buyimg.com/n1/jfs/t1/208131/34/1381/105367/614a9633Ea9c487bd/6cac5f26c55eacd6.jpg',
        'https://img12.360buyimg.com/n1/jfs/t1/127643/39/19646/110844/60b4975cE7b229c7b/71f18956d90684ea.jpg'
      ]
    }
  },
  created() {
    this.getGoods()
  },
  disabled() {
    this.loadingStatic = true
  },
  // 滑到底部时进行加载判断
  computed: {
    // 大于等于商品总数时停止
    noMore() {
      return this.goodsList.length >= this.count
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
        this.getGoods()
        this.loading = false
      }, 1000)
    },
    // gooodsList商品数据请求
    async getGoods() {
      const { data: res } = await request.get('/getGoods', {
        params: {
          count: this.Skip
        }
      })
      if (this.Skip <= this.count) {
        this.Skip += 12
      }
      this.goodsList = [...this.goodsList, ...res.data]
      this.count = res.goodsCount
      this.loadingStatic = false
    }
  }
}
</script>
<style lang="less" scoped>
// 清除ul浮动的塌陷
.box-card ul::after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
}

.box-card ul {
  border-width: 2px 0px 0px 2px;
  border-color: #e0e0e0;
  border-style: solid;
}

.box-card ul li {
  box-sizing: border-box;
  float: left;
  height: 320px;
  width: 25%;
  border-width: 0px 2px 2px 0px;
  border-color: #e0e0e0;
  border-style: solid;
}

.box-card ul li:hover {
  cursor: pointer;
}

.box-card ul li:hover img {
  width: 70%;
}

.box-card ul li:hover img {
  margin: 0 15%;
}

.image {
  width: 100%;
  height: 210px;
  line-height: 210px;
}

img {
  width: 55%;
  margin: 10% 45/2%;
}

.title,
.price {
  width: 100%;
  text-align: center;
}

.title h2 {
  padding: 0 20px;

  white-space: nowrap; /* 规定文本是否折行 */
  overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
  text-overflow: ellipsis;
}

.price {
  font-size: 15px;
}

.price p:nth-child(1) {
  color: red;
}
</style>
