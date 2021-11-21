<template>
  <div class="goodsCommon">
    <div class="goodsImg">
      <slot name="goodsImg"></slot>
    </div>
    <div class="goodsDetail">
      <slot name="goodsDetail"></slot>
    </div>
    <div class="goodsBuySum">
      <slot name="goodsBuySum"></slot>
    </div>
    <div class="goodsBtn">
      <slot name="goodsBtn"></slot>
    </div>
    <div class="goodsBuy">
      <slot name="goodsBuy"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'GoodsCommon'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.goodsCommon {
  display: flex;
  border: 1px solid #d8dbdf;
  margin-bottom: 3px;
  min-width: 900px;
}

.goodsImg {
  height: 60px;
  display: flex;
  justify-content: center;
}

.goodsDetail {
  flex: 5.5;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.goodsDetail p,
h4 {
  padding-left: 10px;
  padding-right: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.goodsDetail h4 {
  font-size: 20px;
}

.goodsDetail p {
  font-size: 16px;
}

.goodsBuySum {
  flex: 1.5;
  display: flex;
  min-width: 240px;
  align-items: center;
  justify-content: center;
}

.goodsBtn {
  flex: 1;
  display: flex;
  align-items: center;
}

.goodsBtn .el-button {
  display: block;
  height: 80%;
  width: 100%;
  border-radius: 0px;
  font-size: 18px;
  margin: 0px;
  border-radius: 5px;
}

.goodsBuy {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.goodsBuy .el-button {
  display: block;
  height: 80%;
  width: 100%;
  border-radius: 0px;
  font-size: 18px;
  margin: 0px;
  border-radius: 5px;
}
</style>
