// app.js
App({
  globalData:{
    statusBarHeight:0,
    navBarHeight:0,
    SCREENHEIGHT:'',
    SCREENWIDTH:'',
    shopList:[{
      name:"苏州丰隆城市中心店"
    }]
    
  },

  onLaunch(){
    wx.cloud.init({
      traceUser:true,
      env:"cloud1-8gf4k3n9d3a701cc"
    })
    wx.getSystemInfo({
      success:(res)=>{
        let custom=wx.getMenuButtonBoundingClientRect();
        //手机状态栏高度
        this.globalData.statusBarHeight=res.statusBarHeight;
        //custom.top 上边界距离屏幕顶部px，custom.height 胶囊高度
        this.globalData.navBarHeight=custom.height + (custom.top - res.statusBarHeight) * 2
    }

    })
    let that=this;
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      if(res.result.length>0){
        that.globalData.loggedIn=true;
        wx.setStorageSync('userinfo', res.result[0])
      }else{
        that.globalData.loggedIn=false;
        let userinfo={}
        userinfo.nickname="waver"
        userinfo.registered=false
        wx.setStorageSync('userinfo', userinfo)
      }
    })
    if(!wx.getStorageSync('cart')){
      wx.setStorageSync('cart', [])
    }
    
    var timestamp=Date.parse(new Date())
    var expiration=timestamp+1800000 //半小时缓存
    if(wx.getStorageSync('expiration')){
      if(wx.getStorageSync('expiration')>expiration){
        wx.clearStorageSync()
        wx.setStorageSync('expiration', expiration)
      }
    }else{
      wx.setStorageSync('expiration', expiration)
    }
  }
   
})
