<template>
  <router-view></router-view>
</template>
<script>
import request from '@/utils/request.js'

export default {
  name: 'App',
  async created() {
    // 用户不存在时，存在localStorage有存储的token问题
    const userData = JSON.parse(localStorage.getItem('token'))
    if (userData !== null) {
      const { data: res } = await request.get('/getUserOne', {
        params: {
          userId: userData.userId
        }
      })
      if (res.data === null) {
        localStorage.removeItem('token')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
