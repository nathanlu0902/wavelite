var userinfo=wx.getStorageSync('userinfo')
import {shorten_address,generateUuid} from "../../utils/utils"

Page({

  data: {
    newAddress:{}
  },

  onLoad(options) {
    const eventChannel=this.getOpenerEventChannel();
    eventChannel.on("address",res=>{
      let {type}=res;
      if(type==="edit_address"){
        wx.setNavigationBarTitle({
          title: '编辑地址',
        })
        let {index}=res;
        this.setData({
          address:userinfo.address,
          type:type,
          index:index
        })
      }else if(type==="add_address"){
        wx.setNavigationBarTitle({
          title: '添加新地址',
        })
        this.setData({
          type:type
        })
      }
      
    })  
    
    
  },

  chooseLocation(){
    wx.chooseLocation({
      success:e=>{
        let location=e.address;
        let {city,short_address}=shorten_address(location);
        this.data.newAddress.location=location;
        this.data.newAddress.short_address=short_address;
        this.data.newAddress.city=city;
        this.setData({
          location:location
        })
      },
      fail:e=>{
        console.log(e)
      }
    })
  },

  defaultChange(e){
    this.setData({
      default:e.detail
    })
  },

  formSubmit(e){
    let dataObj=e.detail.value;
    for(let key in dataObj){
      this.data.newAddress[key]=dataObj[key]
    }
    // console.log(this.data.newAddress);
    //默认地址推到列表第一个
    if(this.data.newAddress.isDefault){
      this.data.newAddress.selected=true;//默认选中
      this.data.newAddress.default=true;
      userinfo.address.unshift(this.data.newAddress)
    }else{
      this.data.newAddress.selected=false;
      this.data.newAddress.default=false;
      userinfo.address.push(this.data.newAddress)
    }
    this.data.newAddress.id=generateUuid();

    wx.cloud.callFunction({
      name:"address",
      data:{
        type:this.data.type,
        address:this.data.newAddress,
        index:this.data.index
      }
    }).then(res=>{
      if(res.result.code==="ADDRESS_IS_UPDATED"){
        wx.showToast({
          title: '地址更新成功',
        })
        setTimeout(wx.navigateBack(),2000);
      }else if(res.result.code==="ADDRESS_IS_ADDED"){
        wx.showToast({
          title: '地址添加成功',
        })
        setTimeout(wx.navigateBack(),2000);
      }else{
        wx.showToast({
          title: '出错了',
        })
      }
    })

  }
})