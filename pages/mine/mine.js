// pages/mine/mine.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: 'none',
    userID: '0000001',
    grade: 'none',
    dept:'none',
    class: 'none',
    img1: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
  },

  myClass(){
    wx.redirectTo({
      url: '/pages/myclass/my_class',
    })
  },
  myInfo(){
    wx.navigateTo({
      url: '/pages/mine/student-reg-info/info',
    })
  },

  logOut(){
    app.logOut()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      console.log(page.route);

      this.getTabBar().setData({
        value: '/' + page.route
      })
    }
    let that = this;
    wx.getStorage({
      key:'userInfo',
      success (res) {
        that.setData({
          userName: res.data['name'],
          userID:  res.data['employeeId'],
          grade: res.data['gradeName'],
          dept: res.data['deptName'],
          class: res.data['className'],
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})