<template>
  <div>
    <ul>
      <li ref="click_bg" @click="click_bg" style="background-color:#007acc">
        <router-link to="/jumpAdmin/jumpAdminGoods">商品管理</router-link>
      </li>
      <li ref="click_bg2" @click="click_bg2">
        <router-link to="/jumpAdmin/jumpAdminUser">用户管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Aside',
  methods: {
    // aside选中时的背景颜色改变
    click_bg() {
      this.$refs.click_bg.style.backgroundColor = '#007acc'
      this.$refs.click_bg2.style.backgroundColor = ''
    },
    click_bg2() {
      this.$refs.click_bg.style.backgroundColor = ''
      this.$refs.click_bg2.style.backgroundColor = '#007acc'
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  width: 250px;
  height: 660px;
  background-color: #1b1f25;
}

ul li a {
  box-sizing: border-box;
  display: block;
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding-left: 20px;
  color: #ffffff;
}
</style>
