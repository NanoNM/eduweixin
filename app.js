// app.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
App({
  onLaunch() {
    //   console.log('./config.json')
    // // 读前后端分离配置文件
    // axios.get('./config.json').then(data => {
    //     console.log(data.data.baseURL);
    //     // console.log('挂载后端地址',app.config.globalProperties.$baseURL)
    //     // console.log('挂载后端socket',app.config.globalProperties.$baseWS)
    // }).catch(error => {
    //     console.log(error);
    // })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    baseURL:"http://localhost:8080",
    baseWS:"ws://localhost:8080"
  }
})
