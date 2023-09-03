// components/tabbar.js
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
    selected:0,
    tabBarItem: [
      {
        path:"/pages/index/index",
        iconSelectedName: "wap-home",
        iconName: "wap-home-o",
        text: "首页"
      },
      {
        path:"/pages/delivery/index",
        iconSelectedName: "wap-delivery",
        iconName: "wap-delivery-o",
        text: "外卖"
      },
      {
        path:"/pages/subscribe/subscribe",
        iconSelectedName: "wap-delivery",
        iconName: "wap-delivery-o",
        text: "订阅"
      },
      {
        path:"/pages/mine/index",
        iconSelectedClass: "icon-myfill",
        iconClass: "icon-my",
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
