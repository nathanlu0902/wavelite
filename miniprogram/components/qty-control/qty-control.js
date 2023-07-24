
Component({
  properties: {
    good:{
      type:Object
    },
    category_id:{
      type:String
    },
    goodid:{
      type:String
    }
  },
  lifetimes:{
    attached:function(){
      console.log("1")
      this.updateQty();
      console.log("2")
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
      const cart=wx.getStorageSync('cart')
      const goodid=this.properties.goodid
      const good=this.properties.good;
      let existingItem=cart.find(cart_item=>{
        return cart_item.id===goodid
      })
      if(existingItem){
        existingItem.sku_qty+=1
        good.spu_qty=1
        existingItem.totalPrice=existingItem.sku_qty*existingItem.goodsPrice
      }else{
        good.sku_qty=1
        good.spu_qty=1
        good.category_id=this.properties.category_id
        good.totalPrice=good.sku_qty*good.goodsPrice
        cart.push(good)
      }
      wx.setStorageSync("cart",cart);
    
      
    },
  
    minus(){
      const goodid=this.properties.goodid
      const cart=wx.getStorageSync('cart')
      const index=cart.findIndex(cart_item=>{
        return cart_item.id===goodid
      })
      if(cart[index].sku_qty===1){
        cart.splice(index,1)
      }else{
        cart[index].sku_qty-=1
        cart[index].totalPrice=cart[index].sku_qty*cart[index].goodsPrice
      }
      wx.setStorageSync('cart', cart)
    },

    updateQty(){
      console.log("hi")
      const cart=wx.getStorageSync('cart')
      const category_obj=wx.getStorageSync('category_obj')
      if(cart.length>0){
        cart.forEach(item=>{
          if(item.sku_qty>0){
            console.log(item.category_id)
            category_obj[item.category_id][item.id].spu_qty+=item.sku_qty
          }
        })
      }
      
      this.setData({
        category_obj:category_obj
      })

    }
  }
})

    
