var app=getApp();
var userinfo=wx.getStorageSync('userinfo')
var category=[]

var category_obj={}

Page({
  data: {
    currentIndex:0,
    category:[{id:"poke",name:"波奇",icon:"",type:"single"},{id:"drink",name:"饮品",icon:"",type:"single"}],
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
      title:"test2"
     },
     {link:'',
     imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg',
     title:"test3"
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
    this.updateCheckout();

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
        var category_item=category[i];
        let category_id=Object.keys(category_item)[1] //获取分类名称，比如poke
        category_obj[category_id]={} //初始化
        for(let index in category_item[category_id].goodsList){
          let good=category_item[category_id].goodsList[index];
          //将stock=0的项移至末位
          if(good.stock===0){
            category_item[category_id].goodsList.push(category_item[category_id].goodsList.splice(index,1)[0])
          }

          //更新价格,加上标配价格
          if(good.material){
            for(let k in good.material["标配"]){
              good.goodsPrice+=good.material["标配"][k]
            }
          }
          good.category_id=category_id
          category_obj[category_id][good.id]=good //不能直接[category_id][good.id]=good,会报cant set property of undefined 错误
          
        }
        }
      //查找购物车，更新spu_qty
      let cart=wx.getStorageSync('cart')
      for(let i=0;i<cart.length;i++){
        let cart_item=cart[i]
        category_obj[cart_item.category_id][cart_item.id].spu_qty+=cart_item.sku_qty
      }

      wx.setStorageSync('category_obj', category_obj)
      this.setData({
        category_obj:category_obj
      })

    })
  },



  onRightItemTap(e){
    let {category_id,id}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?id='+id+'&category_id='+category_id,
      success(res){
        res.eventChannel.emit('passGood',{data:{gcategory_id:category_id,id:id}})
      },
      fail(err){
        console.log(err)
      }
    })
  },


  updateCheckout(){
    let totalPrice=0;
    let cart=wx.getStorageSync('cart')
    cart.forEach(item=>{
      totalPrice+=item.totalPrice;
    })
    this.setData({
      totalPrice:totalPrice
    })
  },

  change_type(e){
    let {type,index}=e.currentTarget.dataset;
    //仅更改该分类的type
    this.setData({
      [`category[${index}].type`]:type
    })
  }
})