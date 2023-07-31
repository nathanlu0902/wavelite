var chosenAddress;

Page({
  data: {

  },

  onShow(options) {
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      console.log(res)
      let userinfo=res.result[0];
      wx.setStorageSync('userinfo', res.result[0])
      let addressList=userinfo.address;
      for(let i=0;i<addressList.length;i++){
      // if(){
      //判断距离，判断out of range
      // }
      }
      this.setData({
        addressList:addressList
      })
      
    }
  )
    
  },

  add_address(){
    wx.navigateTo({
      url: '/pages/addAddress/index',
    })
  },


  onRadioChange(e){
    let index=parseInt(e.detail.value);//地址的index
    let addressList=this.data.addressList;
    for(let i=0;i<addressList.length;i++){
      let item=addressList[i];
      if(i===index){
        item.selected=true;
      }else{
        item.selected=false;
      }
    }
    // chosenAddress=addressList[index]
    // wx.setStorageSync('chosenAddress', chosenAddress)
    this.setData({
      addressList:addressList
    })
    
  }
 
})