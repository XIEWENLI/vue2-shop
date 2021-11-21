<template>
  <div class="AdminUpdateGoodsContent">
    <el-form
      label-position="right"
      :rules="rules"
      ref="goodsFrom"
      label-width="80px"
      :model="goodsFrom"
    >
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="goodsFrom.goodsName"></el-input>
      </el-form-item>

      <el-form-item label="商品总数" prop="goodsSum">
        <el-input-number
          v-model="goodsFrom.goodsSum"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="图片路径" prop="goodsSRC">
        <el-input v-model="goodsFrom.goodsSRC"></el-input>
      </el-form-item>

      <el-form-item label="商品原价" prop="goodsPrice">
        <el-input v-model="goodsFrom.goodsPrice"></el-input>
      </el-form-item>

      <el-form-item label="商品现价" prop="goodsOldPrice">
        <el-input v-model="goodsFrom.goodsOldPrice"></el-input>
      </el-form-item>

      <el-form-item label="商品详情" prop="goodsDetail">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="goodsFrom.goodsDetail"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('goodsFrom')"
          >立即修改</el-button
        >
        <el-button @click="resetForm('goodsFrom')">重置</el-button>
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
      name: 'AdminUpdateGoods',
      //   from表单数据
      goodsFrom: {
        goodsId: '',
        goodsName: '',
        goodsSum: 0,
        goodsSRC: '',
        goodsPrice: '',
        goodsOldPrice: '',
        goodsDetail: ''
      },
      goodsData: {},
      //   检验from表单
      rules: {
        goodsName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsSum: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsSRC: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsPrice: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsDetail: [
          { max: 50, message: '长度不能大于50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getGoodsData()
  },
  methods: {
    //   获取目标单个商品
    async getGoodsData() {
      const goodsId = location.hash.split('?')[1].split('=')[1]
      const { data: res } = await request.get('/getGoodsOne', {
        params: {
          _id: goodsId
        }
      })
      this.goodsData = res.goods
      this.goodsFrom.goodsId = this.goodsData._id
      this.goodsFrom.goodsName = this.goodsData.goodsName
      this.goodsFrom.goodsSum = this.goodsData.goodsSum
      this.goodsFrom.goodsSRC = this.goodsData.goodsSRC
      this.goodsFrom.goodsPrice = this.goodsData.goodsPrice
      this.goodsFrom.goodsOldPrice = this.goodsData.goodsOldPrice
      this.goodsFrom.goodsDetail = this.goodsData.goodsDetail
    },
    // 立即修改
    submitForm(goodsFrom) {
      this.$refs[goodsFrom].validate(valid => {
        if (valid) {
          request.post('/updateGoods', this.goodsFrom)
          alert('修改成功！')
        } else {
          alert('必填项不能为空！')
          return false
        }
      })
    },
    // 重置
    resetForm(goodsFrom) {
      this.$refs[goodsFrom].resetFields()
    },
    // 返回
    jumpGo() {
      this.$router.replace('/jumpAdmin/jumpAdminGoods')
    }
  }
}
</script>
<style lang="less" scoped>
.AdminUpdateGoodsContent {
  width: 500px;
  margin: 20px auto;
}
</style>
