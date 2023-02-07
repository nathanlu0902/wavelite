import { login } from "./utils/api";

// app.js
App({
  "globalData":{
    "navHeight":0,
    "menuTop":'',
    "statusBarHeight":'',
    "menuHeight":'',
    "SCREENHEIGHT":'',
    "SCREENWIDTH":'',
    userinfo:{
      nickname:"",
      phone:"",
      gender:"",
      oepnid:"",
      loggedIn:true
    }
  },

  onLaunch(){
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

    login();
  }

})
