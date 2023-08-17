const app=getApp()
import {update_spu_qty} from "../../utils/utils"

Page({
  data: {
    top:app.globalData.menuTop+(app.globalData.menuTop-app.globalData.statusBarHeight)+app.globalData.menuHeight,
    bnrUrl:[
      {link:'',
       imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
      },
      {link:'',
      imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
     },
     {link:'',
     imgUrl:'http://www.wagas.com.cn/admin/img/indeximg/bc4bb4740548b7348f6ef04b9219d21f.jpg'
    },
    ],
    showRegister:false
    
  },
  //options(Object)
  onLoad: function() {
    this.getUserInfo();
    this.getGoodsList();
    this.registerPopup=this.selectComponent("#popup")
  },

  onShow: function() {
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
  },
  
  showRegister:function(){
    this.setData({
      showRegister:true
    })
    this.registerPopup.showModal();

  },

  registerCompleted:function(e){
    if(e.detail=="registered"){
      this.registerPopup.hideModal();
      wx.setStorageSync('loggedIn', true)
      this.onLoad()
    }else{
      wx.showModal({
        title: '注册失败',
        content: '注册失败',
        }
      )
    }
  },

  onBindUserTap:function(){
    if(wx.getStorageSync('loggedIn')==true){
      wx.navigateTo({
        url: '/pages/userInfo/index',
    })
    }else{
      wx.navigateTo({
        url: '../login/index',
      })
    }
  },
  getUserInfo(){
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      if(res.result.length>0){
        console.log("登陆完成")
        let userinfo=res.result[0];
        this.setData({
          loggedIn:true,
          nickname:userinfo.nickname
        })
        app.globalData.loggedIn=true;
        wx.setStorageSync('userinfo', userinfo)
      }else{
        let userinfo={}
        userinfo.nickname="waver"
        this.setData({
          nickname:userinfo.nickname,
          loggedIn:false
        })
        app.globalData.loggedIn=false;
        wx.setStorageSync('userinfo', userinfo)
      }
    })
    this.registerPopup=this.selectComponent("#popup")
  },
  getGoodsList(){
    wx.cloud.callFunction({
      name:"category",
      data:{
        type:"get"
      }
    }).then(res=>{
      let cart=wx.getStorageSync('cart')||[]

      if(cart.length===0){
        wx.setStorageSync('cart', cart)
      }
      //得到一个数组，每一项为category对象
      let categoryList=res.result.data
      for(let index in categoryList){
        //category_item:{_id:xxx,goodsList:{}}
        var category_item=categoryList[index];
        for(let i=0;i<category_item.goodsList.length;i++){
          let good=category_item.goodsList[i];
          if(good.stock===0){
            //将stock=0的项移至末位
            category_item.goodsList.push(category_item.goodsList.splice(i,1)[0]);
            //array数据往前进一，避免跳过
            i-=1;
          }
          //更新价格,加上标配价格
          if(good.material){
            for(let k in good.material["标配"]){
              good.goodsPrice+=good.material["标配"][k]
            }
          }
          // good.category_name=category_name
          good.temp_qty=1
        }
      }
      wx.setStorageSync('categoryList', categoryList)
      update_spu_qty();

    })
  },
});
  