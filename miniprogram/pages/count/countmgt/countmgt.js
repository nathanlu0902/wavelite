// pages/count/countmgt/countmgt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	activeNames:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	let dishList=wx.getStorageSync('dishList')
	let count=wx.getStorageSync('count')
	
	this.setData({
		dishList:dishList,
		count:count
	})
	
  },

  toHistory(){
	  wx.navigateTo({
		url: '../countHistory/countHistory',
	  })
  },

  toUse(){
	  wx.navigateTo({
		url: '../newOrder/newOrder',
	  })
  },
  toHistory(){
	  wx.navigateTo({
		url: '../countHistory/countHistory',
	  })
  }
})