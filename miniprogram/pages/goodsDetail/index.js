var goodsList=wx.getStorageSync('goodsList')
var cart=wx.getStorageSync('cart')
Page({
  data: {
    tabItems:[
      {
        id:0,
        value:"详情",
        isActive:true
      },
      {
        id:1,
        value:"评论",
        isActive:false
      },
      {
        id:2,
        value:"搭配",
        isActive:false
      }
    ],
  },

  onLoad() {
     //获取前一个页面传入的index
     let eventChannel=this.getOpenerEventChannel();
     var good;
     eventChannel.on("passGood",res=>{
       let {category_index,good_index}=res.data;
       good=goodsList[category_index]["goodsList"][good_index]
     })
     //获取该good在cart中的数量
     let cart_item=cart.find(item=>{
       return item.id===good.id
     })
     if(cart_item){
       good.qty=cart_item.qty
     }else{
       good.qty=0
     }
     this.setData({
      good:good
    })
  },

  handleTabClicked:function(e){
    let index=e.detail;
    let {tabItems}=this.data;
    tabItems.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabItems
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

  add(e){
    //用户未登录则跳转至提示注册界面
    if(wx.getStorageSync('loggedIn')==false){
      this.registerPopup=this.selectComponent("#popup-register");
      this.registerPopup.showModal();
    }else{
      let good=this.data.good
      const existingItem=cart.find(cart_item=>{
        return cart_item.id===good.id
      })
      if(existingItem){
        existingItem.qty+=1
        good.qty+=1
      }else{
        good.qty=1
        cart.push(good)
      }
      wx.setStorageSync("cart",cart);
      this.setData({
        good:good
      })
    
      // this.updateCheckoutBar();

    }
    
  },

  minus(e){
    let good=this.data.good
    const index=cart.findIndex(cart_item=>{
      return cart_item.id===good.id
    })
    if(cart[index].qty===1){
      cart.splice(index,1)
      good.qty=0
    }else{
      cart[index].qty-=1
      good.qty-=1
    }
    wx.setStorageSync('cart', cart)
    this.setData({
      good:good
    })
    // this.updateCheckoutBar();
  },

 
  checkout(){
    wx.navigateTo({
      url: '../cart/index',
    })
  },



})