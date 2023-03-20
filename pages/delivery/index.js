import {request} from "../../request/index"
import {add_cart, remove_cart,get_total_price} from "../../utils/utils"

const app=getApp();
Page({
  data: {
    goodsCategoryData:[],
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
    totalPrice:get_total_price()
  },

  onLeftItemTap:function(e){
    let {index}=e.currentTarget.dataset;
    //设置scroll-into-view的参考对象
    this.setData({
      viewid:"goods"+index
    })
  },

  onShow(){
    this.getGoodsCategory();
    this.getGoodsList();
    this.getCart();
    this.setData({
      totalPrice:get_total_price()
    })
  },
  onLoad() {

  },
  getCart(){
    let cart=wx.getStorageSync('cart');
    this.setData({
      cart:cart
    })
  },

  async getGoodsList(){
    let res=await request({
      url:"/goods",
      method:"GET"
    })
    if(!wx.getStorageSync('goodsList')){
      wx.setStorageSync('goodsList', res.data)
    }
    let goodsList=res.data;
    goodsList.map(item=>{
      //取第一张图片作为列表封面
      item.goodsPic=item.goodsPic.split(',')[0]
      //获取cart中的good数量
      let cart=wx.getStorageSync('cart')||[];
      let index=cart.findIndex(v=>v.id===item.id);
      if(index!=-1){
        item.qty=cart[index].qty;
      }
    })
    this.setData({
      goodsList:goodsList
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
      url: '/pages/goodsDetail/index?id='+goodsid,
      success(res){
        // res.eventChannel.emit('accept',goodsid)
      },
      fail(err){
        console.log(err)
      }
    })
  },

  priceUpdate(e){
    this.setData({
      totalPrice:get_total_price()
    })
  },

  goodUpdate(e){
    let {id,qty}=e.detail;
    let goodsList=this.data.goodsList;
    goodsList.find(v=>v.id===id)['qty']=qty;
    this.setData({
      goodsList:goodsList
    })
  }

  
})