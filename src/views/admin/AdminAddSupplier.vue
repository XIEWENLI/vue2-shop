<template>
  <div class="AdminAddSupplier">
    <el-form
      label-position="right"
      :rules="rules"
      ref="supplierFrom"
      label-width="100px"
      :model="supplierFrom"
    >
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="supplierFrom.supplierName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('supplierFrom')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('supplierFrom')">重置</el-button>
        <el-button @click="jumpGo()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// axios请求
import request from '@/utils/request.js'

export default {
  data() {
    return {
      name: 'AdminAddGoods',
      //   from表单数据
      supplierFrom: {
        supplierName: ''
      },
      //   检验from表单
      rules: {
        supplierName: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 立即添加
    submitForm(supplierFrom) {
      this.$refs[supplierFrom].validate((valid) => {
        if (valid) {
          request.post('/addSupplierOne', this.supplierFrom)
          alert('添加成功！')
          this.$router.replace('/jumpAdmin/jumpAdminSupplier')
        } else {
          alert('必填项不能为空！')
          return false
        }
      })
    },
    // 重置
    resetForm(supplierFrom) {
      this.$refs[supplierFrom].resetFields()
    },
    // 返回
    jumpGo() {
      this.$router.replace('/jumpAdmin/jumpAdminSupplier')
    }
  }
}
</script>
<style lang="less" scoped>
.AdminAddSupplier {
  width: 500px;
  margin: 200px auto;
}
</style>
