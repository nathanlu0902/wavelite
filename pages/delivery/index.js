import {goodsList} from "../../model/goods.js"
const app=getApp();
Page({
  data: {
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
    typeList:["波奇","意面","沙拉","咖啡","咖啡","咖啡","咖啡","咖啡","咖啡","咖啡"],

  },


  bindLeftItemTap:function(e){
    let {index}=e.currentTarget.dataset;
    let type=this.data.typeList[index];
    this.setData({
      currentIndexL:index,
      currentType:type
    })
  },

  add:function(e){
    let {id}=e.currentTarget.dataset;
    this.data.goodsList[this.data.currentType][id].qty+=1;
    this.setData({
      goodsList:this.data.goodsList
    })
    this.getTotalPrice();
  },

  minus:function(e){
    let {id}=e.currentTarget.dataset;
    let {qty}=e.currentTarget.dataset;
    if(qty>0){
      this.data.goodsList[this.data.currentType][id].qty-=1;;
    }
    this.setData({
      goodsList:this.data.goodsList
    })
    this.getTotalPrice();
  },


  getTotalPrice:function(){
    let totalPrice=0;
    let goodsList=this.data.goodsList;
    for (let index in this.data.typeList){
      let type=this.data.typeList[index];
      for (let i = 0;i<goodsList[type].length;i++){
        totalPrice+=goodsList[type][i].qty*goodsList[type][i].dishPrice;
      }
    }
    this.setData({
      totalPrice:totalPrice
    })
  } ,

  onLoad(options) {
    this.setData({
      currentIndexL:0,
      goodsList:goodsList,
      currentType:"波奇",
      totalPrice:0,
      totalSum:0,
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