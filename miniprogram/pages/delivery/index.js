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
    bannerList:[]
    
  },
  onScroll:function(e){
    let {scrollTop}=e.detail;
    //计算scrolltop为多少时设置currentIndex为多少

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
    this.getGoodsCategory();
    this.getGoodsList();
    this.getCart();
    if(wx.getStorageSync('userinfo')){
      let nickname=wx.getStorageSync('userinfo')[0].nickname;
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

  getCart(){
    wx.cloud.callFunction({
      name:"getCartList"
    }).then(res=>{
      let {totalCount,totalPrice,cart}=res.result;
      //更新goodslist中的qty
      let goodsList=wx.getStorageSync('goodsList');
      for (let key in goodsList){
        goodsList[key].forEach(item=>{
            let index=cart.findIndex(v=>v._id===item._id);
            if(index!=-1){
              item.qty=cart[index].qty;
            }else{
              item.qty=0;
            }
          }
        )
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
      let goodsList=res.result;
      wx.setStorageSync('goodsList', goodsList)
      this.setData({
        goodsList:goodsList
      })
    })

  },

  getGoodsCategory(){
    wx.cloud.callFunction({
      name:"getGoodsCategory"
    }).then(res=>{
      let goodsCategory=res.result.res;
      goodsCategory.forEach(item=>{
        item.fixed=false;
      })
      this.setData({
        goodsCategory:goodsCategory
      })
    })
  },

  onRightItemTap(e){
    let {index}=e.currentTarget.dataset;
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
      this.registerPopup=this.selectComponent("#popup");
      this.registerPopup.showModal();
    }else{
      let {index,category}=e.currentTarget.dataset;
      let item=this.data.goodsList[category][index];
      wx.cloud.callFunction({
        name:"addToCart",
        data:{
          item:item
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