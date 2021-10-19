<template>
  <div class="positionDiv">
    <div class="tt"><h1>注册界面</h1></div>
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
    <div>
      <label for="password2">重复密码：</label>
      <el-input
        id="password2"
        placeholder="请重复密码"
        v-model="password2"
        show-password
      ></el-input>
    </div>
    <div class="tj">
      <el-button @click="submin">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="jumpLogin">登录</el-button>
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
      password: '',
      password2: ''
    }
  },
  methods: {
    // 用户注册
    async submin() {
      if (this.password === '' || this.password === '') {
        this.$message.error('用户名或密码不能为空！！！')
      } else if (this.password === this.password2) {
        const { data: userData } = await request.post('/setUser', {
          username: this.username,
          password: this.password
        })
        if (userData.data === this.username) {
          this.$message({
            message: '欢迎您：' + userData.data,
            type: 'success'
          })
        } else {
          this.$message.error(userData.data)
        }
        // this.$router.replace('/')
      } else {
        this.$message.error('登录失败!!!')
      }
    },
    reset() {
      this.username = ''
      this.password = ''
      this.password2 = ''
    },
    jumpLogin() {
      this.$router.replace('/jumpLogin')
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
