<template>
  <div class="DetailContainer">
    <ul>
      <li>
        <div class="image">
          <img
            src="//img10.360buyimg.com/img/s200x200_jfs/t1/192470/16/8260/65365/60c85542E92717c48/5a933ad9808eee20.jpg!cc_100x100.webp"
            alt="加载错误！！！"
          />
        </div>
      </li>
      <li>
        <el-form label-width="100px">
          <el-form-item label="商品名字：">
            <h2>手机</h2>
          </el-form-item>
          <el-form-item label="商品详情：">
            <p style="word-wrap:break-word; ">{{ detail }}</p>
          </el-form-item>
          <el-form-item label="商品总数：">
            <p>{{ sum }}</p>
          </el-form-item>
          <el-form-item label="商品数量：">
            <el-row>
              <el-button @click="reduce">-</el-button>
              <el-input style="width:20%" type="number" v-model="count" />
              <el-button @click="add">+</el-button>
            </el-row>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button type="primary" @click="onSubmit">立即购买</el-button>
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
export default {
  name: 'Detail',
  data() {
    return {
      sum: 50,
      count: 1,
      detail:
        '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    }
  },
  methods: {
    add() {
      if (this.count <= this.sum) {
        this.count += 1
      }
    },
    reduce() {
      if (this.count > 1) {
        this.count -= 1
      }
    },
    onSubmit() {},
    addShoppingCar() {},
    goBack() {
      this.$router.replace('/')
    }
  },
  watch: {
    count(newVal, oldVal) {
      if (newVal > this.sum) {
        this.count = this.sum
      }
      if (newVal < 1) {
        this.count = 1
      }
    }
  }
}
</script>
<style lang="less" scoped>
.DetailContainer {
  width: 80%;
  margin: 0 auto;
}

ul li {
  float: left;
  width: 50%;
}

.el-form {
  margin-top: 10px;
}

img {
  width: 80%;
  margin-left: 10%;
}
</style>
