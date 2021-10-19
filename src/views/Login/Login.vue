<template>
  <div class="positionDiv">
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
      username: '',
      password: ''
    }
  },
  created() {
    this.signIn()
  },
  methods: {
    signIn() {
      this.$message.error('请登录！！！')
    },
    // 登录
    async submin() {
      if (this.username === '' || this.password === '') {
        this.$message.error('用户名或密码不能为空！！！')
      } else if (this.username !== '' && this.password !== '') {
        const { data: userData } = await request.post('/getUser', {
          username: this.username,
          password: this.password
        })
        if (userData.data === this.username) {
          localStorage.setItem('token', userData.data)
          this.$message({
            message: '欢迎您：' + userData.data,
            type: 'success'
          })
          this.$router.replace('/')
        } else {
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
