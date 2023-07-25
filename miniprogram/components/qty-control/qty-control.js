let category_obj=wx.getStorageSync('category_obj')
let cart=wx.getStorageSync('cart')
Component({
  properties: {
    category_id:{
      type:String
    },
    goodid:{
      type:String
    }
  },
  lifetimes:{
    attached:function(){
      
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
      let existingItem=cart.find(cart_item=>{
        return cart_item.id===this.properties.goodid
      })
      if(existingItem){
        existingItem.sku_qty+=1
        existingItem.totalPrice=existingItem.sku_qty*existingItem.goodsPrice
      }else{
        let good=this.data.good
        good.sku_qty=1
        good.category_id=this.properties.category_id
        good.totalPrice=good.sku_qty*good.goodsPrice
        cart.push(good)
      }
      wx.setStorageSync("cart",cart)
      //更新category_obj
      category_obj[this.properties.category_id][this.properties.goodid].spu_qty+=1
      wx.setStorageSync('category_obj', category_obj)
      this.setData({
        good:category_obj[this.properties.category_id][this.properties.goodid]
      })
      this.triggerEvent("updateCheckout")
      
    },
  
    minus(){
      //更新购物车
      const index=cart.findIndex(cart_item=>{
        return cart_item.id===this.properties.goodid
      })
      if(cart[index].sku_qty===1){
        cart.splice(index,1)
      }else{
        cart[index].sku_qty-=1
        cart[index].totalPrice=cart[index].sku_qty*cart[index].goodsPrice
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

    updateQty(){
      if(cart.length>0){

        cart.forEach(item=>{
          if(item.sku_qty>0){
            category_obj[item.category_id][item.id].spu_qty+=item.sku_qty
          }
        })
      }
      wx.setStorageSync('category_obj', category_obj)
      this.setData({
        good:category_obj[this.properties.category_id][this.properties.goodid]
      })

    }
  }
})

    
