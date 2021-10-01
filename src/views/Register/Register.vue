<template>
  <div class="positionDiv">
    <form action="" method="post">
      <div>
        <label for="username">账号：</label>
        <el-input
          id="username"
          placeholder="请输入账号"
          v-model="username"
          clearable
        ></el-input>
      </div>
      <div>
        <label for="password">密码：</label>
        <el-input
          id="password"
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
      </div>

      <div class="tj">
        <el-button style="submit">提交</el-button>
        <el-button style="reset">重置</el-button>
      </div>
    </form>
  </div>
</template>

<script>
import '../../assets/css/bg.css'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="less" scoped>
.positionDiv {
  width: 450px;
  margin: 120px auto;
}

.positionDiv div {
  margin-bottom: 15px;
}

.tj {
  margin-left: 60px;
}

.el-input {
  width: 400px;
}
</style>
