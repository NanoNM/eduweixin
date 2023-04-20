// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '/pages/index/index',
    tabBar: [{
      value: '/pages/index/index',
      icon: 'home',
      label: '首页',
    }, {
      value: '/pages/testPage/test',
      icon: 'usergroup',
      label: '班级',
    },{
      value: '/pages/testPage/test',
      icon: 'desktop',
      label: '考试',
    },{
      value: '/pages/mine/mine',
      icon: 'user',
      label: '我的',
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      wx.switchTab({
        url: e.detail.value
      });
    }
  }
})
