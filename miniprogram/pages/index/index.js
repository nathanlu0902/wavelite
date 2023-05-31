const app=getApp()
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
      console.log(res)
      //res.result返回一个数组
      if(res.result.length>0){
        let userinfo=res.result[0];
        wx.setStorageSync('loggedIn', true)
        wx.setStorageSync('userinfo', res.result[0])
        this.setData({
          registered:true,
          nickname:userinfo.nickname,
          points:userinfo.points
        })
      }else{
        wx.setStorageSync('loggedIn', false)
        this.setData({
          nickname:"Waver",
          registered:false
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

  registerCompleted:function(e){
    if(e.detail=="registered"){
      this.registerPopup.hideModal();
      wx.setStorageSync('loggedIn', true)
      this.onLoad()
    }else{
      wx.showModal({
        title: '注册失败',
        content: '注册失败',
        }
      )
    }
  },

  onBindUserTap:function(){
    if(wx.getStorageSync('loggedIn')==true){
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
  