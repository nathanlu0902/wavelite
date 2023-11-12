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
		count:count[0]
	})
	let userinfo=wx.getStorageSync('userinfo');
    //没有头像连接则显示默认头像
    this.setData({
      nickname:userinfo.nickname,
      avatarUrl:userinfo.avatarUrl
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
  }
})