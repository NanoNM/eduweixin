// pages/bind_class/bind_class.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garde: {
      value: '',
      options: [],
    },
    class: {
      value: '',
      options: [],
    },
    dept: {
        value: '',
        options: [],
      },
  },

  onChangeGarde(e) {
    this.setData({
      'garde.value': e.detail.value,
    });
    this.getClasses()
  },

  onChangeDept(e) {
    this.setData({
      'dept.value': e.detail.value,
    });
    this.getClasses()
  },

  onChangeClass(e) {
      console.log(1);
    this.setData({
      'class.value': e.detail.value,
    });
  },

  joinCLass(){
      
      if (this.data.garde.value == '' || this.data.class.value == '' || this.data.dept.value == '') {
        wx.showToast({
            title: "操作失败",
            icon: 'error',
            duration: 2000
          })
          return
      }
      var that = this
      wx.getStorage({
        key: 'jwtToken',
        success (res) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/class/joinclass?class='+that.data.class.value,
                headers: { 
                    'token': res.data
                  }
                  };
              
                  axios.request(config)
                  .then((response) => {
                      if (response.data['status'] == 'OK') {
                          wx.setStorage(
                              {
                                key:"classid",
                                data:that.data.class.value
                              }
                          )

                          wx.navigateTo({
                            url: '../index/index',
                          })
                          
                      }
                  })
                  .catch((error) => {
                  console.log(error);
                  });
    },
    fail(res){
    
    }
  })
  },

  getClasses(){
      this.setData(
          {
            class:{
                value:  '',
                options: {
                    value:'',
                    label:''
                }
          }
        }
      )
    // 获取班级数据
    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/class/classes?grade='+this.data.garde.value+'&dept='+this.data.dept.value,
        headers: { }
      };

      axios.request(config2)
      .then((response) => {
    
        
        if (response.data['data']['data']['classes'].length==0) {
            this.setData(
                {
                  class:{
                      value:  '',
                      options: {
                          value:'',
                          label:''
                      }
                }
              }
            )
        }
        this.setData({
            class:{
                value:  response.data['data']['data']['classes'][0]!=null?response.data['data']['data']['classes'][0]['id']:'',
                options: response.data['data']['data']['classes'].map(element => {
                    return {
                        value: element['id']!=null? element['id']:'',
                        label: element['className']!=null? element['className']:''
                    }
                })
                }
        })
      })
      .catch((error) => {
      console.log(error);
      });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      // 年级数据初始化
    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/grades?status=normal',
    headers: { }
    };
    axios.request(config)
    .then((response) => {
        this.setData({
            garde:{
            value:  response.data['data'][0]['gradeName'],
            options: response.data['data'].map(element => {
                return {
                    value: element['gradeName'],
                    label: element['gradeName']
                }
            })
            }
        })    
        this.getClasses()
    })
    .catch((error) => {
        console.log(error);
    });

    // 系数据初始化
    let configx = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/depts',
    headers: { }
    };

    axios.request(configx)
    .then((response) => {
        console.log(response.data['data']);
        this.setData({
            dept:{
            value:  response.data['data'][0]['id'],
            options: response.data['data'].map(element => {
                return {
                    value: element['id'],
                    label: element['deptName']
                }
            })
            }
        })  
        this.getClasses()
    })
    .catch((error) => {
    console.log(error);
    });


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