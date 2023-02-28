import { request } from "./request/index";

// app.js
App({
  globalData:{
    navHeight:0,
    menuTop:'',
    statusBarHeight:'',
    menuHeight:'',
    SCREENHEIGHT:'',
    SCREENWIDTH:'',
    userinfo:{
      nickname:"",
      phone:"",
      gender:"",
      oepnid:"",
      loggedIn:false
    }
  },

  onLaunch(){
    var that=this;
    wx.getSystemInfo({
      success: (result) => {
       this.globalData.statusBarHeight=result.statusBarHeight;
       this.globalData.SCREENHEIGHT=result.screenHeight;
       this.globalData.SCREENWIDTH=result.screenWidth;
      },fail(err){
        console.log(err)
      }
    })
    let menu=wx.getMenuButtonBoundingClientRect();
    this.globalData.menuTop=menu.top;
    this.globalData.menuHeight=menu.height;
    
    wx.login({
      success(res){
        let code=res.code;
        request({
          url:`/${code}/login`,
          method:"GET"
        }).then(res=>{
          if(res.statusCode=="204"){
            console.log("user is not registered")
          }
          else if(res.statusCode=="200"){
            console.log(`已读取用户名:${res.data.nickname},openid:${res.data.openid}`);
            wx.setStorageSync("nickname",res.data.nickname);
            wx.setStorageSync("openid",res.data.openid)
            that.globalData.userinfo.nickname=res.data.nickname;
            that.globalData.userinfo.phone=res.data.phone;
            that.globalData.userinfo.gender=res.data.gender;
            that.globalData.userinfo.birth=res.data.birth;
            that.globalData.userinfo.loggedIn=true;
          }
        }
          
        )},
      fail(e){
          console.log(e)
        }
      }
    )
    
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
