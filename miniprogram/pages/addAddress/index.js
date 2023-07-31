var userinfo=wx.getStorageSync('userinfo')
import {shorten_address} from "../../utils/utils"

Page({

  data: {
    newAddress:{}
  },

  onLoad(options) {
    
  },

  chooseLocation(){
    wx.chooseLocation({
      success:e=>{
        let location=e.address;
        this.data.newAddress.location=location;
        this.data.newAddress.short_address=shorten_address(location).short_address
        this.data.newAddress.city=shorten_address(location).city
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
    let newAddress=this.data.newAddress;
    let dataObj=e.detail.value;
    for(let key in dataObj){
      newAddress[key]=dataObj[key]
    }
    console.log(dataObj,newAddress)
    //默认地址推到列表第一个
    if(newAddress.isDefault){
      newAddress.selected=true;//默认选中
      newAddress.default=true;
      userinfo.address.unshift(newAddress)
    }else{
      newAddress.selected=false;
      newAddress.default=false;
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
        wx.navigateBack()
      }else{
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  }
})