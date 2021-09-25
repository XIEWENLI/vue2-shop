const axios = require('axios')

const request = axios.create({
  baseURL: 'https://qc9c8t.app.cloudendpoint.cn'
})

module.exports = request
