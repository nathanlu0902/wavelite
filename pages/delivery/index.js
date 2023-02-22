import {request} from "../../request/index"
const app=getApp();
Page({
  data: {
    goodsCategoryData:[],
    height:app.globalData.SCREENHEIGHT*750/app.globalData.SCREENWIDTH,
    currentId:1
  },

  bindLeftItemTap:function(e){
    let {id}=e.currentTarget.dataset;
    this.setData({
      currentId:id
    })
  },

  add:function(e){
    let {id}=e.currentTarget.dataset;
    this.data.goodsList[this.data.currentType][id].qty+=1;
    this.setData({
      goodsList:this.data.goodsList
    })
    this.getTotalPrice();
  },

  minus:function(e){
    let {id,qty}=e.currentTarget.dataset;
    if(qty>0){
      this.data.goodsList[this.data.currentType][id].qty-=1;;
    }
    this.setData({
      goodsList:this.data.goodsList
    })
    this.getTotalPrice();
  },


  getTotalPrice:function(){
    let totalPrice=0,
        goodsList=this.data.goodsList,
        index,
        i
    for (index in this.data.typeList){
      let type=this.data.typeList[index];
      for (i = 0;i<goodsList[type].length;i++){
        totalPrice+=goodsList[type][i].qty*goodsList[type][i].dishPrice;
      }
    }
    this.setData({
      totalPrice:totalPrice
    })
  } ,

  onLoad() {
    this.getGoodsCategory();
    this.getGoodsList();
},

  async getGoodsList(){
    let res=await request({
      url:"/Goods",
      method:"GET"
    })
    this.setData({
      goodsList:res.data
    })
    console.log(this.data.goodsList)

  },

  async getGoodsCategory(){
    let res=await request({
      url:"/GoodsCategory",
      method:"GET",
    })
    //res.data为字符串，需要转成list
    this.setData({
      "goodsCategoryData":res.data
    })
    console.log(this.data.goodsCategoryData)
  },

  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  
})