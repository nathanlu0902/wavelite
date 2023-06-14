// pages/mine/index.js
const app=getApp()
Page({

  data: {
    
  },


  onLoad(options) {
    let userinfo=wx.getStorageSync('userinfo');
    //没有头像连接则显示默认头像
    if(userinfo.avatarUrl==""){
      var avatarUrl=""
    }else{
      var avatarUrl=userinfo.avatarUrl
    }
    this.setData({
      nickname:userinfo.nickname,
      avatarUrl:avatarUrl
    })
  },

  onShow:function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:3
      })
    }
  },

  
})