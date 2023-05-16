// pages/myclass/course-selection/index.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [],
    value1: [],
    myCourse:{
      publicRequired:[],
      majorRequired:[]
    },
    selectivelyCourse:{
      public:[],
      major:[]
    }
  },

  onChange(e) {
    this.setData({ value: e.detail.value });
  },
  onChange1(e) {
    this.setData({ value1: e.detail.value });
  },
  submit(){
    console.log(this.data.value);
    console.log(this.data.value1);
    var allValue = this.data.value + ',' + this.data.value1

    console.log(allValue);

    var that = this
    wx.getStorage({
      key:'userInfo',
      success(res){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/student/selected/create?stu='+res.data.id+'&course='+allValue,
          headers: { }
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          wx.switchTab({
            url: '/pages/myclass/my_class',
          })
        })
        .catch((error) => {
          console.log(error);
        });

      }
    })
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

    wx.getStorage({
      
      key:'classid',
      success(res){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/admin/course?classid='+res.data,
          headers: { }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data));
          let publicCourse = response.data.data.normal
          let majorCourse = response.data.data.dept
    
          let publicRequired = []
          let publicSelective = []
          publicCourse.forEach(element => {
            if (element.publicRequired == 1) {
              publicRequired.push(element)
            }else{
              publicSelective.push(element)
            }
          });
    
          let majorRequired = []
          let majoSelective = []
          majorCourse.forEach(element => {
            if (element.publicRequired == 1) {
              majorRequired.push(element)
            }else{
              majoSelective.push(element)
            }
          });
    
          that.setData({
            myCourse:{
              publicRequired:publicRequired,
              majorRequired:majorRequired
            },
            selectivelyCourse:{
              public:publicSelective,
              major:majoSelective
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
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