<template>
  <div>
    <Header :activeI="activeIndex"></Header>
    <!-- 商品展示列表 -->
    <div class="container">
      <h2 style="padding:30px 0 30px 0">用户名：{{ username }}</h2>
      <el-button @click="updateUser">修改用户信息</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request.js'

export default {
  name: 'ShoppingCar',
  data() {
    return {
      // 商品加载判断是否结束
      loading: false,
      activeIndex: '4-1',
      username: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.username = JSON.parse(localStorage.getItem('token')).username
    },
    // 修改用户信息（用户名不能修改）
    updateUser() {
      this.$prompt('请输入原密码', '认证界面', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async ({ value }) => {
          const { data: res } = await request.get('/getUser', {
            params: {
              username: this.username,
              password: value
            }
          })
          if (res.data === this.username) {
            this.$prompt('请输入新密码', '修改界面', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
              .then(async ({ value }) => {
                const { data: res } = await request.get('/updateUser', {
                  params: {
                    username: this.username,
                    password: value
                  }
                })
                this.$message({
                  type: 'success',
                  message: res.data,
                  duration: '1000'
                })
              })
              .catch(() => {})
          } else {
            this.$message({
              type: 'error',
              message: res.data,
              duration: '2000'
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped></style>
