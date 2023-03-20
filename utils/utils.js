export function add_cart(good_id){
  let goodsList=wx.getStorageSync('goodsList')||[];
  let good=goodsList.find(item=>item.id===good_id);
  good.qty+=1;
  //确保返回的是数组
  let cart=wx.getStorageSync('cart')||[];
  let index=cart.findIndex(v=>v.id===good_id);
  //如果没找到
  if (index===-1){
    cart.push(good);
  }else{
    cart[index].qty+=1;
  }
  wx.setStorageSync('cart', cart);
  wx.setStorageSync('goodsList', goodsList);
}

export function remove_cart(good_id){
  let goodsList=wx.getStorageSync('goodsList')||[];
  let good=goodsList.find(item=>item.id===good_id);
  if(good.qty>0){
    good.qty-=1;
  }
  let cart=wx.getStorageSync('cart')||[];
  let index=cart.findIndex(v=>v.id===good_id);
  if (index===-1){
    console.log("good is not in cart");
  }else{
    if(good.qty===0){
      cart.splice(index,1);
    }else{
      cart[index].qty-=1;
    }
    wx.setStorageSync('cart', cart);
    wx.setStorageSync('goodsList', goodsList)
  }
}

export function get_total_price(){
  let cart=wx.getStorageSync('cart')||[];
  let totalPrice=0;
  const initialValue=0;
  //累加对象里的值必须提供initialValue
  totalPrice=cart.reduce((pre,nxt)=>{
      return pre+nxt.qty*nxt.goodsPrice
    },initialValue)
  return totalPrice;
}