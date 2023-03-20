import {add_cart, get_total_price} from "../../utils/utils"
Page({
  data: {
    tabItems:[
      {
        id:0,
        value:"详情",
        isActive:true
      },
      {
        id:1,
        value:"评论",
        isActive:false
      },
      {
        id:2,
        value:"搭配",
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let goodsid=options.id;
    if(wx.getStorageSync('goodsList')){
      var good=wx.getStorageSync('goodsList').find(item=>item.id==goodsid);
    } 
    good.goodsPic=good.goodsPic.split(",");
    let totalPrice=get_total_price();
    this.setData({
        good:good,
        totalPrice:totalPrice
    })
  },

  onShow(){
    let goodsid=this.data.good.id;
    if(wx.getStorageSync('goodsList')){
      var good=wx.getStorageSync('goodsList').find(item=>item.id==goodsid);
    } 
    // console.log(good);
    good.goodsPic=good.goodsPic.split(",");
    let totalPrice=get_total_price();
    this.setData({
        good:good,
        totalPrice:totalPrice
    })
  },

  handleTabClicked:function(e){
    let index=e.detail;
    let {tabItems}=this.data;
    tabItems.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabItems
    })
  },
  handlePreviewPic(e){
    let {current}=e.currentTarget.dataset;
    wx.previewImage({
      urls: this.data.good.goodsPic,
      current:current,
      fail(e){
        console.log(e)
      }
    })
  },

  goodUpdate(e){
    let {qty}=e.detail;
    this.data.good.qty=qty;
    this.setData({
      good:this.data.good
    })
  },

  priceUpdate(){
    this.setData({
      totalPrice:get_total_price()
    })
  },
 
  checkout(){
    wx.navigateTo({
      url: '../cart/index',
    })
  }
})