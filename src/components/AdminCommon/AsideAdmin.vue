<template>
  <!-- 管理员侧边栏导航栏 -->
  <div class="AsideAdmin">
    <ul>
      <li ref="click_bg" @click="click_bg">
        <router-link to="/jumpAdmin/jumpAdminGoods">商品管理</router-link>
      </li>
      <li ref="click_bg2" @click="click_bg2">
        <router-link to="/jumpAdmin/jumpAdminUser">用户管理</router-link>
      </li>
      <li ref="click_bg3" @click="click_bg3">
        <router-link to="/jumpAdmin/jumpAdminOrder">订单管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AsideAdmin',
  mounted() {
    this.getSelect()
  },
  methods: {
    getSelect() {
      const url = location.hash
      switch (url) {
        case '#/jumpAdmin/jumpAdminGoods':
          this.$refs.click_bg.style.backgroundColor = '#007acc'
          this.$refs.click_bg2.style.backgroundColor = ''
          this.$refs.click_bg3.style.backgroundColor = ''
          break
        case '#/jumpAdmin/jumpAdminUser':
          this.$refs.click_bg.style.backgroundColor = ''
          this.$refs.click_bg2.style.backgroundColor = '#007acc'
          this.$refs.click_bg3.style.backgroundColor = ''
          break
        case '#/jumpAdmin/jumpAdminOrder':
          this.$refs.click_bg.style.backgroundColor = ''
          this.$refs.click_bg2.style.backgroundColor = ''
          this.$refs.click_bg3.style.backgroundColor = '#007acc'
          break
      }
    },
    // aside选中时的背景颜色改变
    click_bg() {
      this.getSelect()
    },
    // 用户
    click_bg2() {
      this.getSelect()
    },
    // 订单
    click_bg3() {
      this.getSelect()
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  width: 200px;
  height: 100%;
  background-color: #1b1f25;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
}

ul li:nth-child(1) {
  margin-top: 52px;
}

ul li a {
  display: block;
  height: 40px;
  width: 100%;
  text-align: center;
  margin-left: -10px;
  line-height: 40px;
  color: #ffffff;
}
</style>
