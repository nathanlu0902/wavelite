var userinfo=wx.getStorageSync('userinfo')
var newAddress={}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  chooseLocation(){
    wx.chooseLocation({
      success:e=>{
        let location=e.address;
        newAddress.location=location
        this.setData({
          location:location
        })
      },
    })
  },

  defaultChange(e){
    this.setData({
      default:e.detail
    })
  },

  formSubmit(e){
    let address_fields=["detail_address","isDefault","phone","receiver","location"]
    for(let index=0;index<address_fields.length;index++){
      if(address_fields[index]!="location"){
        var key=address_fields[index]
        var value=e.detail.value[key]
        newAddress[key]=value
      }
      if(!newAddress[key]){
        wx.showToast({
          title: `请输入${key}`,
          icon:"error"
        })
        return;
    }
    }
    //默认地址推到列表第一个
    if(newAddress.isDefault){
      userinfo.address.unshift(newAddress)
    }else{
      userinfo.address.push(newAddress)
    }
  
    wx.cloud.callFunction({
      name:"address",
      data:{
        type:"add_address",
        address:userinfo.address
      }
    }).then(res=>{
      if(res.result.code==="ADDRESS_IS_UPDATED"){
        wx.showToast({
          title: '保存成功',
        })
        wx.setStorageSync('userinfo', userinfo)
        wx.navigateTo({
          url: '../chooseAddress/index',
        })
      }else{
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  }
})