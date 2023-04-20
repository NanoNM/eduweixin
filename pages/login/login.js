// pages/login/login.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import Message from 'tdesign-miniprogram/message/index';


var app = getApp();

Page({
  statusDetection(res) {
    switch (res.data["status"]) {
      case "OK":
        return true;
      case "WARRING":
        console.log("警告! " + res.data["statusCode"] + ": " + res.data["message"]);
        break;
      case "FAILED":
        console.log(res.data["statusCode"] + ": " + res.data["message"]);
        break;
      case "ERROR":
        console.log("错误! " + res.data["statusCode"] + ": " + res.data["message"]);
        break;
    }
    return false;
  },
  doLogin: function () {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/user/login?username=' + this.data.userName + '&password=' + this.data.password,
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios.request(config)
      .then((res) => {
        if (this.statusDetection(res)) {
          wx.setStorage({
            key: "jwtToken",
            data: res.data["data"]["token"]
          })
          wx.getStorage({
            key: 'jwtToken',
            success(res) {
              app.globalData.jwtToken = res.data
              // 初始化页面数据
              let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/user/info?s=all',
                headers: {
                  'token': app.globalData.jwtToken
                }
              };

              axios.request(config)
                .then((response) => {
                  wx.setStorage({
                    key: 'ms_username',
                    data: response.data['data']['name']
                  })
                  wx.setStorage({
                    key: 'classid',
                    data: response.data['data']['classId']
                  })
                  wx.setStorage({
                    key: 'userInfo',
                    data: response.data['data']
                  })
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                  console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                  if (error.response.data['statusCode'] == 'INVALID_LOGIN') {
                    app.logOut()
                  } else {
                    wx.showToast({
                      title: '操作失败 ' + error.response.data['statusCode'],
                      icon: 'none'
                    })

                    app.logOut()
                  }

                });

            },
            fail(res) {

            }
          })

        }

      })
      .catch((error) => {
        console.log(error);
      });




  },
  turnRegPage: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: 'https://tdesign.gtimg.com/miniprogram/images/image1.jpeg',
    userName: 'std01',
    password: '1234',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel()

    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (username) {
      that.setData({
        userName: username['username']
      })
    })
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
    wx.hideHomeButton()
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