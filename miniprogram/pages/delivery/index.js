const app=getApp();
Page({
  data: {
    // height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
    currentIndex:0,
    navBarData:{
      showLocation:true,
      showBack:false,
      showDistance:true,
      showSearch:true
    },
    bannerList:[
      {link:'',
       imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg',
       title:"test1"
      },
      {link:'',
      imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg',
      title:"test1"
     },
     {link:'',
     imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg',
     title:"test1"
    },
    ]
    
  },

  onLeftItemTap:function(e){
    let {categoryid,index}=e.currentTarget.dataset;
    //设置scroll-into-view的参考对象
    //id不能为中文，key全小写
    this.setData({
      viewid:categoryid,
      currentIndex:index
    })
  },

  onShow(){
    this.getGoodsList();
    this.updateQty();
    this.updateCheckoutBar();
    this.setData({
      navBarHeight:app.globalData.navBarHeight,
      statusBarHeight:app.globalData.statusBarHeight
    })

    //设置用户信息
    if(wx.getStorageSync('userinfo')){
      let nickname=wx.getStorageSync('userinfo').nickname;
      this.setData({
        nickname:nickname
      })
    }else{
      console.log("no user info")
      this.setData({
        nickname:"waver"
      })
    }

  },

  getGoodsList(){
    //更新商品数量
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      wx.setStorageSync('goodsList', res.result.data)
    })
  },

  updateQty(){
    let goodsList=wx.getStorageSync('goodsList')
    //遍历goodsList和cart，更新goodsList的qty
    let cart=wx.getStorageSync('cart')
    goodsList.forEach(category=>{
      category.goodsList.forEach(good=>{
        let item=cart.find(item=>{
          return item.id===good.id 
        })
        if(item){
          good.qty=item.qty
        }else{
          good.qty=0
        }
      })
    })
    wx.setStorageSync('goodsList', goodsList)
    this.setData({
      goodsList:goodsList
    })

  },

  onRightItemTap(e){
    let {category,index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?goodsid',
      success(res){
        res.eventChannel.emit('passGood',{data:index})
      },
      fail(err){
        console.log(err)
      }
    })
  },

  add(e){
    //用户未登录则跳转至提示注册界面
    if(wx.getStorageSync('loggedIn')==false){
      this.registerPopup=this.selectComponent("#popup-register");
      this.registerPopup.showModal();
    }else{
      let {category_index,good_index}=e.currentTarget.dataset;
      let good=this.data.goodsList[category_index]["goodsList"][good_index];
      var cart=wx.getStorageSync('cart')
      const existingItem=cart.find(cart_item=>{
        return cart_item.id===good.id
      })
      if(existingItem){
        existingItem.qty+=1
      }else{
        good.qty=1
        cart.push(good)
      }
      wx.setStorageSync("cart",cart);
      this.updateQty();
      this.updateCheckoutBar();

    }
    
  },

  minus(e){
    let {category_index,good_index}=e.currentTarget.dataset;
    let good=this.data.goodsList[category_index]["goodsList"][good_index];
    var cart=wx.getStorageSync('cart');
    const index=cart.findIndex(cart_item=>{
      return cart_item.id===good.id
    })
    if(cart[index].qty===1){
      cart.splice(index,1)
    }else(
      cart[index].qty-=1
    )
    wx.setStorageSync('cart', cart)
    this.updateQty();
    this.updateCheckoutBar();
  },

  updateCheckoutBar(){
    let cart=wx.getStorageSync('cart')
    let totalPrice=0;
    let totalCount=0;
    cart.forEach(item=>{
      totalPrice+=item.qty*item.goodsPrice;
      totalCount+=item.qty
    })
    this.setData({
      totalCount:totalCount,
      totalPrice:totalPrice
    })
  }

})