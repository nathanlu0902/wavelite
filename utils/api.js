//登录
export function login(){
  wx.login({
    success(res){
      if(res.code){
        //后端服务器获取openid
        wx.request({
          url:"http://127.0.0.1:8000/api/login",
          data:{code:res.code},
          // header:{
          //   "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          // },
          method:"POST",
          success(res){
            console.log(res);
            wx.setStorageSync('openid', res['data'].openid);
          }
        })
      }
    },
    error(res){
      alert(res['errMsg']);
    }
  })
}