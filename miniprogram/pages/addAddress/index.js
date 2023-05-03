

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  chooseLocation(){
    wx.chooseLocation({
      success:e=>{
        this.setData({
          location:e.address
        })
      },
    })
  },

  defaultChange(e){
    this.setData({
      default:e.detail
    })
  },

  formSubmit(e){
    let that=this;
    console.log(e.detail)
    let {receiver,phone,detail_address,location,isDefault}=e.detail.value;
    if (!receiver){
      wx.showToast({
        title: '请输入收货人',
        icon:"error"
      })
    }else if(!phone){
      wx.showToast({
        title: '请输入手机号',
        icon:"error"
      })
    }else if(!detail_address){
      wx.showToast({
        title: '请输入收货地址',
        icon:"error"
      })
    }else{
      if(wx.getStorageSync('userinfo')){
        var userinfo=wx.getStorageSync('userinfo');
      }
      request({
        url:"/addAddress",
        method:"POST",
        data:{
          "receiver":receiver,
          "phone":phone,
          "detail_address":detail_address,
          "location":that.data.location,
          "userid":userinfo.userid,
          "default":that.data.default.value
        }
      })
    }
    wx.showToast({
      title: '保存成功',
    })
    
  }
})