Page({
  data: {
    navBarData:{
      showSearch:false,
      showBack:true,
    },
  
  },

  onLoad(options) {
    let categoryList=wx.getStorageSync('categoryList')
    let category_index=parseInt(options.category_index,10)
    let good_index=parseInt(options.good_index,10)
    //这个发生在attached之后，所以attached中获取不到properties
    let good=categoryList[category_index].goodsList[good_index]
    good.selectedBase=good.base[0]
    let totalCalories=(good.calories+good.selectedBase.calories)*good.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*good.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice,
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
    good.temp_qty=e.detail;
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
    let totalCalories=(good.calories+good.selectedBase.calories)*good.temp_qty
    let totalPrice=(good.goodsPrice+good.selectedBase.price)*good.temp_qty
    this.setData({
      good:good,
      totalCalories:totalCalories,
      totalPrice:totalPrice
    })

  },
  // add_cart(){
  //   let cart=wx.getStorageSync('cart')
  //   let good=this.data.good
  //   if(cart.length==0){
  //     good.sku_qty=good.temp_qty;
  //     good.temp_qty=1
  //     cart.push(good)
  //     this.setData({
  //       good:good
  //     })
  //   }else{
  //     for(let i=0;i<cart.length;i++){
  //       let cart_item=cart[i];
  //       //购物车中已有同样good_index，同样base的，增加qty
  //       if(cart_item.id===good.id&&cart_item.selectedBase.name===good.selectedBase.name){
  //         cart_item.sku_qty+=good.temp_qty;
  //         cart_item.totalPrice+=this.data.totalPrice;
  //         //重置temp_qty
  //         good.temp_qty=1;
  //         this.setData({
  //           good:good
  //         })
  //         wx.showToast({
  //           title: '添加购物车成功',
  //         })
  //         break;
  //       }else{
  //       //购物车中无同样good_index或good_index相同base不同的，push新item
  //         good.sku_qty=good.temp_qty
  //         good.totalPrice=this.data.totalPrice
  //         cart.push(good);
  //         wx.showToast({
  //           title: '添加购物车成功',
  //         })
  //       }
  //     }
  //   } 
  //   wx.setStorageSync('cart', cart);
  // }
})