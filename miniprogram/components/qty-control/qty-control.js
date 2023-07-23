
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good:{
      type:Object
    },
    category_name:{
      type:String
    },
    goodid:{
      type:String
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
    lifetimes:{
    },
  
    add(){
      //用户未登录则跳转至提示注册界面
      // if(!app.globalData.loggedIn){
      //   this.registerPopup=this.selectComponent("#popup-register");
      //   this.registerPopup.showModal();
      // }else{
      const cart=wx.getStorageSync('cart')
      const goodid=this.properties.goodid
      let good=this.properties.good;
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
  }
})
