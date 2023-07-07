const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentLocation:{
      type:String
    },
    currentDistance:{
      type:String
    },
    navBarData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight:app.globalData.navBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    active:false
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    goBack(){
      wx.navigateBack();
    },
    toggleInput(){
      this.setData({
        active:!this.data.active
      })
      console.log(this.data)
    },
    goSearch(){
      wx.navigateTo({
        url: '../../pages/search/search',
      })
    }
  }
})
