const axios = require('axios')

const request = axios.create({
  // baseURL: 'https://qc9c8t.app.cloudendpoint.cn'
  baseURL: 'http://127.0.0.1:3000/'
})

module.exports = request
