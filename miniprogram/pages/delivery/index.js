var app=getApp();
var userinfo=wx.getStorageSync('userinfo')
Page({
  goodsList:[],
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
    this.updateQty();
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
      let goodsList=res.result.data
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
          if(good.gradient){
            for(let k in good.gradient["标配"]){
              good.goodsPrice+=good.gradient["标配"][k]
            }
          }
        }
      }
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

  change_type(e){
    let {type,category_index}=e.currentTarget.dataset;
    //仅更改该分类的type
    this.setData({
      [`goodsList[${category_index}].type`]:type
    })
  }
})