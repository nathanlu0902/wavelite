var cart=wx.getStorageSync('cart')
import config from "../../config/config"

Page({
  data: {
    navBarData:{
      showSearch:false,
      showBack:true,
    },
    label:["好吃","牛逼","太TM贵了"],
    base:config.base
  
  },

  onLoad(options) {
    let category_obj=wx.getStorageSync('category_obj')
    let {category_id,id}=options;
    let good=category_obj[category_id][id]
    this.setData({
      good:good
    })
  
  },

  handlePreviewPic(e){
    let {current}=e.currentTarget.dataset;
    wx.previewImage({
      urls: this.data.good.goodsPic,
      current:current,
      fail(e){
        console.log(e)
      }
    })
  },

  

  updateCheckout(){
    let category_obj=wx.getStorageSync('category_obj')
    let good=category_obj[category_id][id]

  },
  onBaseChange(e){
    let good=this.data.good;
    let {index}=e.currentTarget.dataset;
    let base=this.data.base;
    //更新价格
    good.base=this.data.base[index];
    base.forEach((item,item_index)=>{
      if(item_index==index){
        item.selected=true
      }else{
        item.selected=false
      }
    })
    let totalCalories=good.calories+good.base.calories
    this.setData({
      good:good,
      base:base,
      totalCalories:totalCalories
    })

  },
  add_cart(){
    if(cart.length==0){
      cart.push(this.data.good)
    }else{
      for(let i=0;i<cart.length;i++){
        let cart_item=cart[i];
        let good=this.data.good;
        try{
          //购物车中已有同样id，同样base的，增加qty
          if(cart_item.id===good.id&&cart_item.base===good.base){
            cart_item.sku_qty+=good.sku_qty;
            cart_item.totalPrice+=good.totalPrice;
            wx.showToast({
              title: '添加购物车成功',
            })
            break;
          }else{
          //购物车中无同样id或id相同base不同的，push新item
            cart.push(good);
            wx.showToast({
              title: '添加购物车成功',
            })
            break;
          }
        }catch(e){
          wx.showToast({
            title: '加入购物车失败',
          })
          console.log(e)
        }
    } 
    }
    wx.setStorageSync('cart', cart);
  }
})