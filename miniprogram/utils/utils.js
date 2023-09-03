export function shorten_address(long_address){
  try{
    let city=long_address.match(/省([\u4E00-\u9FA5]{1,4}市)/)[1]//提取省后面的xx市
    let short_address=long_address.match(/区(.*)/)[1] //提取区后面的所有字符
    return {city:city,short_address:short_address}
  }catch(e){
    console.log(e)
  }
  
}



export function total_cart_price(){
  let cart=wx.getStorageSync('cart');
  let totalPrice=0;
  for(let i=0; i<cart.length;i++){
    totalPrice+=cart[i].totalPrice
  }
  return totalPrice.toFixed(2);
}

export function total_cart_count(){
  let cart=wx.getStorageSync('cart');
  let count=0;
  for(let i=0; i<cart.length;i++){
    count+=cart[i].sku_qty
  }
  return count;
}

export function total_cart_calories(){
  let cart=wx.getStorageSync('cart');
  let totalCalories=0;
  for(let i=0;i<cart.length;i++){
    let calories=(cart[i].calories+cart[i].selectedBase.calories)*cart[i].sku_qty
    totalCalories+=calories;
  }
  return totalCalories;
}

export function current_time(){
  var time=new Date();
  var hour=time.getHours();
  var minute=time.getMinutes();
  return {
    hour:hour,minute:minute
  }
}

export function generateUuid (length=5){
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

//搜索cart，更新缓存中categoryList的spu_qty
export function update_spu_qty(){
  let cart=wx.getStorageSync('cart')
  let categoryList=wx.getStorageSync('categoryList')
  //遍历categoryList，重置spu_qty
  for(let category_index=0;category_index<categoryList.length;category_index++){
    for(let good_index=0;good_index<categoryList[category_index].goodsList.length;good_index++){
      categoryList[category_index].goodsList[good_index].spu_qty=0;
    }
  }
  //查找购物车，更新spu_qty
  for(let i=0;i<cart.length;i++){
    let cart_item=cart[i]
    for(let category_index=0;category_index<categoryList.length;category_index++){
      {
        let good_index=categoryList[category_index].goodsList.findIndex(item=>{
            return item.id===cart_item.id
          })
        if(good_index==-1){
          continue;
        }else{
          categoryList[category_index].goodsList[good_index].spu_qty+=cart_item.sku_qty;
        }
      }
    }
  }
  wx.setStorageSync('categoryList', categoryList)
}

export function checkStock(good){
  wx.cloud.callFunction({
    name:"category",
    data:{
      type:"get"
    }
  }).then(res=>{
    //得到一个数组，每一项为category对象
    let categoryList=res.result.data
    for(let index in categoryList){
      //category_item:{_id:xxx,goodsList:{}}
      var goodsList=categoryList[index].goodsList;
      let good_index=goodsList.findIndex(item=>{
        return item.id===good.id
      })
      if(good_index!=-1){
        let good=goodsList[good_index];
        if(good.stock<good.sku_qty){
          //找到，但缺货
          return false;
        }else{
          //找到，未缺货
          return true;
        }
      }
      
}
})
}