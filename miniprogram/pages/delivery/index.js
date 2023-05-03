import {get_total_price} from "../../utils/utils"

const app=getApp();
Page({
  data: {
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
  getCart(){
    let cart=wx.getStorageSync('cart');
    this.setData({
      cart:cart
    })
  },

 getGoodsList(){
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      let goodsList=res.result.res;
      // if(!wx.getStorageSync('goodsList')||wx.getStorageSync('goodsList').length==0) {
      //   wx.setStorageSync('goodsList', goodsList)
      // }
      goodsList.map(item=>{
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
    })
  },

  getGoodsCategory(){
    wx.cloud.callFunction({
      name:"getGoodsCategory"
    }).then(res=>{
      console.log(res);
      let goodsCategory=res.result.res;
      this.setData({
        goodsCategory:goodsCategory
      })
    })
  },

  onRightItemTap(e){
    let {goodsid}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/goodsDetail/index?goodsid='+goodsid,
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