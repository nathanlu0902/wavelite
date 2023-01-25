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
    cart_list:[],
    currentIndexL:null
  },

  filterDish:function(arr,type){
    let new_arr=arr.filter(item=>item.type==type);
    console.log(new_arr);
    return new_arr;
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
    let {qty}=e.currentTarget.dataset;
    let {rightid}=e.currentTarget.dataset;
    if(qty==0){
      cart_list.push(goodsList[this.leftid].right_item[rightid]);
    }else{
      cart_list[leftid].right_item[rightid].qty++;
    }
    this.setData({
      cart_list:cart_list
    })
   },

  minus:function(e){
    let {qty}=e.currentTarget.dataset;
    let {rightid}=e.currentTarget.dataset;
    if(qty>0){
    }
    this.setData({
      cart_list:cart_list
    })

   },

  input:function(e){
    let cart_list=this.data.cart_list;
    let indexL=this.data.currentIndexL;
    let num=parseInt(e.detail.value,10);
    let {index}=e.currentTarget.dataset;
    cart_list[indexL].right_item[index].num=num>=0?num:0;
    this.setData({
      cart_list:cart_list
    })
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
    console.log(goodsList);
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