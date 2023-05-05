import {get_total_price} from "../../utils/utils"

const app=getApp();
Page({
  data: {
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
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
    this.getCart();
    this.getGoodsList();
    this.updateQty();
    this.getTotal();
  },

  getCart(){
    wx.cloud.callFunction({
      name:"getCartList"
    }).then(res=>{
      wx.setStorageSync('cart', res.result);
    })
  },

  updateQty(){
    let goodsList=wx.getStorageSync('goodsList');
    goodsList.forEach(item=>{
      if(wx.getStorageSync('cart')){
        var cart=wx.getStorageSync('cart')
      }
      let index=cart.findIndex(v=>v._id===item._id);
      if(index!=-1){
        item.qty=cart[index].qty;
      }else{
        item.qty=0;
      }
    })
    this.setData({
      goodsList:goodsList
    })
  },

  getGoodsList(){
    //更新商品数量
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      let goodsList=res.result.res;
      wx.setStorageSync('goodsList', goodsList)
    })

  },

  getGoodsCategory(){
    wx.cloud.callFunction({
      name:"getGoodsCategory"
    }).then(res=>{
      let goodsCategory=res.result.res;
      this.setData({
        goodsCategory:goodsCategory
      })
    })
  },

  onRightItemTap(e){
    let {_id}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?goodsid='+_id,
      success(res){
        // res.eventChannel.emit('accept',goodsid)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  add:function(e){
    let _id=e.currentTarget.dataset._id;
    let index=e.currentTarget.dataset.index;
    let item=this.data.goodsList[index]
    wx.cloud.callFunction({
      name:"addToCart",
      data:{
        item:item
      }
    }).then(res=>{
      this.getCart();
      this.updateQty();
      this.getTotal();
      }
    )
  },

  minus:function(e){
    let _id=e.currentTarget.dataset._id;
    wx.cloud.callFunction({
      name:"removeFromCart",
      data:{
        _id:_id
      }
    }).then(res=>{
      this.getCart();
      this.updateQty();
      this.getTotal();
    })
  },

  getTotal(){
    let totalCount=0;
    let totalPrice=0;
    let cart=wx.getStorageSync('cart');
    cart.forEach(v=>{
      totalCount+=v.qty;
      totalPrice+=v.qty*v.goodsPrice;
    })
    console.log(totalCount,totalPrice)
    this.setData({
      totalCount:totalCount,
      totalPrice:totalPrice
    })
  }


  
})