// pages/goodsDetail/index.js
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
    const eventChannel=this.getOpenerEventChannel()
    eventChannel.on('accept',goodsid=>{
      let good=wx.getStorageSync('goodsList').filter(item=>item.id==goodsid)[0]
      this.setData({
        good:good
      })
    })
  },

  onAddToCartBtnTap:function(e){
    
  }
 
})