
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected:0,
    tabBarItem: [
      {
        path:"/pages/index/index",
        iconSelectedName: "wap-home",
        iconName: "wap-home-o",
        text: "首页"
      },
      {
        path:"/pages/mine/index",
        iconSelectedName: "user",
        iconName: "user-o",
        text: "个人中心"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      let {index}=e.currentTarget.dataset;
      let {path}=e.currentTarget.dataset;
      this.setData({
        selected:index
      });
      wx.switchTab({
        url: path
      })

    }
  }
})
