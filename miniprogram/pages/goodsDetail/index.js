var category_obj=wx.getStorageSync('category_obj')
var cart=wx.getStorageSync('cart')
const app=getApp()
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
    let {category_id,id}=options;
    console.log(options)
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

  add(e){
    //用户未登录则跳转至提示注册界面
    if(app.globalData.loggedIn==false){
      this.registerPopup=this.selectComponent("#popup-register");
      this.registerPopup.showModal();
    }else{
      let good=this.data.good
      good.sku_qty+=1;
      this.setData({
        good:good
      })
    
      this.updateCheckoutBar();

    }
    
  },

  minus(e){
    let good=this.data.good
    if(good.sku_qty>0){
      good.sku_qty-=1;
    }
    this.setData({
      good:good
    })
    this.updateCheckoutBar();
  },

  updateCheckoutBar(){
    let good=this.data.good;
    good.totalPrice=(good.goodsPrice+good.base.price)*good.sku_qty
    let totalCalories=good.calories+good.base.calories
    this.setData({
      "good.totalPrice":good.totalPrice,
      totalCalories:totalCalories
    })
  },
  onBaseChange(e){
    let good=this.data.good;
    let {index}=e.currentTarget.dataset;
    let base=this.data.base;
    //更新价格
    let good_base=this.data.base[index];
    good.base=good_base;
    base.forEach((item,item_index)=>{
      if(item_index==index){
        item.selected=true
      }else{
        item.selected=false
      }
    })
    this.setData({
      good:good,
      base:base
    })
    this.updateCheckoutBar();

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
          console.log(cart_item.id===good.id&&cart_item.base===good.base)
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