<template>
  <div class="positionDiv" v-loading="loadingStatic">
    <div class="tt"><h1>管理员-登录界面</h1></div>
    <div>
      <label for="username">账 号：</label>
      <el-input
        id="username"
        placeholder="请输入账号"
        v-model="username"
        clearable
      ></el-input>
    </div>
    <div>
      <label for="password">密 码：</label>
      <el-input
        id="password"
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
    </div>
    <div class="tj">
      <el-button @click="submin">提交</el-button>
      <el-button @click="jumpGoods">网站首页</el-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'AdminLogin',
  data() {
    return {
      loadingStatic: true,
      username: '',
      password: ''
    }
  },
  created() {
    this.signIn()
  },
  mounted() {
    this.loadingStatic = false
  },
  destroyed() {
    this.loadingStatic = true
  },
  methods: {
    signIn() {
      const token = localStorage.getItem('tokenAdmin')
      if (token === null) {
        this.$message({
          message: '请登录！',
          type: 'error',
          duration: '1000'
        })
      }
    },
    // 登录
    async submin() {
      this.loadingStatic = true
      if (this.username === '' || this.password === '') {
        this.loadingStatic = false
        this.$message({
          message: '用户名或密码不能为空！',
          type: 'error',
          duration: '1000'
        })
      } else if (this.username !== '' && this.password !== '') {
        const { data: userData } = await request.get('/getAdmin', {
          params: {
            username: this.username,
            password: this.password
          }
        })
        // 这里的userData.data就是dt.username
        if (userData.data === this.username) {
          const tokenAdminData = {
            userId: userData.userId,
            username: userData.data
          }
          localStorage.setItem('tokenAdmin', JSON.stringify(tokenAdminData))
          this.$message({
            message: '欢迎您：' + userData.data,
            type: 'success',
            duration: '1000'
          })
          this.$router.replace('/jumpAdmin')
        } else {
          this.loadingStatic = false
          this.$message.error(userData.data)
        }
      }
    },
    jumpGoods() {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less" scoped>
.positionDiv {
  width: 450px;
  margin: 100px auto;
}

// 标题居中
.tt {
  width: 238px;
  margin: 0 auto;
}

.positionDiv div {
  margin-bottom: 15px;
}

.tj {
  display: flex;
  justify-content: space-around;
}
</style>
