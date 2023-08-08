Page({
  data: {
    navBarData:{
      showSearch:false,
      showBack:true,
    },
  
  },

  onLoad(options) {
    let category_obj=wx.getStorageSync('category_obj')
    let {category_id,id}=options;
    this.data.category_id=category_id;
    this.data.id=id;
    //这个发生在attached之后，所以attached中获取不到properties
    let good=category_obj[category_id][id]
    good.selectedBase=good.base[0]
    let totalCalories=(good.calories+good.selectedBase.calories)*good.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*good.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice
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

  updateCheckout(){
    //更新页面上的checkout bar
    let good=this.data.good
    let totalCalories=(good.calories+good.selectedBase.calories)*good.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*good.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice
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
    let totalCalories=good.calories+good.selectedBase.calories
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*good.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice
    })
    wx.setStorageSync('category_obj', category_obj)

  },
  add_cart(){
    let cart=wx.getStorageSync('cart')
    let category_obj=wx.getStorageSync('category_obj')
    let good=this.data.good
    if(cart.length==0){
      cart.push(good)
    }else{
      for(let i=0;i<cart.length;i++){
        let cart_item=cart[i];
        try{
          //购物车中已有同样id，同样base的，增加qty
          if(cart_item.id===good.id&&cart_item.selectedBase.name===good.selectedBase.name){
            cart_item.sku_qty+=good.temp_qty;
            cart_item.totalPrice+=this.data.totalPrice;
            //重置temp_qty
            good.temp_qty=0;
            wx.setStorageSync('category_obj', category_obj)
            wx.showToast({
              title: '添加购物车成功',
            })
            break;
          }else{
          //购物车中无同样id或id相同base不同的，push新item
            good.sku_qty=good.temp_qty
            good.totalPrice=this.data.totalPrice
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