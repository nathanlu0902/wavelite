import {total_cart_price,total_cart_calories,total_cart_count} from "../../utils/utils"
Component({
  options: {
    addGlobalClass: true,
  },

  properties: {

  },
  lifetimes:{
    ready(){
      this.load_cart()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    load_cart(){
      let cart=wx.getStorageSync('cart')
      this.setData({
        cart:cart
      })
    },
    
    update_price_calories(){
      let rawTotal=total_cart_price();
      let totalCount=total_cart_count();
      let totalCalories=total_cart_calories();
      let cart=wx.getStorageSync('cart')
      //扣除折扣
      let totalPrice=rawTotal+this.data.delivery_fee-this.data.member_discount-this.data.good_discount
      this.setData({
        rawTotal:rawTotal,
        totalCount:totalCount,
        totalPrice:totalPrice,
        totalCalories:totalCalories,
        cart:cart
      })
      this.triggerEvent("updateCheckout")
    }
  }
})
