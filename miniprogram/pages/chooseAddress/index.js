let app=getApp();
var userinfo=wx.getStorageSync('userinfo')
var chosenAddress;

import {shorten_address} from "../../utils/utils.js";

Page({
  data: {

  },

  onLoad(options) {
    var addressList=userinfo.address;
    for(let i=0;i<addressList.length;i++){
      if(i==0){
        addressList[i].checked=true;
        addressList[i].out_of_range=true;
      }else{
        addressList[i].checked=false;
      }
      let {city,short_address}=shorten_address(addressList[i].location)
      addressList[i].city=city;
      addressList[i].short_address=short_address;
      
    }
    this.setData({
      addressList:addressList
    })
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
        item.checked=true;
      }else{
        item.checked=false;
      }
    }
    chosenAddress=addressList[index]
    wx.setStorageSync('chosenAddress', chosenAddress)
    this.setData({
      addressList:addressList
    })
    
  }
 
})