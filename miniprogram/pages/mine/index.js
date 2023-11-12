// pages/mine/index.js
const app=getApp()
Page({

  data: {
	function_list:[
		{
			title:"关注公众号",
			url:"../chooseAddress/index",
			iconName:"bookmark-o"
		},
		{
			title:"联系我们",
			url:"../chooseAddress/index",
			iconName:"contact-o"
		}

	]
  },


  onLoad(options) {
    let userinfo=wx.getStorageSync('userinfo');
    //没有头像连接则显示默认头像
    if(userinfo.avatarUrl==""){
      var avatarUrl=""
    }else{
      var avatarUrl=userinfo.avatarUrl
    }
    this.setData({
      nickname:userinfo.nickname,
      avatarUrl:avatarUrl
    })
  },

  onShow:function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:3
      })
    }
  },

  toEdit(){
	  wx.navigateTo({
		url: '../profile/profile',
	  })
  }
  
})