import { request } from "../../request/index";

const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
  },
    // rules:[
    //   {
    //     name:'nickname',
    //     rules:[{required:true,message:'请填写昵称'}]
    //   },
    //   {
    //     name:'phone',
    //     rules:[{required:true,message:'请填写手机号'},
    //           {mobile:true,message:'手机号码格式错误'},]
    //   },
    // ]


  onGenderChange(e){
    let gender=e.detail.value;
    app.globalData.userinfo.gender=gender;
    this.setData({
      gender:gender
    })
  },

  onDateChange(e){
    let birth=e.detail.value;
    app.globalData.userinfo.birth=birth;
    this.setData({
      birth:birth
    })
  },

  onChooseAvatar(e){
    const {avatarUrl}=e.detail;
    this.setData({
      avatarUrl:avatarUrl
    })
  },

  submitForm(e){
    const {nickname,phone,birth}=e.detail.value;
    let that=this;
    request({
      url: "http://127.0.0.1:8000/api/updateUser",
      data: {
        nickname: nickname,
        phone: phone,
        birth: birth,
        gender: that.data.gender,
        openid: wx.getStorageSync("openid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
      },
      method: "POST",
    }).then(res=>{
      if (res.data.code == "1007") {
        wx.showToast({ title: "保存成功" });
      }
      app.globalData.userinfo.nickname=nickname;
      app.globalData.userinfo.phone=phone;
      app.globalData.userinfo.birth=birth;
    })

  },

  resetForm(){
    this.setData({
      "nickname":"",
      "phone":"",
      "gender":"",
      "birth":""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      nickname:app.globalData.userinfo.nickname,
      gender:app.globalData.userinfo.gender,
      phone:app.globalData.userinfo.phone,
      birth:app.globalData.userinfo.birth
    })
  
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