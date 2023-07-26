
Component({
  properties: {
    category_id:{
      type:String
    },
    goodid:{
      type:String
    },
  },
  lifetimes:{
    ready:function(){
      let category_obj=wx.getStorageSync('category_obj')
      let good=category_obj[this.properties.category_id][this.properties.goodid]
      this.setData({
        good:good
      })
      wx.setStorageSync('category_obj', category_obj)
    }
  },
  data: {
    
  },

  methods: {
  
    add(){
      //用户未登录则跳转至提示注册界面
      // if(!app.globalData.loggedIn){
      //   this.registerPopup=this.selectComponent("#popup-register");
      //   this.registerPopup.showModal();
      // }else{
      let category_obj=wx.getStorageSync('category_obj')
      let good=category_obj[this.properties.category_id][this.properties.goodid]
      //如果是非config项，直接更改cart和obj
      if(!this.data.good.needConfig){
        let cart=wx.getStorageSync('cart')
        let existingItem=cart.find(cart_item=>{
          return cart_item.id===this.properties.goodid
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
        //更新category_obj
        good.spu_qty+=1
        this.setData({
          good:good
        })
      }else{
      //如果是config项，只更新页面上的temp_qty
      good.temp_qty+=1;
      this.setData({
        good:good
      })
      }
      wx.setStorageSync('category_obj', category_obj)
      this.triggerEvent("updateCheckout");
      
    },
  
    minus(){
      let category_obj=wx.getStorageSync('category_obj')
      let good=category_obj[this.properties.category_id][this.properties.goodid]
      if(!good.needConfig){
        let cart=wx.getStorageSync('cart')
        //更新购物车
        const index=cart.findIndex(cart_item=>{
          return cart_item.id===this.properties.goodid
        })
        if(cart[index].sku_qty===1){
          cart.splice(index,1)
        }else{
          cart[index].sku_qty-=1
          cart[index].totalPrice=(cart[index].goodsPrice+cart[index].base.price)*cart[index].sku_qty
        }
        //更新category_obj
        wx.setStorageSync('cart', cart)
        good.spu_qty-=1
        this.setData({
          good:good
        })
      }else{
        good.temp_qty-=1;
        this.setData({
          good:good
        })
      }
      wx.setStorageSync('category_obj', category_obj)
      this.triggerEvent("updateCheckout")
    },

  }
})

    
