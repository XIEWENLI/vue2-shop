<template>
  <div>
    <div class="AdminHeader">
      <div
        style="width:20%;min-width:150px;font-size:30px;font-weight: bold;margin-left:10px;"
      >
        管理员界面
      </div>
      <slot name="search"></slot>
      <div style="width:30%;min-width:140px">
        用户名：<b>{{ admin }}</b>
        <a href="#" style="margin-left:10%;" @click="out">退出</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'HeaderAdmin',
      admin: '未登录'
    }
  },
  created() {
    this.getAdmin()
  },
  methods: {
    getAdmin() {
      const admin = JSON.parse(localStorage.getItem('tokenAdmin')).username
      this.admin = admin
    },
    // 退出
    out() {
      localStorage.removeItem('tokenAdmin')
      this.$router.replace('/jumpAdminLogin')
    }
  }
}
</script>
<style lang="less" scoped>
.AdminHeader {
  height: 55px;
  width: 100%;
  background-color: #ffffff;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
