
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
    temp_qty:1
  },

  lifetimes:{
    ready(){
      this.load_good();
    },
    detached(){
      console.log("bye")
    }
  },
  
  methods: {
    load_good(){
      let categoryList=wx.getStorageSync('categoryList')
      let selectedGood=categoryList[this.properties.category_index].goodsList[this.properties.good_index]
      selectedGood.selectedBase=selectedGood.base[0]
      this.setData({
        selectedGood:selectedGood
      })
    },

    updateTempQty(e){
      let temp_qty=e.detail;
      this.setData({
        temp_qty:temp_qty
      })
    },

    add_cart(){
      let cart=wx.getStorageSync('cart')
      let selectedGood=this.data.selectedGood
      selectedGood.totalPrice=(selectedGood.goodsPrice+selectedGood.selectedBase.price)*this.data.temp_qty;
      if(cart.length===0){
        //初始化sku_qty为此时的temp_qty
        selectedGood.sku_qty=this.data.temp_qty
        //如果购物车为空，直接推入cart
        try{
          cart.push(selectedGood);
          wx.showToast({
            title: '添加购物车成功',
          })
        }catch(e){
          console.log(e)
        }
      }else{
        for(let i=0;i<cart.length;i++){
          let cart_item=cart[i];
          //购物车中已有同样id，同样base的，增加qty
          if(cart_item.id===selectedGood.id&&cart_item.selectedBase.name===selectedGood.selectedBase.name){
            cart_item.sku_qty+=this.data.temp_qty;
            cart_item.totalPrice+=selectedGood.totalPrice;
            wx.showToast({
              title: '添加购物车成功',
            })
            break;
          }
          //遍历结束依然没有找到
          if(i===cart.length-1){
            //初始化sku_qty为此时的temp_qty
            selectedGood.sku_qty=this.data.temp_qty;
            //购物车中无同样项，push新item
            try{
              cart.push(selectedGood);
              wx.showToast({
                title: '添加购物车成功',
              })
            }catch(e){
              console.log(e)
            }
          }
        }
      }
      //数量归位
      // selectedGood.temp_qty=1;
      // this.setData({
      //   selectedGood:selectedGood
      // })
      wx.setStorageSync('cart', cart);
      this.triggerEvent("hideSelector")
      
    },
    onConfigChange(e){
      let {index}=e.currentTarget.dataset;
      let selectedGood=this.data.selectedGood;
      selectedGood.selectedBase=selectedGood.base[index];
      for(let i=0;i<selectedGood.base.length;i++){
        if(i===index){
          selectedGood.base[i].selected=true
        }else{
          selectedGood.base[i].selected=false
        }
      }
      this.setData({
        selectedGood:selectedGood
      })
      this.triggerEvent("configChange",index)
    }
}
})
