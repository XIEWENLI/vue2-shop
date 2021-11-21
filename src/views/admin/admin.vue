<template>
  <div class="Admin">
    <ul>
      <li><AsideAdmin></AsideAdmin></li>
      <li><router-view></router-view></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'Admin'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
ul {
  background-color: #fff;
  height: 100%;
  width: 100%;
}

ul li:nth-child(2) {
  margin-left: 200px;
  margin-top: 57px;
}

ul li {
  float: left;
  height: 100%;
}
</style>
