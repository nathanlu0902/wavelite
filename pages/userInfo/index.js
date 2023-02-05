// pages/userInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      nickname:"",
      gender:"",
      phone:""
    },
   
    avatarUrl:"",
   
    rules:[
      {
        name:'nickname',
        rules:[{required:true,message:'请填写昵称'}]
      },
      {
        name:'phone',
        rules:[{required:true,message:'请填写手机号'},
              {mobile:true,message:'手机号码格式错误'},]
      },
    ]
  },

  genderChnage(e){
    let gender=e.detail.value;
    this.setData({
      gender:gender
    })
  },

  onChooseAvatar(e){
    console.log(e);
    const {avatarUrl}=e.detail;
    this.setData({
      avatarUrl:avatarUrl
    })
  },

  submitForm(e){
    const {nickname,phone,gender,birth}=this.data.formData;
    wx.request({
      url:"http://127.0.0.1:8000/api/registerUser",
      data:{
        nickname:nickname,
        phone:phone,
        gender:gender,
        birth:birth
      },
      method:"POST",
      success(res){
        console.log(res.code);
        wx.showToast({title:"保存成功"});
      }
    })

  },

  resetForm(){
    this.setData({
      "formData.nickname":"",
      "formData.phone":"",
      "formData.gender":"",
      "formData.birth":""
    })
  },
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