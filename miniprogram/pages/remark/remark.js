// pages/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onLoad(){
    let remark=wx.getStorageSync('remark')
    this.setData({
      remark:remark,
      word_length:remark.length
    })
  },
  formSubmit(e){
    let {remark}=e.detail.value;
    wx.setStorageSync('remark', remark)
    wx.showToast({
      title: '提交成功',
    })
    setTimeout(wx.navigateBack,"1000")
  },
  count_word(e){
    let remark=e.detail.value
    this.setData({
      word_length:remark.length
    })
  }
})