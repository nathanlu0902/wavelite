let app=getApp();


Page({
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var addressList=wx.getStorageSync('userinfo').address;
    console.log(addressList)
    this.setData({
      addressList:addressList
    })
  },

  add_address(){
    wx.navigateTo({
      url: '/pages/addAddress/index',
    })
  },
 
})