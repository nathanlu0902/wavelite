// app.js
App({
  globalData:{
    statusBarHeight:0,
    navBarHeight:0,
    SCREENHEIGHT:'',
    SCREENWIDTH:'',
    userinfo:{
      nickname:"",
      phone:"",
      gender:"",
      oepnid:"",
      addressList:[],
      userid:"",
      loggedIn:false
    }
  },

  onLaunch(){
    wx.cloud.init({
      traceUser:true,
      env:"cloud1-8gf4k3n9d3a701cc"
    })
    wx.getSystemInfo({
      success:(res)=>{
        let custom=wx.getMenuButtonBoundingClientRect();
        this.globalData.statusBarHeight=res.statusBarHeight;
        this.globalData.navBarHeight=custom.height + (custom.top - res.statusBarHeight) * 2
    }
      
      //  this.globalData.statusBarHeight=result.statusBarHeight;
      //  this.globalData.SCREENHEIGHT=result.screenHeight;
      //  this.globalData.SCREENWIDTH=result.screenWidth;
    })
    
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
