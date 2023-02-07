//登录
export function login(){
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
              getApp().globalData.userinfo.nickname=res.data.nickname,
              getApp().globalData.userinfo.phone=res.data.phone,
              getApp().globalData.userinfo.gender=res.data.gender,
              getApp().globalData.userinfo.loggedIn=true,
              setStorageSync({"openid":res.data.openid})
            }else if(res.data.code=="1004"){
              console.log("this user is not registered yet")
            }
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