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
    this.getGoodsList();
    this.getCart();
  },

  getCart(){
    wx.cloud.callFunction({
      name:"getCartList"
    }).then(res=>{
      console.log(res.result)
      let {totalCount,totalPrice,cart}=res.result;
      //更新goodslist中的qty
      let goodsList=wx.getStorageSync('goodsList');
      goodsList.forEach(item=>{
        let index=cart.findIndex(v=>v._id===item._id);
        if(index!=-1){
          item.qty=cart[index].qty;
        }else{
          item.qty=0;
        }
      })
      this.setData({
        totalCount:totalCount,
        totalPrice:totalPrice,
        goodsList:goodsList
      })
      wx.setStorageSync("goodsList",goodsList)
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
    let {index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?goodsid',
      success(res){
        res.eventChannel.emit('passGood',{data:index})
      },
      fail(err){
        console.log(err)
      }
    })
  },
  add:function(e){
    let index=e.currentTarget.dataset.index;
    let item=this.data.goodsList[index];
    wx.cloud.callFunction({
      name:"addToCart",
      data:{
        item:item
      }
    }).then(()=>{
      this.getCart();
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
    }).then(()=>{
      this.getCart();
    })
  },

})