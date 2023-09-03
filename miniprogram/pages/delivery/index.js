
import config from "../../config/config"
import {total_cart_price} from "../../utils/utils"


Page({
  data: {
    cart_expanded:false,
    currentIndex:0,
    notification_list:[
      {
        name:"店铺公告",
        method:"showShopNotice"
      },
      {
        name:"广告1"
      }
    ],
    navBarData:{
      showBack:false,
      showSearch:true
    },
    bannerList:[
      {category_index:1,
       good_index:1,
       imgUrl:"cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/1cf7e0a6f61606df40a660831a26b10a.png",
       title:"test1"
      },
      {category_index:1,
      good_index:2,
      imgUrl:"cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/1cf7e0a6f61606df40a660831a26b10a.png",
      title:"test2"
     },
     {category_index:1,
      good_index:3,
     imgUrl:"cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/1cf7e0a6f61606df40a660831a26b10a.png",
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
    //满足最低起送价，展开去结算按钮
    if(totalPrice>=config.minimum_price){
      this.setData({
        totalPrice:totalPrice,
        cart_expanded:true
      })
    }else{
      this.setData({
        totalPrice:totalPrice,
        cart_expanded:false
      })
    }


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
    this.selectComponent('#config-popup').hideModal();
  },

  //当popup隐藏时候做的一些动作
  updateList(){
    this.updateCheckout();
    //选择所有qty-control组件，调用loadgood方法
    var list=this.selectAllComponents(".qty-control")
    list.forEach(item=>{
      item.loadGood();
    })
  },

  showShopNotice(){
    this.selectComponent("#shopNotice-popup").showModal();
  },

  expand_cart(){
    this.selectComponent("#cart-popup").showModal();
    this.selectComponent("#cartpopup").load_cart();
    this.setData({
      cart_expanded:true
    })
    
  }
})