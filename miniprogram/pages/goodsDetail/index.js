Page({
  data: {
    navBarData:{
      showSearch:false,
      showBack:true,
    },
    temp_qty:1
  },

  onLoad(options) {
    let categoryList=wx.getStorageSync('categoryList')
    let category_index=parseInt(options.category_index,10)
    let good_index=parseInt(options.good_index,10)
    //这个发生在attached之后，所以attached中获取不到properties
    let good=categoryList[category_index].goodsList[good_index]
    good.selectedBase=good.base[0]
    let totalCalories=(good.calories+good.selectedBase.calories)*this.data.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*this.data.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice.toFixed(2),
      category_index:category_index,
      good_index:good_index
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

  updateCheckout(e){
    //更新页面上的checkout bar
    let good=this.data.good
    let totalCalories=(good.calories+good.selectedBase.calories)*this.data.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*this.data.temp_qty
   
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice.toFixed(2)
    })

  },
  onBaseChange(e){
    let good=this.data.good
    let {index}=e.currentTarget.dataset;
    good.selectedBase=good.base[index]
    //更新价格
    good.base.forEach((item,item_index)=>{
      if(item_index==index){
        item.selected=true
      }else{
        item.selected=false
      }
    })
    let totalCalories=(good.calories+good.selectedBase.calories)*this.data.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*this.data.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice.toFixed(2)
    })

  },
  updateTempQty(e){
    let temp_qty=e.detail;
    this.setData({
      temp_qty:temp_qty
    })
    this.updateCheckout()
  },

  add_cart(){
    let cart=wx.getStorageSync('cart')
    let good=this.data.good
    good.totalPrice=(good.goodsPrice+good.selectedBase.price)*this.data.temp_qty;
    if(cart.length===0){
      //初始化sku_qty为此时的temp_qty
      good.sku_qty=this.data.temp_qty
      //如果购物车为空，直接推入cart
      try{
        cart.push(good);
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
        if(cart_item.id===good.id&&cart_item.selectedBase.name===good.selectedBase.name){
          cart_item.sku_qty+=this.data.temp_qty;
          cart_item.totalPrice+=good.totalPrice;
          wx.showToast({
            title: '添加购物车成功',
          })
          break;
        }
        //遍历结束依然没有找到
        if(i===cart.length-1){
          //初始化sku_qty为此时的temp_qty
          good.sku_qty=this.data.temp_qty;
          //购物车中无同样项，push新item
          try{
            cart.push(good);
            wx.showToast({
              title: '添加购物车成功',
            })
          }catch(e){
            console.log(e)
          }
        }
      }
    }
    wx.setStorageSync('cart', cart);
    setTimeout(wx.navigateBack,1000) 
    
  },
})