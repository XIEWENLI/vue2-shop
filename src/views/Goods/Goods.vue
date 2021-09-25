<template>
  <div class="goodsContainer">
    <template>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="加载错误！！！" />
        </el-carousel-item>
      </el-carousel>
    </template>
    <ul>
      <li @click="jumpDetail" v-for="item in goodsList" :key="item._id">
        <div class="goods">
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
        </div>
      </li>
      <div style="clear:both"></div>
    </ul>
  </div>
</template>
<script>
import request from '../../utils/request'

export default {
  name: 'Goods',
  data() {
    return {
      goodsList: '',
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
  methods: {
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
.goodsContainer {
  width: 100%;
}

ul {
  border-width: 2px 0px 0px 2px;
  border-color: #e0e0e0;
  border-style: solid;
}

ul li {
  box-sizing: border-box;
  float: left;
  height: 320px;
  width: 25%;
  border-width: 0px 2px 2px 0px;
  border-color: #e0e0e0;
  border-style: solid;
}

ul li:hover {
  cursor: pointer;
}

ul li:hover img {
  width: 70%;
}

ul li:hover img {
  margin: 0 15%;
}

.image {
  width: 100%;
  height: 210px;
  line-height: 210px;
}

img {
  width: 55%;
  margin: 0 45/2%;
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
