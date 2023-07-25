
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
    attached:function(){
      let category_obj=wx.getStorageSync('category_obj')
      let good=category_obj[this.properties.category_id][this.properties.goodid]
      this.setData({
        good:good
      })
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
      //更新购物车
      let cart=wx.getStorageSync('cart')
      let existingItem=cart.find(cart_item=>{
        return cart_item.id===this.properties.goodid
      })
      if(existingItem){
        existingItem.sku_qty+=1
        existingItem.totalPrice=(existingItem.goodsPrice+existingItem.base.price)*existingItem.sku_qty
      }else{
        let good=this.data.good
        good.sku_qty=1
        good.category_id=this.properties.category_id
        good.totalPrice=(good.goodsPrice+good.base.price)*good.sku_qty
        cart.push(good)
      }
      wx.setStorageSync("cart",cart)
      //更新category_obj
      let category_obj=wx.getStorageSync('category_obj')
      category_obj[this.properties.category_id][this.properties.goodid].spu_qty+=1
      wx.setStorageSync('category_obj', category_obj)
      this.setData({
        good:category_obj[this.properties.category_id][this.properties.goodid]
      })
      this.triggerEvent("updateCheckout")
      
    },
  
    minus(){
      let cart=wx.getStorageSync('cart')
      let category_obj=wx.getStorageSync('category_obj')
      //更新购物车
      const index=cart.findIndex(cart_item=>{
        return cart_item.id===this.properties.goodid
      })
      if(cart[index].sku_qty===1){
        cart.splice(index,1)
      }else{
        cart[index].sku_qty-=1
        cart[index].totalPrice=(cart[index].goodsPrice+good.base.price)*cart[index].sku_qty
      }
      //更新category_obj
      wx.setStorageSync('cart', cart)
      category_obj[this.properties.category_id][this.properties.goodid].spu_qty-=1
      wx.setStorageSync('category_obj', category_obj)
      this.setData({
        good:category_obj[this.properties.category_id][this.properties.goodid]
      })
      this.triggerEvent("updateCheckout")
    },

  }
})

    
