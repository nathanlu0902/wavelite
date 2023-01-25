import {goodsList} from "../../model/goods.js"
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
    totalSum:0,
    typeList:["波奇","意面","沙拉","咖啡"],
    currentType:"波奇",
    goodsList:[],
    currentIndexL:null
  },


  bindLeftItemTap:function(e){
    let {currenttype}=e.currentTarget.dataset;
    let {index}=e.currentTarget.dataset;
    this.setData({
      currentType:currenttype,
      currentIndexL:index
    })
  },

  add:function(e){
    let that=this;
    let {id}=e.currentTarget.dataset;
    that.data.goodsList[id].qty+=1;
    this.setData({
      goodsList:that.data.goodsList
    })
  },

  minus:function(e){
    
    let {id}=e.currentTarget.dataset;
    let {qty}=e.currentTarget.dataset;
    if(qty>0){
      this.goodsList[id].qty-=1;
    }
  },

  input:function(e){
    let {value}=e.detail;
    let {id}=e.currentTarget.dataset;
    this.goodsList[id].qty=parseInt(value);
  },

  computePrice:(arr)=>{
    return arr.reduce((cur,nxt)=>{
    })
  } ,

  onLoad(options) {
    this.setData({
      currentIndexL:0,
      goodsList:goodsList
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
  onShow:function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:1,
      })
    }
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