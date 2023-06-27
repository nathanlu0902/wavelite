var cart=wx.getStorageSync('cart')

Page({
  data:{
    eta:"now"
  },

  onShow(){
    var userinfo=wx.getStorageSync('userinfo')
    this.setData({
      addressChosen:userinfo.addressChosen,
      cart:cart
    })

  },
  chooseAddress(){
    wx.navigateTo({
      url: '/pages/chooseAddress/index',
    })
  },


  handlePayment(){

  }
})