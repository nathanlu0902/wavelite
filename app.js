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
        if(res.code){
          //后端服务器获取openid
           wx.request({
            url:"http://127.0.0.1:8000/api/login",
            data:{code:res.code},
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
            method:"POST",
            success(res){
              if(res.data.code=="1005"){
                console.log(res.data.nickname)
                wx.setStorage("nickname",res.data.nickname)
                that.globalData.userinfo.nickname=res.data.nickname,
                that.globalData.userinfo.phone=res.data.phone,
                that.globalData.userinfo.gender=res.data.gender,
                that.globalData.userinfo.loggedIn=true
              }else if(res.data.code=="1004"){
                console.log("this user is not registered yet")
              }
              wx.setStorageSync("openid",res.data.openid)
              console.log("received openid:"+res.data.openid)
            },
            fail(err){
              console.log(err)
            }
          })
        }
      },
      fail(err){
          console.log(err);
      },
    })
  }

})

// setUserInfoCallback=(res)=>{
//   getApp().globalData.userinfo.nickname=res.data.nickname,
//   getApp().globalData.userinfo.phone=res.data.phone,
//   getApp().globalData.userinfo.gender=res.data.gender,
//   getApp().globalData.userinfo.loggedIn=true
// }
