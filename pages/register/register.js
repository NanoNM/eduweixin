// pages/register/register.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: 'https://tdesign.gtimg.com/miniprogram/images/image1.jpeg',
    userName: 'std01',
    empid: '000001',
    password: '1234',
  },
  /**
   * 注册学生函数
   */
  doReg: function(){
    let data = JSON.stringify({
      "name": this.data.userName,
      "passwd": this.data.password,
      "employeeID": this.data.empid,
      "key": ""
    });
    var that = this
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/student/reg',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
        wx.showToast({
            title: response.data['message'],
            icon: 'none',
            duration: 2000
          })
          if (response.data['status']=='OK') {
            wx.navigateTo({
                url: '../login/login',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('acceptDataFromOpenerPage', { username: that.data.userName })
                  }

              })
          }
    })
    .catch((error) => {
      console.log(error);
    });
    
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