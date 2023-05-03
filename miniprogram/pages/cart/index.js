import {get_total_price} from "../../utils/utils"

Page({
  data:{
    eta:"now",
    defaultAddress:""
  },

  onShow(){
    if(wx.getStorageSync('userinfo').addressList){
      var defaultAddress=wx.getStorageSync('userinfo').addressList.find(item=>item.default==true)
    }
    this.setData({
      defaultAddress:defaultAddress,
      cart:wx.getStorageSync('cart'),
      address:wx.getStorageSync('address'),
      totalPrice:get_total_price()
    })

  },
  chooseAddress(){
    wx.navigateTo({
      url: '/pages/chooseAddress/index',
    })
  },

  handlePayment(){

  }
})