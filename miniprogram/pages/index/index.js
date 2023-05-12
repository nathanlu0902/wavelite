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
    },
    ],
    showRegister:false
    
  },
  //options(Object)
  onLoad: function() {
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      //res.result返回一个数组
      if(res.result[0].openid){
        let {openid,nickname}=res.result[0];
        this.setData({
          registered:true,
          "userinfo.nickname":nickname
        })
      }else{
        this.setData({
          registered:false,
          "userinfo.nickname":"Waver"
        })
      }
    })
    this.registerPopup=this.selectComponent("#popup")
  },

  onShow: function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
  },
  
  showRegister:function(){
    this.setData({
      showRegister:true
    })
    this.registerPopup.showModal();

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
  