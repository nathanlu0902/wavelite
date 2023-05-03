// pages/mine/index.js
const app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo:{
      nickName:"",
      avatarUrl:""
    },
    menu:[
      {url:"",text:"我的订单"},
      {url:"",text:"我的积分"},
      {url:"",text:"个人资料"},
      {url:"",text:"设置"},
      {url:"",text:"联系客服"}
    ]
  },

  changeAvatar:function(){
    var me=this;
    wx.chooseMedia({
      mediaType:["image"],
      count:1,
      sourceType:['album'],
      success(res){
        const tempFilePath=res.tempFiles.tempFilePath;
        console.log(app.serverUrl)
        wx.showLoading({
          title: '上传中',
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    // var that=this;
    // wx.getUserInfo({
    //   success:function(e){
    //     console.log(e.userInfo.avatarUrl);
    //     that.setData({
    //       'userInfo.nickName':e.userInfo.nickName,
    //       'avatarUrl':e.userInfo.avatarUrl
    //     })
    //   } ,
    // })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow:function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:3
      })
    }
  },

  
})