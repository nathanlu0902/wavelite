import {total_cart_calories, total_cart_count, total_cart_price} from "../../utils/utils"
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
    let cart=wx.getStorageSync('cart')
    let addressChosen=userinfo.address.filter(item=>{
      return item.selected===true
    })[0]
    let rawTotal=total_cart_price();
    let totalCount=total_cart_count();
    let totalCalories=total_cart_calories();
    //扣除折扣
    let totalPrice=rawTotal+this.data.delivery_fee-this.data.member_discount-this.data.good_discount-this.data.delivery_fee
    
    //根据当前时间设置最早可配送时间
    let now=current_time();
    let start=(now.hour+1).toString()+":"+now.minute.toString().padStart(2,"0");//补0

    //获取缓存中的备注
    let remark=wx.getStorageSync('remark')||""

    this.setData({
      addressChosen:addressChosen,
      cart:cart,
      rawTotal:rawTotal,
      totalCount:totalCount,
      totalPrice:totalPrice,
      totalCalories:totalCalories,
      start:start,
      remark:remark
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
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})