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
    this.setData({
      totalPrice:get_total_price()
    })
  },

  async getCart(){
    let cart=await wx.cloud.callFunction({
      name:"get_cart"
    })
    return cart
    // wx.cloud.callFunction({
    //   name:"get_cart"
    // }).then(res=>{
    //   console.log(res.result)
    //   return res.result;

    // })
  },

  getGoodsList(){
    let cart=this.getCart();
    console.log(cart);
    //更新商品数量
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      let goodsList=res.result.res;
      goodsList.forEach(item=>{
        console.log(cart)
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