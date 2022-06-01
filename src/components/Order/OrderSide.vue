<template>
  <div class="OrderSideContainer">
    <div class="side">
      <div>
        <router-link :class="cl1" to="/jumpOrder/jumpAllOrder"
          >全部订单</router-link
        >
      </div>
      <div>
        <router-link :class="cl2" to="/jumpOrder/jumpNoPayOrder"
          >未付款订单</router-link
        >
      </div>
      <div>
        <router-link :class="cl3" to="/jumpOrder/jumpNotDeliverGoodsOrder"
          >待审核订单</router-link
        >
      </div>
      <div>
        <router-link :class="cl4" to="/jumpOrder/jumpNotReceiveGoodsOrder"
          >待验收订单</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from '@/utils/eventBus.js'

export default {
  data() {
    return {
      name: 'OrderSide',
      bgClass: 1,
      cl1: '',
      cl2: '',
      cl3: '',
      cl4: ''
    }
  },
  watch: {
    bgClass: {
      handler() {
        this.BtnBG()
      },
      immediate: true
    }
  },
  methods: {
    // 侧边导航栏选中颜色
    BtnBG() {
      eventBus.$on('cl1', (val) => {
        this.bgClass = val
      })
      eventBus.$on('cl2', (val) => {
        this.bgClass = val
      })
      eventBus.$on('cl3', (val) => {
        this.bgClass = val
      })
      eventBus.$on('cl4', (val) => {
        this.bgClass = val
      })
      switch (this.bgClass) {
        case 1:
          this.cl1 = 'cl'
          this.cl2 = ''
          this.cl3 = ''
          this.cl4 = ''
          break
        case 2:
          this.cl1 = ''
          this.cl2 = 'cl'
          this.cl3 = ''
          this.cl4 = ''
          break
        case 3:
          this.cl1 = ''
          this.cl2 = ''
          this.cl3 = 'cl'
          this.cl4 = ''
          break
        case 4:
          this.cl1 = ''
          this.cl2 = ''
          this.cl3 = ''
          this.cl4 = 'cl'
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.OrderSideContainer {
  width: 10%;
  min-width: 100px;
}

.side {
  position: fixed;
  top: 70px;
  left: 16px;
}

.side div {
  margin-bottom: 12px;
  font-weight: bold;
}

// 侧边栏字体选中时的颜色
.cl {
  color: red;
}
</style>
