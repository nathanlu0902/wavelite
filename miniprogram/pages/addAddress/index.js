import {shorten_address,generateUuid} from "../../utils/utils"

Page({

  data: {
    newAddress:{}
  },

  onLoad(options) {
    var userinfo=wx.getStorageSync('userinfo')
    const eventChannel=this.getOpenerEventChannel();
    eventChannel.on("address",res=>{
      //根据传入的type判断是添加地址还是编辑地址
      let {type}=res;
      if(type==="edit_address"){
        wx.setNavigationBarTitle({
          title: '编辑地址',
        })
        let {index}=res;
        //edit的话先copy一份原始数据
        let current_address=userinfo.address[index]
        this.data.newAddress=current_address
        this.setData({
          address:current_address,
          type:type,
          index:index,
          location:current_address.location
        })
      }else if(type==="add_address"){
        wx.setNavigationBarTitle({
          title: '添加新地址',
        })
        this.data.newAddress.id=generateUuid();
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

formSubmit(e){
  var userinfo=wx.getStorageSync('userinfo');
  //将form中数据赋予地址对象
  let dataObj=e.detail.value;
  for(let key in dataObj){
    this.data.newAddress[key]=dataObj[key]
  }
  //新增模式
  if(this.data.type==="add_address"){
    //第一个添加的地址自动为默认
    if(userinfo.address.length==0){
      this.data.newAddress.isDefault=true
      this.data.newAddress.selected=true //默认选中
    }else{
      //已经有地址，若为默认地址则推到列表第一个
      if(this.data.newAddress.isDefault){
        userinfo.address.unshift(this.data.newAddress)
        userinfo.address.forEach((item,index)=>{
          if(index>0){
          //将其他item的default设置为false
            item.isDefault=false;
          }
        })
      }else{
        userinfo.address.push(this.data.newAddress)
      }
    }
  }else if(this.data.type==="edit_address"){
    //编辑模式
    userinfo.address[this.data.index]=this.data.newAddress;
    if(this.data.newAddress.isDefault){
      userinfo.address.unshift(userinfo.address.splice(this.data.index,1)[0])
      userinfo.address.forEach((item,index)=>{
        if(index>0){
        //将其他item的default设置为false
          item.isDefault=false;
        }
      })
    }
  }
  wx.cloud.callFunction({
    name:"user",
    data:{
      type:"update",
      field:"address",
      field_data:userinfo.address
    }
  }).then(res=>{
    if(res.result.code==="USER_IS_UPDATED"){
      wx.showToast({
        title: '保存成功',
      })
      wx.setStorageSync('userinfo', userinfo)
      setTimeout(wx.navigateBack,1000)
    }else{
      wx.showToast({
        title: '出错了!',
      })
    }
  })
}

})
  