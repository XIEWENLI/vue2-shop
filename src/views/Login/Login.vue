<template>
  <div class="positionDiv" v-loading="loadingStatic">
    <div class="tt"><h1>登录界面</h1></div>
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
      <el-button @click="reset">重置</el-button>
      <el-button @click="jumpRegister">注册</el-button>
      <el-button @click="jumpIndex">首页</el-button>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'

export default {
  name: 'Login',
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
      const token = localStorage.getItem('token')
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
      // 判断登录功能状态
      const { data: DLState } = await request.get('/getAdminDL')
      if (DLState.data === 'false') {
        alert('登录功能已关闭，待开启状态！')
        this.loadingStatic = false
        return
      }
      if (this.username === '' || this.password === '') {
        this.loadingStatic = false
        this.$message({
          message: '用户名或密码不能为空！',
          type: 'error',
          duration: '1000'
        })
      } else if (this.username !== '' && this.password !== '') {
        const { data: userData } = await request.get('/getUser', {
          params: {
            username: this.username,
            password: this.password
          }
        })
        if (userData.isLogin) {
          alert('你的登录权限被禁止了！')
          this.loadingStatic = false
          return
        }
        // 这里的userData.data就是dt.username
        if (userData.data === this.username) {
          const tokenData = {
            userId: userData.userId,
            username: userData.data
          }
          localStorage.setItem('token', JSON.stringify(tokenData))
          this.$message({
            message: '欢迎您：' + userData.data,
            type: 'success',
            duration: '1000'
          })
          this.$router.replace('/')
        } else {
          this.loadingStatic = false
          this.$message.error(userData.data)
        }
      }
    },
    // 重置
    reset() {
      this.username = ''
      this.password = ''
    },
    jumpRegister() {
      this.$router.replace('/jumpRegister')
    },
    jumpIndex() {
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
  width: 180px;
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
