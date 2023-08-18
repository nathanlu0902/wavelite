
import config from "../../config/config"
import {total_cart_price, update_spu_qty} from "../../utils/utils"


Page({
  data: {
    currentIndex:0,
    notification_list:[
      '你知道吗',
      'KC是',
      'SB'
    ],
    navBarData:{
      showBack:false,
      showSearch:true
    },
    bannerList:[
      {link:'',
       imgUrl:"../../images/kc.jpg",
       title:"test1"
      },
      {link:'',
      imgUrl:"../../images/kc.jpg",
      title:"test2"
     },
     {link:'',
     imgUrl:"../../images/kc.jpg",
     title:"test3"
    },
    ],
    
  },

  onLoad(){


  },
  onShow(){
    let categoryList=wx.getStorageSync('categoryList')
    this.updateCheckout();
    var userinfo=wx.getStorageSync('userinfo')
    //筛选选中的地址
    let chosenAddress=userinfo.address.filter(item=>{
      return item.selected===true
    })
    var app=getApp();
    //设置用户信息
    this.setData({
      //不用setdata的话会获取不到globaldata的loggedIn，但是其他变量可以获取到，不懂
      loggedIn:app.globalData.loggedIn,
      navBarHeight:app.globalData.navBarHeight,
      statusBarHeight:app.globalData.statusBarHeight,
      shopList:config.shopList,
      userinfo:userinfo,
      category_list:config.category_list,
      chosenAddress:chosenAddress[0],
      categoryList:categoryList
    })

    var list=this.selectAllComponents(".qty-control")
    list.forEach(item=>{
      item.loadGood();
    })

  },

  onLeftItemTap:function(e){
    let {index}=e.currentTarget.dataset;
    //设置scroll-into-view的参考对象
    //id不能为中文，key全小写
    this.setData({
      viewid:this.data.category_list[index].id,
      currentIndex:index
    })
  },


  onRightItemTap(e){
    let {category_index,good_index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?category_index='+category_index+'&good_index='+good_index,
      // success(res){
      //   res.eventChannel.emit('passGood',{data:{gcategory_id:category_id,id:id}})
      // },
      fail(err){
        console.log(err)
      }
    })
  },


  updateCheckout(){
    let totalPrice=total_cart_price();
    this.setData({
      totalPrice:totalPrice
    })
  },

  changeType(e){
    let {type,category_index}=e.currentTarget.dataset;
    //仅更改该分类的type
    this.setData({
      [`category_list[${category_index}].type`]:type
    })
  },
  chooseAddress(){
    wx.navigateTo({
      url: '../chooseAddress/index',
    })
  },

  checkout(){
    wx.navigateTo({
      url: '../../pages/cart/index',
    })
  },

  chooseConfig(e){
    //qty-control传入
    let {category_index,good_index}=e.detail;
    this.selectComponent("#config-selector").properties.category_index=category_index;
    this.selectComponent("#config-selector").properties.good_index=good_index;
    this.selectComponent("#config-selector").load_good();
    //显示popup
    this.selectComponent("#config-popup").showModal();

  },

  hideSelector(){
    this.updateCheckout();
    //选择所有qty-control组件，调用loadgood方法
    var list=this.selectAllComponents(".qty-control")
    list.forEach(item=>{
      item.loadGood();
    })
    this.selectComponent('#config-popup').hideModal();

  }
})