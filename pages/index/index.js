const app=getApp();

Page({
  data: {
    // formData:{
    //   nickname:"",
    // },
    top:app.globalData.menuTop+(app.globalData.menuTop-app.globalData.statusBarHeight)+app.globalData.menuHeight,
    bnrUrl:[
      {link:'',
       imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
      },
      {link:'',
      imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
     },
     {link:'',
     imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
    }
    ]
    
  },
  //options(Object)
  onLoad: function() {
    console.log(app.globalData.userinfo.nickname)
    this.setData({
      "formData.nickname":app.globalData.userinfo.nickname,
    })
    console.log(this.data)

  },
  onReady: function() {
    
  },
  onShow: function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  },

  onBindUserTap:function(){
    if(app.globalData.userinfo.loggedIn==true){
      wx.navigateTo({
        url: '/pages/userInfo/index',
    })
    }else{
      wx.navigateTo({
        url: '../register/index',
      })
    }
  },

  switchTab:function(e){
    let {url}=e.currentTarget.dataset;
    wx.navigateTo({
      url: url,
    })
  }
});
  