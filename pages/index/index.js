// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        value: 'label_1',
        list: [
          { value: 'label_1', icon: 'home', ariaLabel: '首页' },
          { value: 'label_2', icon: 'app', ariaLabel: '软件' },
          { value: 'label_3', icon: 'chat', ariaLabel: '聊天' },
          { value: 'label_4', icon: 'user', ariaLabel: '我的' },
        ],
      },
      onChange(e) {
        this.setData({
          value: e.detail.value,
        });
      },
  // 登出处理函数
  doLoginOut(){
    wx.removeStorage({
      key: 'jwtToken',
    })
    wx.navigateTo({
        url: '../login/login'
      })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
      // 判断jwt是否存在切合法
    wx.getStorage({
        key: 'jwtToken',
        success (res) {
            
        },
        fail(res){
            wx.navigateTo({
                url: '../login/login',
              })
        }
      })
      // 判断学生是否绑定班级
      wx.getStorage({
        key: 'classid',
        success (res) {
           if (res.data==null) {
            wx.navigateTo({
                url: '../bind_class/bind_class',
              })
           }
        },
        fail(res){
            wx.navigateTo({
                url: '../bind_class/bind_class',
              })
        }
      })

      wx.showToast({
        title: "登陆成功",
        icon: 'success',
        duration: 2000
      })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
