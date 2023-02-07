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
            if(res.code=="1005"){
              console.log(res)
              getApp().setData({
                "userinfo.nickname":res.nickname,
                "userinfo.phone":res.phone,
                "userinfo.gender":res.gender,
                // "userinfo.token":res.token,
                "userinfo.loggedIn":true
              })
              wx.setStorageSync("openid", res.openid);
                
            }
          }
        })
      }
    },
    error(res){
      alert(res['errMsg']);
    }
  })
}