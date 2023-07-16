const goodsList=wx.getStorageSync('goodsList')

Page({

  data: {
    default:"大地",
    result_list:[]
  },
  onLoad(){
    if(wx.getStorageSync('searchHistory')){
      var search_history=wx.getStorageSync('searchHistory')
    }else{
      wx.setStorageSync('searchHistory', [])
    }
    // let search_history=wx.getStorageSync('searchHistory')||[]
    var recommend=["test","test2"]
    this.setData({
      search_history:search_history,
      recommend:recommend
    })
  },
  onInputChange(e){
    let {value}=e.detail;
    if(value==""){
      this.setData({
        keyword:"",
        result_list:[]
      })
    }else{
      this.search(value)
    }
  },

  onConfirmSearch(e){
    let keyword=e.detail.value;
    //不输入直接搜索，则搜索placeholder
    if(keyword==""){
      keyword=this.data.default;
    }
    //根据keyword是否为空判断是否显示搜索历史和推荐
     //如果已经存在同样的搜索记录，将旧记录删除，头部添加新记录
     let history=wx.getStorageSync('searchHistory')
     if(history.length>0){
       //最多储存15个记录
       if(history.length==15){
         history.pop()
       }
       for(let i=0;i<history.length;i++){
         if(history[i]===keyword){
           history.splice(i,1)
         }
       }
       history.unshift(keyword) 
     }else{
       history.unshift(keyword)
     }
     wx.setStorageSync('searchHistory', history)
     this.setData({
       search_history:history,
       keyword:keyword
     })
    
    //搜索逻辑
    this.search(keyword);

  },

  onCancel(){
    this.setData({
      keyword:"",
      result_list:[]
    })
    
  },

  search(keyword){
    let result_list=[];
    var reg=new RegExp(".*"+keyword+".*","i")

    for(let i=0;i<goodsList.length;i++){
      let res=reg.test(goodsList[i].category)
      if(res){
        result_list.push.apply(result_list,goodsList[i].goodsList) //把goodslist数组赋值给结果数组
      }else{
        for(let j=0;j<goodsList[i].goodsList.length;j++){
          let res=reg.test(goodsList[i].goodsList[j].goodsName);
          if(res){
            result_list.push(goodsList[i].goodsList[j])
          }
        }
      }
    }
    this.setData({
      result_list:result_list
    })
  },

  empty_history(){
    this.setData({
      search_history:[]
    })
    wx.setStorageSync('searchHistory', [])
  },

  direct_search(e){
    console.log(e.currentTarget)
    let {keyword}=e.currentTarget.dataset;
    this.search(keyword);
    let history=wx.getStorageSync('searchHistory')
     if(history.length>0){
       for(let i=0;i<history.length;i++){
         if(history[i]===keyword){
           history.splice(i,1)
         }
       }
       history.unshift(keyword) 
     }else{
       history.unshift(keyword)
     }
     wx.setStorageSync('searchHistory', history)
     this.setData({
       search_history:history,
       keyword:keyword
     })

  },

  toDetail(e){
    let {id}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/goodsDetail/index?id='+id
    })
  }
})