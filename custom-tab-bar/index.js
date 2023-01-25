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
    list: [
      {
        path:"/pages/index/index",
        iconSelectedName: "wap-home",
        iconName: "wap-home-o",
        text: "首页"
      },
      {
        path:"/pages/delivery/index",
        iconSelectedName: "shop",
        iconName: "shop-o",
        text: "外卖"
      },
      {
        path:"/pages/subscribe/index",
        iconSelectedName: "bill",
        iconName: "bill-o",
        text: "订阅"
      },
      {
        path:"/pages/mine/index",
        iconSelectedName: "manager",
        iconName: "manager-o",
        text: "我的"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      console.log(e);
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
