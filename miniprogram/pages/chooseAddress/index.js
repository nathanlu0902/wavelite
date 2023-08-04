Page({
  data: {

  },

  onShow(options) {
    let addressList=wx.getStorageSync('userinfo').address;
    this.setData({
      addressList:addressList
    })
  //   wx.cloud.callFunction({
  //     name:"login"
  //   }).then(res=>{
  //     let userinfo=res.result[0];
  //     let addressList=userinfo.address;
  //     if(addressList){
  //       for(let i=0;i<addressList.length;i++){
  //         // if(){
  //         //判断距离，判断out of range
  //         // }
  //         }
  //         this.setData({
  //           addressList:addressList
  //         })
  //     }
      
  //   }
  // )
    
  },

  add_address(){
    wx.navigateTo({
      url: '/pages/addAddress/index',
      success:(res)=>{
        res.eventChannel.emit("address",{type:'add_address'})
      }
    })
  },


  onRadioChange(e){
    var userinfo=wx.getStorageSync('userinfo')
    let index=parseInt(e.detail.value);//地址的index
    let addressList=userinfo.address;
    for(let i=0;i<addressList.length;i++){
      let item=addressList[i];
      if(i===index){
        item.selected=true;
      }else{
        item.selected=false;
      }
    }
    wx.setStorageSync('userinfo', userinfo)
    this.setData({
      addressList:addressList
    })
    wx.navigateBack()
    
  },

  goEditAddress(e){
    let {index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../addAddress/index',
      success:(res)=>{
        res.eventChannel.emit("address",{type:'edit_address',index:index})
      }
    })
  }
 
})