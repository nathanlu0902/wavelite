var userinfo=wx.getStorageSync('userinfo')
const app=getApp()

Page({
  data: {
    gender:["男","女","其他"],
    userinfo:{
      nickname:userinfo.nickname,
      phone:userinfo.phone,
      birthday:userinfo.birthday,
      gender:userinfo.gender
    },
    navBarData:{
      showBack:true,
      showLocation:false,
      showDistance:false,
      showSearch:false
    }
  },

  onLoad(options) { 
    this.setData({
      userinfo:userinfo,
      statusBarHeight:app.globalData.statusBarHeight,
      navBarHeight:app.globalData.navBarHeight,
    })
  },
  goBack(){
    wx.navigateBack();
  },
  onChooseAvatar(e){
    let {avatarUrl}=e.detail;
    userinfo.avatarUrl=avatarUrl;
    wx.cloud.callFunction({
      name:"user",
      data:{
        userinfo:userinfo,
        type:"update"
      }
    }).then(res=>{
      if(res.result.code=="200"){
        console.log("avatar uploaded")
        this.setData({
          avatarUrl:avatarUrl
        })
      }
    }).then(wx.setStorageSync('userinfo', userinfo)) 
  },
  onBirthdayChange(e){
    let birthday=e.detail.value;
    userinfo.birthday=birthday;
    this.setData({
      userinfo:userinfo
    })
  },
  onGenderChange(e){
    let index=e.detail.value;
    userinfo.gender=this.data.gender[index];
    this.setData({
      userinfo:userinfo
    })
  },
  submit(e){
    let {nickname,phone}=e.detail.value;
    userinfo.nickname=nickname;
    userinfo.phone=phone;
    wx.cloud.callFunction({
      name:"user",
      data:{
        type:"update",
        userinfo:userinfo
      }
    }).then(
      wx.showToast({
        title: '个人资料已更新',
      }).then(wx.setStorageSync('userinfo', userinfo))
      
    )
  }

})