

// export function get_total_price(){
//   let cart=wx.getStorageSync('cart')||[];
//   let totalPrice=0;
//   const initialValue=0;
//   //累加对象里的值必须提供initialValue
//   totalPrice=cart.reduce((pre,nxt)=>{
//       return pre+nxt.qty*nxt.goodsPrice
//     },initialValue)
//   return totalPrice;
// }