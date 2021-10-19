<template>
  <div class="DetailContainer">
    <ul>
      <li>
        <div class="image">
          <img :src="goods.goodsSRC" alt="加载错误！！！" />
        </div>
      </li>
      <li>
        <el-form label-width="100px">
          <el-form-item label="商品名字：">
            <h2>{{ goods.goodsName }}</h2>
          </el-form-item>
          <el-form-item label="商品详情：">
            <p style="word-wrap:break-word; ">{{ goods.goodsDetail }}</p>
          </el-form-item>
          <el-form-item label="商品总数：">
            <p>{{ goods.goodsSum }}</p>
          </el-form-item>
          <el-form-item style="margin-left:-10px" label="购买数量:">
            <el-row>
              <el-button @click="reduce">-</el-button>
              <el-input
                style="width:100px;margin-left:10px;margin-right:10px"
                type="number"
                v-model="buySum"
              />
              <el-button @click="add">+</el-button>
            </el-row>
          </el-form-item>
          <el-form-item label-width="30px">
            <el-button type="primary" @click="onBuy">立即购买</el-button>
            <el-button type="danger" @click="addShoppingCar"
              >加入购物车</el-button
            >
            <el-button style="margin-left:80px" @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </li>
    </ul>
  </div>
</template>
<script>
import request from '../../utils/request'

export default {
  name: 'Detail',
  data() {
    return {
      buySum: 1,
      goods: {}
    }
  },
  created() {
    this.getGoodsDetail()
  },
  methods: {
    // 获取商品信息
    async getGoodsDetail() {
      const _id = location.hash.split('?')[1].split('=')[1]
      const { data: res } = await request.get('/getGoodsOne', {
        params: {
          _id: _id
        }
      })
      this.goods = res.goods
    },

    // 商品购买数+1
    add() {
      if (this.buySum <= this.goods.goodsSum) {
        this.buySum += 1
      }
    },
    // 商品购买数-1
    reduce() {
      if (this.buySum > 1) {
        this.buySum -= 1
      }
    },
    onBuy() {},
    addShoppingCar() {},
    // 跳转首页
    goBack() {
      this.$router.replace('/')
    }
  },
  watch: {
    // 侦听商品购买数量，不能<1或>总数
    buySum(newVal, oldVal) {
      if (newVal > this.goods.goodsSum) {
        this.buySum = this.goods.goodsSum
      }
      if (newVal < 1) {
        this.buySum = 1
      }
    }
  }
}
</script>
<style lang="less" scoped>
.DetailContainer {
  width: 80%;
  margin: 20px auto;
}

ul li {
  float: left;
  width: 50%;
}

.el-form {
  margin-top: 30px;
}

img {
  width: 80%;
  margin-left: 10%;
}
</style>
