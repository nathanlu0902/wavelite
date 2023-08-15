
import config from "../../config/config"
import {total_cart_price} from "../../utils/utils"


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
    // this.getGoodsList();
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

  // getGoodsList(){
  //   wx.cloud.callFunction({
  //     name:"category",
  //     data:{
  //       type:"get"
  //     }
  //   }).then(res=>{
  //     let cart=wx.getStorageSync('cart')
  //     //得到一个数组，每一项为category对象
  //     let categoryList=res.result.data
  //     for(let index in categoryList){
  //       //category_item:{_id:xxx,goodsList:{}}
  //       var category_item=categoryList[index];
  //       for(let i=0;i<category_item.goodsList.length;i++){
  //         let good=category_item.goodsList[i];
  //         if(good.stock===0){
  //           //将stock=0的项移至末位
  //           category_item.goodsList.push(category_item.goodsList.splice(i,1)[0]);
  //           //array数据往前进一，避免跳过
  //           i-=1;
  //         }
  //         //更新价格,加上标配价格
  //         if(good.material){
  //           for(let k in good.material["标配"]){
  //             good.goodsPrice+=good.material["标配"][k]
  //           }
  //         }
  //         // good.category_name=category_name
  //         good.temp_qty=1
  //       }
  //     }
  //     //查找购物车，更新spu_qty
  //     for(let i=0;i<cart.length;i++){
  //       let cart_item=cart[i]
  //       for(let category_index=0;category_index<categoryList.length;category_index++){
  //         {
  //           let good_index=categoryList[category_index].goodsList.findIndex(item=>{
  //               return item.id===cart_item.id
  //             })
  //           if(good_index==-1){
  //             category_index+=1;
  //             continue;
  //           }else{
  //             categoryList[category_index].goodsList[good_index].spu_qty+=cart_item.sku_qty;
  //           }
  //         }
  //       }
        
  //     }
  //     this.setData({
  //       categoryList:categoryList
  //     })
  //     wx.setStorageSync('categoryList', categoryList)
  //     // console.log("设置完categoryList",categoryList)

  //   })
  // },



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
    let {category_index,good_index}=e.detail;
    this.selectComponent("#config-selector").properties.category_index=category_index;
    this.selectComponent("#config-selector").properties.good_index=good_index;
    this.selectComponent("#config-selector").load_good();
    //显示popup
    this.selectComponent("#config-popup").showModal();

  },

  hideSelector(){
    let selector=this.selectComponent('#config-popup');
    selector.hideModal();
    wx.removeStorageSync('selectedGood')
  }
})