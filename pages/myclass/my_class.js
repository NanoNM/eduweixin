// pages/myclass/my_class.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:'null',
    deptname:'null',
    gardname:'null',

    studentsData:'',
    counsellor:'',

    myCourse:{
      publicRequired:[],
      majorRequired:[]
    },
    selectivelyCourse:{
      public:[],
      major:[]
    },

    selectivelyCourseRes:[
      {
        course:'',
        status:''
      }
    ]


  },

  deleteSelected(){
    wx.getStorage({
      key:'userInfo',
      success(res){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/student/selected/rejected/remove?stu='+res.data.id,
          headers: { 
            "token":app.globalData.jwtToken

          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
        
      }
    })
  },

  jamp2Curriculum(){
    wx.navigateTo({
      url: '/pages/myclass/curriculum/curriculum',
    })
  },
  jamp2Select(){
    wx.navigateTo({
      url: '/pages/myclass/course-selection/index',
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      console.log(page.route);

      this.getTabBar().setData({
        value: '/' + page.route
      })
    }
    this.setData({
      classname:app.globalData.userInfo['className'],
      deptname:app.globalData.userInfo['deptName'],
      gardname:app.globalData.userInfo['gradeName']
    })

    // 班级ID取老师和学生
    var that = this;
    // 获取班级同学
    wx.getStorage({
      key:'classid',
      success (res) {
        let config1 = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/student/getStudents?classid='+res.data,
          headers: {
                        "token":app.globalData.jwtToken

           }
        };
        axios.request(config1)
        .then((response) => {
          that.setData({
            studentsData: response.data['data']
          })

        })
        .catch((error) => {
          console.log(error);
        });


        // 获取辅导员
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: app.globalData.baseURL + '/class/getcounsellor?id='+res.data,
      headers: {
        "token":app.globalData.jwtToken

       }
    };

    axios.request(config)
    .then((response) => {
      that.setData({
            counsellor: response.data['data']
      })
    })
    .catch((error) => {
      console.log(error);
    });
        
      }
    })

    // 
    wx.getStorage({
      
      key:'classid',
      success(res){
        let config1 = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/admin/course?classid='+res.data,
          headers: {
            "token":app.globalData.jwtToken

           }
        };
        
        axios.request(config1)
        .then((response) => {
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

    // 

    wx.getStorage({
      key:'userInfo',
      success(res){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/student/selected/get?stu='+res.data.id,
          headers: { 
            "token":app.globalData.jwtToken

          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data));
          that.setData({
            selectivelyCourseRes:response.data.data
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