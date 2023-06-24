let app=getApp();
var userinfo=wx.getStorageSync('userinfo')


Page({
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var addressList=userinfo.address;
    this.setData({
      addressList:addressList
    })
  },

  add_address(){
    wx.navigateTo({
      url: '/pages/addAddress/index',
    })
  },

  chooseAddress(e){
    let {index}=e.currentTarget.dataset;
    let addressChosen=userinfo.address[index]
    userinfo.addressChosen=addressChosen;
    wx.setStorageSync('userinfo', userinfo)
    wx.navigateBack()
  }
 
})