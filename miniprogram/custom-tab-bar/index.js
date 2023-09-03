
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
        iconSelectedName: "icon-check",
        iconName: "icon-check",
        text: "首页"
      },
      {
        path:"/pages/delivery/index",
        iconSelectedName: "icon-check",
        iconName: "icon-check",
        text: "点单"
      },
      {
        path:"/page/order/order",
        iconSelectedName: "icon-check",
        iconName: "icon-check",
        text: "订单"
      },
      {
        path:"/pages/subscribe/subscribe",
        iconSelectedName: "wap-delivery",
        iconName: "wap-delivery-o",
        text: "订阅"
      },
      {
        path:"/pages/mine/index",
        iconSelectedName: "icon-myfill",
        iconName: "icon-my",
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
