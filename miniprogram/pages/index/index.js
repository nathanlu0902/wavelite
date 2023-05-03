const app=getApp();

Page({
  data: {
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
    console.log(`存在用户名${wx.getStorageSync('nickname')}`);
    if(wx.getStorageSync('nickname')){
      this.setData({
        "userinfo.nickname":wx.getStorageSync('nickname'),
      })
    }else{
      this.setData({
        "userinfo.nickname":"Wave用户"
      })
    }
  },

  onShow: function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
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
        url: '../login/index',
      })
    }
  },

});
  