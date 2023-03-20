import {get_total_price} from "../../utils/utils"

Page({
  data:{
    eta:"now"
  },

  onShow(){
    this.setData({
      cart:wx.getStorageSync('cart'),
      address:wx.getStorageSync('address'),
      totalPrice:get_total_price()
    })

  },

  handlePayment(){

  }
})