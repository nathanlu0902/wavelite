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
      let goodsList=res.result.data
      let category_type=[]
      //初始化所有分类的默认选项为单品
      for(let i=0;i<goodsList.length;i++){
        category_type[i]="single";
        let category_goodsList=goodsList[i].goodsList
        // 遍历goods，将stock=0的项移至末位
        for(let j=0;j<category_goodsList.length;j++){
          if(category_goodsList[j].stock===0){
            category_goodsList.push(category_goodsList.splice(j,1)[0])
            console.log(category_goodsList)
          }
        }
      }
      this.setData({
        category_type:category_type
      })
      wx.setStorageSync('goodsList', goodsList)
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
    let {good_index,category_index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?goodsid',
      success(res){
        res.eventChannel.emit('passGood',{data:{good_index:good_index,category_index:category_index}})
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
  },

  change_category_type(e){
    let {type,index}=e.currentTarget.dataset;
    let category_type=this.data.category_type;
    category_type[index]=type
    this.setData({
      category_type:category_type
    })
  }
})