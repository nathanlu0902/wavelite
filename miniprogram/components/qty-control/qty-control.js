 import {update_spu_qty} from "../../utils/utils" 
  /*
    1.列表页，详情页
      good.needconfig==true&&spu_qty=0
        选规格
      good.needconfig==true&&spu_qty>0
        + 弹出选规格
        - 提示去购物车减购
      good.needconfig==false&&spu_qty=0
        + cart增加
      good.needconfig==false&&spu_qty>0
        + cart增加
        - cart减少

    2.规格选择页
      good.needconfig==true
        +增加temp_qty
        -减少temp_qty
        选好了 cart增加temp_qty
  */ 
Component({
  properties: {
    category_index:{
      type:Number
    },
    good_index:{
      type:Number
    },
    pagetype:{
      type:String
    },
    cart_item_index:{
      type:Number
    }
  },

  lifetimes:{
    ready:function(){
      this.loadGood();
    }
  },
  data: {
    
  },

  methods: {
    loadGood(){
      let cart=wx.getStorageSync('cart')
      //获取缓存中的categoryList,得到good，根据good的属性判断如何显示
      update_spu_qty();
      let categoryList=wx.getStorageSync('categoryList')
      let good=categoryList[this.properties.category_index].goodsList[this.properties.good_index]
      let temp_qty=1;
      let cart_item=cart[this.properties.cart_item_index]
      this.setData({
        good:good,
        temp_qty:temp_qty,
        cart_item:cart_item
      })
  
    },
  
    //列表页面配置项的增
    configAdd(){
      this.triggerEvent("chooseConfig",{category_index:this.properties.category_index,good_index:this.properties.good_index})
    },

    configMinus(){
      wx.showToast({
        icon:"none",
        title: '多规格商品请到购物车减购',
      })
    },
    
    add(){
      //用户未登录则跳转至提示注册界面
      // if(!app.globalData.loggedIn){
      //   this.registerPopup=this.selectComponent("#popup-register");
      //   this.registerPopup.showModal();
      // }else{
      let good=this.data.good;
      let cart=wx.getStorageSync('cart')
      let existingItem=cart.find(cart_item=>{
        return cart_item.id===good.id
      })
      if(existingItem){
        existingItem.sku_qty+=1
        existingItem.totalPrice=(existingItem.goodsPrice+existingItem.base.price)*existingItem.sku_qty
      }else{
        good.sku_qty=1
        good.totalPrice=(good.goodsPrice+good.base.price)*good.sku_qty
        cart.push(good)
      }
      wx.setStorageSync("cart",cart)
      good.spu_qty+=1
      this.setData({
        good:good
      })
      this.triggerEvent("updateCheckout");
    },
  
    minus(){
      let good=this.data.good;
      let cart=wx.getStorageSync('cart')
      //不需要配置，直接更新cart
      if(!good.needConfig){
        //更新购物车
        const index=cart.findIndex(cart_item=>{
          return cart_item.id===good.id
        })
        if(cart[index].sku_qty===1){
          cart.splice(index,1)
        }else{
          cart[index].sku_qty-=1
          cart[index].totalPrice=(cart[index].goodsPrice+cart[index].selectedBase.price)*cart[index].sku_qty
        }
        //更新categoryList
        wx.setStorageSync('cart', cart)
        good.sku_qty-=1
        this.setData({
          good:good
        })
      }
      this.triggerEvent("updateCheckout")
    },
    //弹出配置页面的增减
    configPageAdd(){
      let temp_qty=this.data.temp_qty
      //如果是config项，只更新页面上的temp_qty
      temp_qty+=1;
      this.setData({
        temp_qty:temp_qty
      })
      this.triggerEvent("updateTempQty",temp_qty);
    },
    configPageMinus(){
      let temp_qty=this.data.temp_qty
      if(temp_qty>1){
        temp_qty-=1;
        this.setData({
          temp_qty:temp_qty
        })
      }
      this.triggerEvent("updateTempQty",temp_qty)
    },

    cartPageAdd(){
      let cart=wx.getStorageSync('cart')
      let cart_item=cart[this.properties.cart_item_index]
      cart_item.sku_qty+=1;
      cart_item.totalPrice=(cart_item.goodsPrice+cart_item.selectedBase.price)*cart_item.sku_qty
      wx.setStorageSync('cart', cart)
      this.loadGood();
      this.triggerEvent("update_price_calories")
      
    },

    cartPageMinus(){
      let cart=wx.getStorageSync('cart')
      let cart_item=cart[this.properties.cart_item_index]
      if(cart_item.sku_qty>1){
        cart_item.sku_qty-=1;
        cart_item.totalPrice=(cart_item.goodsPrice+cart_item.selectedBase.price)*cart_item.sku_qty
      }else{
        cart.splice(this.properties.cart_item_index,1)
        cart_item.totalPrice=0
      }
      wx.setStorageSync('cart', cart)
      this.loadGood()
      this.triggerEvent("update_price_calories")
      
    }
  }
})

    
