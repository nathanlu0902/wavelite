import {total_cart_count, total_cart_price} from "../../utils/utils"
var cart=wx.getStorageSync('cart')
import config from "../../config/config"
import {current_time} from "../../utils/utils"

Page({
  data:{
    eta:"now",
    coupon:0,
    member_discount:0,
    good_discount:0,
    delivery_fee:0,
    close:config.shopList[0].close
  },

  onShow(){
    let userinfo=wx.getStorageSync('userinfo')
    let addressChosen=userinfo.address.filter(item=>{
      return item.selected===true
    })[0]
    let rawTotal=total_cart_price();
    let totalCount=total_cart_count();
    let totalPrice=rawTotal+this.data.delivery_fee-this.data.member_discount-this.data.good_discount-this.data.delivery_fee
    
    //根据当前时间设置最早可配送时间
    let now=current_time();
    let start=(now.hour+1).toString()+":"+now.minute.toString().padStart(2,"0");//补0

    this.setData({
      addressChosen:addressChosen,
      cart:cart,
      rawTotal:rawTotal,
      totalCount:totalCount,
      totalPrice:totalPrice,
      start:start
    })

  },
  chooseAddress(){
    wx.navigateTo({
      url: '/pages/chooseAddress/index',
    })
  },

  onTimeChange(e){
    this.setData({
      time:e.detail.value
    })
  },
  handlePayment(){

  }
})