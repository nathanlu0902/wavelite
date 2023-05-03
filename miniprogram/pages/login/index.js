
let app=getApp();
Page({

  data: {
    
  },

  onload(){
    if(wx.getStorageSync('userinfo')){
      var userinfo=wx.getStorageSync('userinfo')
    }  
  },

  getPhoneNumber(e){
    let code=e.detail.code;
    wx.request({
      url:"https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN",
      method:"POST",
      data:{
        code:code
      },
      success(e){
        getApp().globalData.setData({
          "userinfo.phone":e.detail.phone
        })
        wx.request({
          url:"localhost/api/register",
          method:"POST",
          data:{
            phone:userinfo.phone
          }
        })
      }
    })
  },

  register(){
    if(userinfo.loggedIn==false){
      wx.login({
        success:res=>{
          let wx_code=res.code;
          request({
            url:`/${wx_code}/create`,
            method:"POST",
            data:{
              phone:"1321",
              wx_code:wx_code
            },
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
        }).then(res=>{
          if(res.statusCode=="201"){
            app.globalData.userinfo.loggedIn=true
            wx.showToast({title:"用户已创建"})
          }else{
            wx.showToast({title:"Error creating user"})
          }
        })
      },fail(e){
        console.log(e)
      }
    })  
  }},

})