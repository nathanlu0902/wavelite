// pages/calculator/calculator.js
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
    wx.cloud.callFunction({
      name:"category",
      data:{
        type:"get"
      }
    }).then(res=>{
      console.log(res.result)
      this.setData({
        category:res.result
      })
      
    })
  },

  
})