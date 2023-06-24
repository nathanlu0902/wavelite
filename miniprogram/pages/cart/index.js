Page({
  data:{
    eta:"now"
  },

  onShow(){
    var userinfo=wx.getStorageSync('userinfo')
    let cart=wx.getStorageSync('cart')
    this.setData({
      addressChosen:userinfo.addressChosen,
      cart:wx.getStorageSync('cart'),
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