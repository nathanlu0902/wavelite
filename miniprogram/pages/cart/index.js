import {total_cart_calories, total_cart_count, total_cart_price,checkStock} from "../../utils/utils"
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
    
    //根据当前时间设置最早可配送时间
    let now=current_time();
    let start=(now.hour+1).toString()+":"+now.minute.toString().padStart(2,"0");//补0

    //获取缓存中的备注
    let remark=wx.getStorageSync('remark')||""
    this.update_price_calories()
    this.setData({
      addressChosen:addressChosen,
      cart:cart,
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

  generateOrder(){
    let create_time=Date.now();
    //购物车中的价格取结算页价格，后续改动不影响
    let cart_snap=wx.getStorageSync('cart_snap')
    let openid=wx.getStorageSync('userinfo').openid
    let status="待支付"
    let order={
      openid:openid,
      create_time:create_time,
      status:status,
      cart_snap:cart_snap
    }
    wx.setStorageSync('order', order)
  },

  pay(){
    //1.检查库存
    let out_of_stock=[]
    for(let i=0;i<this.data.cart.length;i++){
      let item=this.data.cart[i]
      if(!checkStock(item)){
        out_of_stock.push(item)
      }
    }
    //2.若库存充足，继续到3；否则弹出提示，是否删除？结束流程
    if(out_of_stock.length>0){

    }else{
      this.generateOrder();
      //3.调起支付API
    }
    
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
  }
})