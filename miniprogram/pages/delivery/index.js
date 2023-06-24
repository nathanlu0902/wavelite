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
    // this.getGoodsCategory();
    this.getGoodsList();
    this.getCart();
    this.setData({
      navBarHeight:app.globalData.navBarHeight,
      statusBarHeight:app.globalData.statusBarHeight
    })
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

    var cart=wx.getStorageSync('cart')

    

  },

  getCart(){
    wx.cloud.callFunction({
      name:"getCartList"
    }).then(res=>{
      let {totalCount,totalPrice,cart}=res.result;
      //更新goodslist中的qty
      let goodsList=wx.getStorageSync('goodsList');
      for(var i=0;i<goodsList.length;i++){
        var item=goodsList[i];
        for(var j=0;j<item.length;j++){
          var good_item=item[j];
          let index=cart.findIndex(v=>v._id===good_item.id)
          if(index!=-1){
            good_item.qty=cart[index].qty;
          }else{
            good_item.qty=0
          }
        
        }
      }
      this.setData({
        totalCount:totalCount,
        totalPrice:totalPrice,
        goodsList:goodsList
      })
      wx.setStorageSync("goodsList",goodsList)
    })
  },

  getGoodsList(){
    //更新商品数量
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      let goodsList=res.result.data;
      wx.setStorageSync('goodsList', goodsList)
      this.setData({
        goodsList:goodsList
      })
    })

  },

  // getGoodsCategory(){
  //   wx.cloud.callFunction({
  //     name:"getGoodsCategory"
  //   }).then(res=>{
  //     let goodsCategory=res.result.res;
  //     console.log(goodsCategory)
  //     goodsCategory.forEach(item=>{
  //       item.fixed=false;
  //     })
  //     this.setData({
  //       goodsCategory:goodsCategory
  //     })
  //   })
  // },

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
  add:function(e){
    //用户未登录则跳转至提示注册界面
    if(wx.getStorageSync('loggedIn')==false){
      this.registerPopup=this.selectComponent("#popup-register");
      this.registerPopup.showModal();
    }else{
      let {category_index,good_index}=e.currentTarget.dataset;
      let good=this.data.goodsList[category_index]["goodsList"][good_index];
      var cart=wx.getStorageSync('cart')
      const existingItem=cart.find(cart_item=>{
        cart_item.id===good.id
      })
      if(existingItem){
        existingItem.qty+=1
      }else{
        good.qty=1
        cart.push(good)
      }
      
      wx.cloud.callFunction({
        name:"addToCart",
        data:{
          good:good
        }
      }).then(()=>{
        this.getCart();
        }
      )
    }
    
  },

  minus:function(e){
    let _id=e.currentTarget.dataset._id;
    wx.cloud.callFunction({
      name:"removeFromCart",
      data:{
        _id:_id
      }
    }).then(()=>{
      this.getCart();
    })
  },

})