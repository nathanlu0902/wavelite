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
  return totalPrice;
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
    totalCalories+=(cart[i].calories+cart[i].selectedBase.calories)*cart[i].sku_qty;
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
