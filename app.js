import { request } from "./request/index";

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
        request({
          url:"http://127.0.0.1:8000/api/login",
          data:{code:res.code},
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          method:"POST",
        }).then(res=>{
          //已找到用户
          if(res.data.code=="1005"){
            console.log(`已读取用户名:${res.data.nickname},openid:${res.data.openid}`);
            wx.setStorageSync("nickname",res.data.nickname);
            that.globalData.userinfo.nickname=res.data.nickname;
            that.globalData.userinfo.phone=res.data.phone;
            that.globalData.userinfo.gender=res.data.gender;
            that.globalData.userinfo.birth=res.data.birth;
            that.globalData.userinfo.loggedIn=true;
          }else if(res.data.code=="1004"){
            console.log(`this user is not registered yet,received openid:${res.data.openid}`);
          }
          wx.setStorageSync("openid",res.data.openid);
        })
      },
      fail(err){
        alert(err);
      }
    })
   
  }

})
