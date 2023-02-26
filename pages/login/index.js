import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  getPhoneNumber(e){
    let code=e.detail.code;
    wx.request({
      url:"https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN",
      method:"POST",
      data:{
        code:code
      },
      success(e){
        getApp().globalData.setData({
          "userinfo.phone":e.detail.phone
        })
        wx.request({
          url:"localhost/api/register",
          method:"POST",
          data:{
            phone:getApp().globalData.userinfo.phone
          }
        })
      }
    })
  },

  register(){
    if(getApp().globalData.userinfo.loggedIn==false){
      wx.login({
        success:res=>{
          let wx_code=res.code;
          request({
            url:`/${wx_code}/create`,
            method:"POST",
            data:{
              phone:"1321",
              wx_code:wx_code
            },
            header:{
              "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
            },
        }).then(res=>{
          if(res.statusCode=="201"){
            getApp().globalData.userinfo.loggedIn=true
            wx.showToast({title:"用户已创建"})
          }else{
            wx.showToast({title:"Error creating user"})
          }
        })
      },fail(e){
        console.log(e)
      }
    })  
  }},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})