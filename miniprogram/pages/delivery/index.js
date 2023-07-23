var app=getApp();
var userinfo=wx.getStorageSync('userinfo')
var category=[]
var cart=wx.getStorageSync('cart')
var category_obj={}

Page({
  data: {
    currentIndex:0,
    category:[{id:"poke",name:"波奇",icon:""},{id:"drink",name:"饮品",icon:""}],
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

  onLoad(){
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
  onShow(){
    this.getGoodsList();
    // this.updateCheckoutBar();

  },

  onLeftItemTap:function(e){
    let {name}=e.currentTarget.dataset;
    //设置scroll-into-view的参考对象
    //id不能为中文，key全小写
    this.setData({
      viewid:name
    })
  },

  getGoodsList(){
    wx.cloud.callFunction({
      name:"category",
      data:{
        type:"get"
      }
    }).then(res=>{
      category=res.result.data
      //初始化所有分类的默认type为单品
      for(let i=0;i<category.length;i++){
        let category_item=category[i];
        let category_name=Object.keys(category_item)[1] //获取分类名称，比如poke
        category_obj[category_name]={} //初始化
        for(let index in category_item[category_name].goodsList){
          let good=category_item[category_name].goodsList[index];
          //将stock=0的项移至末位
          if(good.stock===0){
            category_item[category_name].goodsList.push(category_item[category_name].goodsList.splice(index,1)[0])
          }

          //更新价格,加上标配价格
          if(good.material){
            for(let k in good.material["标配"]){
              good.goodsPrice+=good.material["标配"][k]
            }
          }
          
          category_obj[category_name][good.id]=good //不能直接[category_name][good.id]=good,会报cant set property of undefined 错误
          
        }
        }
      this.updateQty();

    })
  },

  updateQty(){
    if(cart.length>0){
      cart.forEach(item=>{
        if(item.sku_qty>0){
          category_obj[item.category][item.id].qty+=item.sku_qty
        }
      })
    }
    wx.setStorageSync('category_obj', category_obj)
    this.setData({
      category_obj:category_obj
    })

  },

  onRightItemTap(e){
    let {category_name,id}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?id='+id,
      success(res){
        res.eventChannel.emit('passGood',{data:{gcategory_name:category_name,id:id}})
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