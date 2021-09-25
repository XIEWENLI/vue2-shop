<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'App',
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: #000;
  text-align: center;
  margin-bottom: 1px;
}

.el-main {
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
}
</style>
