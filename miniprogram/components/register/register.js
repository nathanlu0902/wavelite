const app=getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    formData:{
      nickname:"",
      phone:""
    },
    rules: [{
      name: 'nickname',
      rules: {required: true, message: '昵称是必填项'},
  }, {
      name: 'phone',
      rules: {required: false, message: '手机号是必选项'},
  }]
  },

  methods: {
    formInputChange(e){
      const nickname=e.detail.value;
      this.setData({
        "formData.nickname":nickname
      })
    },
    //需要开通权限
    getPhoneNumber(e){
      console.log(e)
    },
    submitForm(e){
      this.selectComponent('#form').validate((valid, errors)=>{
        if(!valid){}
        else{
          wx.cloud.callFunction({
            name:"user",
            data:{
              nickname:this.data.formData.nickname,
              phone:"1232",
              type:"create_user"
            }
          }).then(res=>{
            if(res.result.code=="200"){
              wx.showToast({
                title: '用户注册成功',
              }).then(res=>{
                wx.setStorageSync('loggedIn', true)
                this.triggerEvent("registerCompleted","registered")
              })
            }
          })
        }
      }
    )
  }
}
})    
      
