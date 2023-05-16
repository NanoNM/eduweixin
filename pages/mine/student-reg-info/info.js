// pages/mine/student-reg-info/info.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentInfo:{},
    img1:"https://tdesign.gtimg.com/miniprogram/images/avatar1.png"
    
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
    var that = this
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: app.globalData.baseURL + '/student/moreInfo?stid='+app.globalData.userInfo.employeeId,
      headers: {
        "token":app.globalData.jwtToken

       }
    };
    
    axios.request(config)
    .then((response) => {
      if (response.data['data'] == null){
        wx.showToast({
          title: '暂时没有学籍信息 请等待几日或联系教务',
          icon: 'none',
          duration: 3000
        })
      }
      that.setData({
        studentInfo: response.data['data']
      })
      console.log(that.data.studentInfo);
    })
    .catch((error) => {
      console.log(error);
    });
    
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