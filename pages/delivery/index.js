import {request} from "../../request/index"
const app=getApp();
Page({
  data: {
    goodsCategoryData:[],
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,

  },

  onLeftItemTap:function(e){
    let {index}=e.currentTarget.dataset;
    //设置scroll-into-view的参考对象
    this.setData({
      viewid:"goods"+index
    })
  },

  add:function(e){
    let {id}=e.currentTarget.dataset;
    let goodsList=this.data.goodsList;
    let good=goodsList.filter(item=>item.id==id)[0]
    good.qty+=1;
    this.setData({
      goodsList:goodsList
    })
    this.getTotalPrice();
  },

  minus:function(e){
    let {id,qty}=e.currentTarget.dataset;
    let goodsList=this.data.goodsList;
    let good=goodsList.filter(item=>item.id==id)[0]
    if(qty>0){
      good.qty-=1;
    }
    this.setData({
      goodsList:goodsList
    })
    this.getTotalPrice();
  },

  getTotalPrice:function(){
    let totalPrice=0;
    let goodsList=this.data.goodsList;
    const initialValue=0;
    //累加对象里的值必须提供initialValue
    totalPrice=goodsList.reduce((pre,nxt)=>{
        return pre+nxt.qty*nxt.goodsPrice
      },initialValue)
    this.setData({
      totalPrice:totalPrice
    })
  } ,

  onLoad() {
    this.getGoodsCategory();
    this.getGoodsList();
},

  async getGoodsList(){
    let res=await request({
      url:"/goods",
      method:"GET"
    })
    if(!wx.getStorageSync('goodsList')){
      wx.setStorageSync('goodsList', res.data)
    }
    this.setData({
      goodsList:res.data
    })
  },

  async getGoodsCategory(){
    let res=await request({
      url:"/goodsCategory",
      method:"GET",
    })
    //res.data为字符串，需要转成list
    this.setData({
      goodsCategoryData:res.data
    })
  },

  onRightItemTap(e){
    let {goodsid}=e.currentTarget.dataset;
    wx.navigateTo({
      url: "../goodsDetail/index",
      success(res){
        res.eventChannel.emit('accept',goodsid)
      },
      fail(err){
        console.log(err)
      }
    })

  },

  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  
})