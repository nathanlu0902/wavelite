var app=getApp();
var userinfo=wx.getStorageSync('userinfo')
var goodsList=[]
var cart=wx.getStorageSync('cart')

Page({
  data: {
    currentIndex:0,
    notification_list:[
      'hi',
      'ssegegegwgegegege',
      'efefefefefefe'
    ],
    navBarData:{
      showBack:false,
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

  onLoad(){
    this.getGoodsList();
    // this.updateQty();
    this.updateCheckoutBar();

    //设置用户信息
    this.setData({
      userinfo:userinfo,
      //不用setdata的话会获取不到globaldata的loggedIn，但是其他变量可以获取到，不懂
      loggedIn:app.globalData.loggedIn,
      navBarHeight:app.globalData.navBarHeight,
      statusBarHeight:app.globalData.statusBarHeight,
      shopList:app.globalData.shopList
    })

  },

  getGoodsList(){
    wx.cloud.callFunction({
      name:"getGoodsList"
    }).then(res=>{
      goodsList=res.result.data
      //初始化所有分类的默认type为单品
      for(let i=0;i<goodsList.length;i++){
        goodsList[i].type="single";
        // 遍历goods，将stock=0的项移至末位
        let category_goodsList=goodsList[i].goodsList
        for(let j=0;j<category_goodsList.length;j++){
          let good=category_goodsList[j];
          if(good.stock===0){
            category_goodsList.push(category_goodsList.splice(j,1)[0])
          }
          //更新价格,加上标配价格
          if(good.material){
            for(let k in good.material["标配"]){
              good.goodsPrice+=good.material["标配"][k]
            }
          }
        }
      }
      this.updateQty();
    })
  },

  updateQty(){
    //遍历goodsList和cart，更新goodsList的qty
    let new_cart=wx.getStorageSync('cart')
    goodsList.forEach(category=>{
      category.goodsList.forEach(good=>{
        var spu_qty=0;
        if(new_cart.length==0){
          good.spu_qty=spu_qty;
          return;
        }else{
          for(let index in new_cart){
            if(new_cart[index].id==good.id){
              spu_qty+=new_cart[index].sku_qty;
              new_cart.splice(index,1);
            }
          }
          good.spu_qty=spu_qty;
        }  
    })})
    wx.setStorageSync('goodsList', goodsList)
    this.setData({
      goodsList:goodsList
    })
  },

  onRightItemTap(e){
    let {good_index,category_index,id}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?id='+id,
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
    if(!this.data.loggedIn){
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
        existingItem.sku_qty+=1
        existingItem.spu_qty+=1
        existingItem.totalPrice=existingItem.sku_qty*existingItem.goodsPrice
      }else{
        good.sku_qty=1
        good.spu_qty=1
        good.totalPrice=good.sku_qty*good.goodsPrice
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
    if(cart[index].sku_qty===1){
      cart.splice(index,1)
    }else{
      cart[index].sku_qty-=1
      cart[index].spu_qty-=1
      cart[index].totalPrice=cart[index].sku_qty*cart[index].goodsPrice
    }
    wx.setStorageSync('cart', cart)
    this.updateQty();
    this.updateCheckoutBar();
  },

  updateCheckoutBar(){
    let totalPrice=0;
    cart.forEach(item=>{
      totalPrice+=item.totalPrice;
    })
    this.setData({
      totalPrice:totalPrice
    })
  },

  change_type(e){
    let {type,category_index}=e.currentTarget.dataset;
    //仅更改该分类的type
    this.setData({
      [`goodsList[${category_index}].type`]:type
    })
  }
})