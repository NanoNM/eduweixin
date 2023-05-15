// pages/testPage/test.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classExamNotification:'',
    myExamResults:[],
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
    var that = this;
    wx.getStorage({
      key:'classid',
      success (res) {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/exam/exam?class='+res.data,
          headers: { }
        };
        axios.request(config)
        .then((response) => {
          that.setData({
            classExamNotification:response.data['data']
          })
        })
        .catch((error) => {
          console.log(error);
        });
    
      }})
      var that = this
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/exam/getResults?studentid=' + app.globalData.userInfo.employeeId,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        that.setData({
          myExamResults: response.data['data']
        })

        console.log(this.data.myExamResults);
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