
Component({
  options:{
    //启用app.wxss
    addGlobalClass: true,
  },
  properties: {
    category_index:{
      type:Number,
      value:0
    },
    good_index:{
      type:Number,
      value:0
    },
  },

  data: {
    
  },

  lifetimes:{
    ready(){
      this.load_good();
    }
  },
  
  methods: {
    load_good(){
      let categoryList=wx.getStorageSync('categoryList')
      let selectedGood=categoryList[this.properties.category_index].goodsList[this.properties.good_index]
      this.setData({
        selectedGood:selectedGood,
        selectedBase:selectedGood.base[0].name
      })
    },

    add_cart(){
      let cart=wx.getStorageSync('cart')
      let selectedGood=this.data.selectedGood
      console.log(selectedGood.id)
      selectedGood.selectedBase=this.data.selectedBase;
      if(cart.length==0){
        selectedGood.sku_qty=selectedGood.temp_qty;
        selectedGood.temp_qty=1
        cart.push(selectedGood)
        this.setData({
          selectedGood:selectedGood
        })
      }else{
        for(let i=0;i<cart.length;i++){
          let cart_item=cart[i];
          //购物车中已有同样id，同样base的，增加qty
          if(cart_item.id===selectedGood.id&&cart_item.selectedBase.name===selectedGood.selectedBase.name){
            cart_item.sku_qty+=selectedGood.temp_qty;
            cart_item.totalPrice+=this.data.totalPrice;
            //重置temp_qty
            // good.temp_qty=1;
            this.setData({
              selectedGood:selectedGood
            })
            wx.showToast({
              title: '添加购物车成功',
            })
            break;
          }else{
          //购物车中无同样good_index或good_index相同base不同的，push新item
          selectedGood.sku_qty=selectedGood.temp_qty
          selectedGood.totalPrice=this.data.totalPrice
          cart.push(selectedGood);
          wx.showToast({
            title: '添加购物车成功',
          })
          }
        }
      } 
      wx.setStorageSync('cart', cart);
      this.triggerEvent("hideSelector")
      
    },
    onConfigChange(e){
      let {index}=e.currentTarget.dataset;
      let selectedGood=this.data.selectedGood;
      for(let i=0;i<selectedGood.base.length;i++){
        if(i===index){
          selectedGood.base[i].selected=true
        }else{
          selectedGood.base[i].selected=false
        }
      }
      this.setData({
        selectedBase:selectedGood.base[index].name,
        selectedGood:selectedGood
      })
      this.triggerEvent("configChange",index)
    }
}
})
