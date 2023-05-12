// components/register/register.js
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
            name:"register",
            data:{
              nickname:this.data.formData.nickname,
              phone:this.data.formData.phone
            }
          }).then(res=>{
            console.log(res)
          })
        }
      }
    )
  }
}
})    
      
