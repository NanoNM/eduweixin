var colors = require('../../../utils/colors.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import {
  forEach
} from '../../../utils/colors.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekArray: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周'],
    pageNum: 0, // 当前所在分类的索引
    todayDay: '', // 今日日期
    todayMonth: '', // 今日月份
    todayWeek: '', // 今日周
    day: '', // 日期
    month: '', // 月份
    monthNum: 1,
    week: ['日', '一', '二', '三', '四', '五', '六'], // 周日为起始日
    nowDay: [1, 2, 3, 4, 5, 6, 7], // 本周的七天日期
    schoolTime: ['2023', '02', '8'], // 本学期开学时间
    nowWeek: '1', // 当前周
    course_time: [
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    wList: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取开课日期
    var that = this
    wx.request({
      url: app.globalData.baseURL + '/grade/optime?grade=uc_2023', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "token":app.globalData.jwtToken

      },
      success(res) {
        console.log(that.data.schoolTime)
        that.data.schoolTime = res.data['data']
        console.log(res.data['data'])
        let nowWeek = that.getNowWeek()
        let nowDay = that.getDayOfWeek(nowWeek)
        let pageNum = nowWeek - 1
        let month = that.getMonth((nowWeek - 1) * 7);
        that.data.todayMonth
        that.setData({
          nowWeek,
          nowDay,
          pageNum,
          todayWeek: nowWeek,
          monthNum: month / 1, // 当前月份数字类型，用于数字运算
          colorArrays: colors // 课表颜色
        })

        that.getCourseList()
      }
    })
  },

  // 获取第几周后的月份
  getMonth(days) {
    let [year, month, day] = this.data.schoolTime
    var date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days); //获取n天后的日期      
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    return m;
  },

  // 获取第几周后的星期几的日期
  getDay(days) {
    let [year, month, day] = this.data.schoolTime
    var date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days); //获取n天后的日期      
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前几号，不足10补0    
    return d;
  },

  // 获取当前周
  getNowWeek() {
    var date = new Date();
    let [year, month, day] = this.data.schoolTime
    var start = new Date(year, month - 1, day);
    //计算时间差
    var left_time = parseInt((date.getTime() - start.getTime()) / 1000) + 24 * 60 * 60;
    var days = parseInt(left_time / 3600 / 24);
    var week = Math.floor(days / 7) + 1;
    var result = week
    if (week > 20 || week <= 0) {
      result = this.data.now_week;
    }
    return result
  },

  //获取一周的日期
  getDayOfWeek(week) {
    var day = []
    for (var i = -1; i < 6; i++) {
      var days = (week - 1) * 7 + i;
      day.push(this.getDay(days))
    }
    return day
  },


  // 获取课表数据
  async getCourseList() {
    console.log("====" + this.getNowWeek());
    let that = this;
    wx.getStorage({
      key: 'classid',
      success(res) {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: app.globalData.baseURL + '/course/get?classid=' + res.data + '&nowweek=' + that.getNowWeek(),
          headers: {
            "token":app.globalData.jwtToken

          }
        };

        axios.request(config)
          .then((response) => {
            console.log();
            var dataList=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
            response.data['data'].forEach(it => {
              var data = {
                "id": that.data.wList[it.weekTimes-1].length+1,
                "isToday": it.week,
                "jie": it.startClass ,
                "classNumber": it.endClass - it.startClass + 1,
                "name": it.courseName,
                "address": it.local,
                "teacher": "null"
              };
              dataList[it.weekTimes-1].push(data);
              that.setData({
                wList:dataList
              })

            }
            )
            // that.wList[]
            // that.setData({
            //   wList:
            // })
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
  },

  // 点击切换导航的回调
  changeNav(event) {
    let pageNum = event.currentTarget.dataset.page
    let nowWeek = pageNum + 1
    let nowDay = this.getDayOfWeek(nowWeek)
    let month = this.getMonth((nowWeek - 1) * 7)
    this.setData({
      pageNum,
      nowWeek,
      nowDay,
      month,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      todayDay: new Date().getDate(),
      todayMonth: new Date().getMonth() + 1,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})