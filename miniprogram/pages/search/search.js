const goodsList=wx.getStorageSync('goodsList')

Page({

  data: {
    default:"大地",
    result_list:[]
  },
  onLoad(){
    let search_history=wx.getStorageSync('searchHistory')||[]
    let recommend=["test","test2"]
    this.setData({
      search_history:search_history,
      recommend:recommend
    })
  },

  onConfirmSearch(e){
    let keyword=e.detail.value;
    let history=wx.getStorageSync('searchHistory')
    //不输入直接搜索，则搜索placeholder
    if(keyword==""){
      keyword=this.data.default;
    }
    //如果已经存在同样的搜索记录，将旧记录删除，头部添加新记录
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

    //搜索逻辑
    let result_list=[];
    var reg=new RegExp(".*"+keyword+".*","i")
    for(let i=0;i<goodsList.length;i++){
      console.log(goodsList[i].category)
      let res=reg.test(goodsList[i].category)
      console.log(res)
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
      result_list:result_list,
      not_found:false
    })
    if(result_list.length==0){
      this.setData({
        not_found:true
      })
    }
  },

  onCancel(){
    this.setData({
      keyword:"",
      result_list:[]
    })
    
  }
})