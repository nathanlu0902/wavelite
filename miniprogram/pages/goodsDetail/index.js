
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

  onLoad() {
    this.loadGood()
    this.getCart()
  },

  loadGood(){
    let goodsList=wx.getStorageSync('goodsList');
    //获取前一个页面传入的index
    let eventChannel=this.getOpenerEventChannel();
    eventChannel.on("passGood",res=>{
      let index=res.data;
      this.setData({
        index:index,
        good:goodsList[index]
      })
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

  add:function(){
    wx.cloud.callFunction({
      name:"addToCart",
      data:{
        item:this.data.good
      }
    }).then(()=>{
      this.getCart();
      }
    )
  },

  minus:function(){
    wx.cloud.callFunction({
      name:"removeFromCart",
      data:{
        _id:this.data.good._id
      }
    }).then(()=>{
      this.getCart();
    })
  },
 
  checkout(){
    wx.navigateTo({
      url: '../cart/index',
    })
  },

  getCart(){
    wx.cloud.callFunction({
      name:"getCartList"
    }).then(res=>{
      let {totalCount,totalPrice,cart}=res.result;
      //更新goodslist中的qty
      let goodsList=wx.getStorageSync('goodsList');
      let index=cart.findIndex(v=>v._id===this.data.good._id);
      if(index!=-1){
        goodsList[this.data.index].qty=cart[index].qty;
      }else{
        goodsList[this.data.index].qty=0;
      }
      this.setData({
        good:goodsList[this.data.index],
        totalCount:totalCount,
        totalPrice:totalPrice
      })
    })
  },

})