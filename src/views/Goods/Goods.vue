<template>
  <div>
    <Header :activeI="activeIndex" class="chacao">
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
          <span>商品展示区域</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div style="overflow:auto;height: 640px;margin-bottom: 20px;">
          <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <li @click="jumpDetail" v-for="item in goodsList" :key="item._id">
              <div class="image">
                <img
                  src="//img10.360buyimg.com/img/s200x200_jfs/t1/192470/16/8260/65365/60c85542E92717c48/5a933ad9808eee20.jpg!cc_100x100.webp"
                  alt="加载错误！！！"
                />
              </div>
              <div class="title">
                <h2>{{ item._id }}</h2>
              </div>
              <div class="price">
                <p><del>原价：123.00</del></p>
                <p>现价：456.00</p>
                <p>数量：456</p>
              </div>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
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
      imgs: [
        'https://img11.360buyimg.com/n1/jfs/t1/179770/17/12742/145428/60e2ec6bE197a8dd5/fc13551194e20ba0.jpg',
        'https://img11.360buyimg.com/n1/jfs/t1/208131/34/1381/105367/614a9633Ea9c487bd/6cac5f26c55eacd6.jpg',
        'https://img12.360buyimg.com/n1/jfs/t1/127643/39/19646/110844/60b4975cE7b229c7b/71f18956d90684ea.jpg'
      ]
    }
  },
  created() {
    // this.getGoods()
  },
  // 滑到底部时进行加载判断
  computed: {
    noMore() {
      return this.goodsList.length >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    // //滑到底部时进行加载
    load() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.goodsList.push({ _id: (this.count += 1) })
        console.log(11111)
      }, 1000)
    },
    // gooodsList商品数据请求
    async getGoods() {
      const { data: res } = await request.get('/getGoods')
      this.goodsList = res.data
    },
    jumpDetail() {
      this.$router.push('/jumpDetail')
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
